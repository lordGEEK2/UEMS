const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Club = require('../models/Club');
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const team = [
    { title: 'Chair', name: 'Tanishq Mishra', branch: 'CSBS' },
    { title: 'Vice Chair', name: 'Harshal Gandhi', branch: 'EC' },
    { title: 'Treasurer', name: 'Anshika Rajput', branch: 'IoT' },
    { title: 'Web Master', name: 'Harshit Tiwari', branch: 'CSE' },
    { title: 'Secretary', name: 'Akshay Singh', branch: 'CSBS' },
    { title: 'Joint-Secretary', name: 'Satwik Dubey', branch: 'ET' },
    { title: 'Tech Lead', name: 'Swastika Rajak', branch: 'AIR ' },
    { title: 'Tech Co-lead', name: 'Chitransh Chocksey', branch: 'CSBS' },
    { title: 'Operations Head', name: 'Rishi Dangi', branch: 'CSBS ' },
    { title: 'Operations Co-head', name: 'Achal Singhal', branch: 'CSBS' },
    { title: 'Marketing Head', name: 'Samarth Agrawal', branch: 'AIDS' },
    { title: 'Marketing Co-Head', name: 'Raghav Deepak Behere', branch: 'CSBS' },
    { title: 'Management Head', name: 'Vivek Singh Sisodiya', branch: 'IT' },
    { title: 'Management Co-Head', name: 'Pragya', branch: 'IT' },
    { title: 'Videography Head', name: 'Prateek Chawla', branch: 'AIR ' },
    { title: 'Videography Co-Head', name: 'Sourabh Rajput', branch: 'Civil' },
    { title: 'Video Editing Head', name: 'Priyansh Namdeo', branch: 'MAC' },
    { title: 'Video Editing Co-Head', name: 'Prabhanshu Katra', branch: 'IT' },
    { title: 'Photography Head', name: 'Arvind Gautam', branch: 'CSBS' },
    { title: 'Photography Co-Head', name: 'Vedika Singh', branch: 'EC' },
    { title: 'Graphics Lead', name: 'Anushka Malviya', branch: 'IoT' },
    { title: 'Graphics Co-Lead', name: 'Shruti Gupta', branch: 'CSBS' },
    { title: 'Content Head', name: 'Nitya Jain', branch: 'MAC' },
    { title: 'Content Co-Head', name: 'Tanu Goyal', branch: 'AIR' },
    { title: 'Social Media & PR Head', name: 'Gaurav Pandey', branch: 'IoT' },
    { title: 'Social Media & PR Co-Head', name: 'Mitali Gautam', branch: 'AIR' }
];

async function run() {
    try {
        console.log('Finding ACM club...');
        const club = await Club.findOne({ name: /ACM MITS Student Chapter/i });
        if (!club) {
            console.log('ACM MITS Club not found!');
            process.exit(1);
        }

        const chatRoom = await ChatRoom.findById(club.chatRoom);
        if (!chatRoom) {
            console.log('Chat Room for ACM not found!');
            process.exit(1);
        }

        // Clear existing members for a fresh start
        club.members = [];
        chatRoom.participants = [];

        console.log('Creating Core Team Users...');
        for (const member of team) {
            let email = member.name.toLowerCase().replace(/\s+/g, '.') + '@mitsgwalior.in';
            // Some might not have last name, so handle gracefully
            const parts = member.name.split(' ');
            const firstName = parts[0];
            const lastName = parts.slice(1).join(' ') || ' ';

            let user = await User.findOne({ email });
            if (!user) {
                user = new User({
                    name: member.name,
                    email,
                    password: 'password123',
                    role: 'student',
                    profile: {
                        firstName,
                        lastName,
                        department: member.branch.trim(),
                        year: '3',
                    }
                });
                await user.save();
            }

            // Determine role flag
            let role = 'admin';
            if (member.title.toLowerCase().includes('chair') && !member.title.toLowerCase().includes('vice')) {
                role = 'head';
            }

            club.members.push({
                user: user._id,
                role: role,
                title: member.title
            });
            chatRoom.participants.push(user._id);
        }

        console.log('Creating Demo User who joins the club...');
        let demoUser = await User.findOne({ email: 'demo@mitsgwalior.in' });
        if (!demoUser) {
            demoUser = new User({
                name: 'Demo Student',
                email: 'demo@mitsgwalior.in',
                password: 'password123',
                role: 'student',
                profile: {
                    firstName: 'Demo',
                    lastName: 'Student',
                    department: 'CSE',
                    year: '2',
                }
            });
            await demoUser.save();
        }

        // Add Demo User
        club.members.push({
            user: demoUser._id,
            role: 'member',
            title: 'Member'
        });
        chatRoom.participants.push(demoUser._id);

        await club.save();
        await chatRoom.save();

        console.log(`Successfully added ${team.length} Core Members and 1 Demo User to ACM!`);
        console.log('--------------------------------------------------');
        console.log('Login credentials for your test:');
        console.log('Email: demo@mitsgwalior.in');
        console.log('Password: password123');
        console.log('--------------------------------------------------');
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
