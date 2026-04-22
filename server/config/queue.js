const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const logger = require('./logger');
const sgMail = require('@sendgrid/mail');

// Use a shared Redis connection or default to localhost
const redisUrl = process.env.REDIS_URL;
const connection = redisUrl ? new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    connectTimeout: 5000,
    retryStrategy: (times) => {
        if (times > 3) {
            logger.error('[Redis] Max retries reached. BullMQ features will be disabled.');
            return null; // Stop retrying
        }
        return Math.min(times * 100, 3000);
    }
}) : null;

if (connection) {
    connection.on('error', (err) => {
        logger.error('[Redis] Connection Error:', err.message);
    });
}

// Create an email queue
let emailQueue;
try {
    if (connection) {
        emailQueue = new Queue('email-queue', { connection });
    }
} catch (err) {
    logger.error('[Queue] Failed to create email queue:', err.message);
}

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Background Worker to process emails
let emailWorker;
if (connection) {
    try {
        emailWorker = new Worker('email-queue', async (job) => {
            const { to, subject, html, text } = job.data;
            
            if (!process.env.SENDGRID_API_KEY) {
                logger.debug(`[Queue] Email job skipped (no API key): ${subject} → ${to}`);
                return { skipped: true };
            }

            try {
                await sgMail.send({
                    to,
                    from: { email: process.env.FROM_EMAIL || 'noreply@uems.app', name: process.env.FROM_NAME || 'UEMS Platform' },
                    subject,
                    html,
                    text,
                });
                logger.info(`[Queue] Email successfully processed: ${subject} → ${to}`);
                return { success: true };
            } catch (error) {
                logger.error(`[Queue] SendGrid error for job ${job.id}:`, error);
                throw error; // Let BullMQ retry it based on attempts setting
            }
        }, { connection });

        emailWorker.on('completed', (job) => {
            logger.debug(`Job ${job.id} has completed!`);
        });

        emailWorker.on('failed', (job, err) => {
            logger.error(`Job ${job.id} has failed with ${err.message}`);
        });
    } catch (err) {
        logger.error('[Queue] Failed to create email worker:', err.message);
    }
}

/**
 * Add an email task to the background queue.
 * This ensures API responses are quick and emails retry gracefully if SendGrid fails.
 */
const queueEmail = async (emailData) => {
    if (!emailQueue) {
        logger.warn('[Queue] Email queue not available. Skipping background email.');
        return;
    }
    await emailQueue.add('send-email', emailData, {
        attempts: 3,         // Retry up to 3 times
        backoff: {
            type: 'exponential',
            delay: 1000      // Wait 1s, 2s, 4s between failures
        }
    });
};

module.exports = {
    emailQueue,
    queueEmail,
};
