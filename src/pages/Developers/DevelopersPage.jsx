import { motion } from 'framer-motion';
import { Code2, Mail, Linkedin, Github, Heart } from 'lucide-react';
import tanishqPhoto from '../../assets/tanishq-developer.jpg';

const developers = [
    {
        name: 'Tanishq Mishra',
        role: 'Computer Science and Business Systems, 4th Semester',
        avatar: tanishqPhoto,
        gradient: 'gradient-purple',
        socials: {
            email: 'mailto:tanishq@mits.ac.in',
            linkedin: 'https://www.linkedin.com/in/tanishq-mishra-0b3256328',
            github: 'https://github.com/lordGEEK2',
        }
    },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
        y: -15,
        scale: 1.02,
        boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
};

const socialVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { type: 'spring', stiffness: 400 } },
    tap: { scale: 0.9 }
};

export default function DevelopersPage() {
    return (
        <div className="page-content">
            <section className="section">
                <div className="container">
                    {/* Section Header */}
                    <motion.div
                        className="text-center"
                        style={{ marginBottom: 'var(--space-12)' }}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="official-badge"
                            style={{ marginBottom: 'var(--space-6)' }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Code2 size={16} />
                            Meet the Developer
                        </motion.div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-4)',
                            color: 'var(--text-primary)'
                        }}>
                            The Mind Behind <span className="title-accent">UEMS</span>
                        </h1>

                        {/* Description */}
                        <p
                            className="body-lg"
                            style={{
                                maxWidth: 560,
                                margin: '0 auto',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            This platform was developed with passion and dedication by a talented
                            developer from MITS Gwalior.
                        </p>
                    </motion.div>

                    {/* Developer Card */}
                    <div style={{ maxWidth: 400, margin: '0 auto' }}>
                        {developers.map((dev, index) => (
                            <motion.div
                                key={index}
                                className="developer-card"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                            >
                                {/* Gradient Header */}
                                <div className={`developer-card-header ${dev.gradient}`}>
                                    <motion.img
                                        src={dev.avatar}
                                        alt={dev.name}
                                        className="developer-card-avatar"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="developer-card-body">
                                    <h3 className="developer-card-name" style={{ color: '#000000' }}>{dev.name}</h3>
                                    <p className="developer-card-role">{dev.role}</p>

                                    {/* Socials */}
                                    <div className="developer-card-socials">
                                        <motion.a
                                            href={dev.socials.email}
                                            title="Email"
                                            variants={socialVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <Mail size={20} />
                                        </motion.a>
                                        <motion.a
                                            href={dev.socials.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="LinkedIn"
                                            variants={socialVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <Linkedin size={20} />
                                        </motion.a>
                                        <motion.a
                                            href={dev.socials.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="GitHub"
                                            variants={socialVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <Github size={20} />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Built with love */}
                    <motion.div
                        className="text-center"
                        style={{ marginTop: 'var(--space-12)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="muted flex items-center justify-center gap-2">
                            Built with <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Heart size={16} style={{ color: '#ef4444', fill: '#ef4444' }} />
                            </motion.span> at MITS Gwalior
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
