const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const Club = require('../models/Club');
const ChatRoom = require('../models/ChatRoom');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function seedData() {
    try {
        console.log('Reading clubs.js from frontend...');
        const clubsFilePath = path.join(__dirname, '../../src/data/clubs.js');
        let content = fs.readFileSync(clubsFilePath, 'utf8');

        // Extract the clubs array using a little hack to evaluate it
        // Remove export statements to make it valid CommonJS
        // Strip off the functions at the bottom
        const clubsEndingIndex = content.indexOf('export const getClubsByCategory');
        if (clubsEndingIndex !== -1) {
            content = content.substring(0, clubsEndingIndex);
        }

        content = content
            .replace(/export const clubCategories =/g, 'const clubCategories =')
            .replace(/export const clubs =/g, 'const clubs =')
            .replace(/export default clubs;/g, '');

        // Evaluate the code to get the `clubs` variable
        let extractedClubs = [];
        eval(content + '; extractedClubs = clubs;');

        console.log(`Extracted ${extractedClubs.length} clubs from frontend data.`);

        // Delete existing clubs and chatrooms so we don't duplicate
        await Club.deleteMany({});
        await ChatRoom.deleteMany({ type: 'club' });
        console.log('Cleared existing Clubs and Club ChatRooms.');

        for (const clubData of extractedClubs) {
            // Generate basic logo text or leave it empty, wait, the model has logo: String
            const club = new Club({
                name: clubData.name,
                slug: clubData.slug,
                category: clubData.category, // Matches enum
                description: clubData.description,
                fullDescription: clubData.fullDescription,
                activities: clubData.activities,
                achievements: clubData.achievements,
                coordinator: clubData.coordinator || 'TBA',
            });

            // Create explicitly attached ChatRoom
            const chatRoom = new ChatRoom({
                name: `${clubData.name} Chat`,
                type: 'club',
                club: club._id,
                participants: [],
                admins: [],
            });

            club.chatRoom = chatRoom._id;

            await club.save();
            await chatRoom.save();
        }

        console.log(`Successfully seeded ${extractedClubs.length} Clubs into MongoDB!`);
        process.exit();
    } catch (error) {
        console.error('Error with import', error);
        process.exit(1);
    }
}

seedData();
