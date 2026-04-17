require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Club = require('../models/Club');
const ChatRoom = require('../models/ChatRoom');

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        console.log('Loading club data...');
        // Need to use dynamic import for ES module
        const { clubs } = await import('../../src/data/clubs.js');
        
        console.log(`Found ${clubs.length} clubs. Clearing existing clubs...`);
        await Club.deleteMany({});
        await ChatRoom.deleteMany({ type: 'club' });

        for (const clubData of clubs) {
            // Generate slug exactly as pre-save hook would, to use it in chat room name
            const slug = clubData.slug || clubData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            
            const club = await Club.create({
                name: clubData.name,
                category: clubData.category,
                description: clubData.description,
                fullDescription: clubData.fullDescription || '',
                activities: clubData.activities || [],
                achievements: clubData.achievements || [],
                coordinator: clubData.coordinator,
                slug: slug,
            });

            // Create chat room
            const chatRoom = await ChatRoom.create({
                name: `${clubData.name} Chat`,
                type: 'club',
                club: club._id,
                participants: [],
                admins: [],
            });

            club.chatRoom = chatRoom._id;
            await club.save();
            
            console.log(`Created club: ${club.name}`);
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
