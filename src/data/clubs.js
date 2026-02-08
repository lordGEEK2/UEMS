// MITS Gwalior - Student Clubs Data for Session 2025-26
// 70 Official Clubs with Faculty Coordinators

export const clubCategories = {
    TECH: { id: 'tech', name: 'Technology', color: '#3b82f6', icon: '💻' },
    CULTURAL: { id: 'cultural', name: 'Cultural', color: '#ec4899', icon: '🎭' },
    SPORTS: { id: 'sports', name: 'Sports & Fitness', color: '#22c55e', icon: '⚽' },
    PROFESSIONAL: { id: 'professional', name: 'Professional Bodies', color: '#f59e0b', icon: '🏛️' },
    SOCIAL: { id: 'social', name: 'Social & Awareness', color: '#8b5cf6', icon: '🌍' },
    CREATIVE: { id: 'creative', name: 'Creative Arts', color: '#ef4444', icon: '🎨' },
    ACADEMIC: { id: 'academic', name: 'Academic & Research', color: '#06b6d4', icon: '📚' },
    WELLNESS: { id: 'wellness', name: 'Wellness & Spirituality', color: '#14b8a6', icon: '🧘' },
};

export const clubs = [
    // Technology Clubs
    { id: 1, name: 'Aerospace Club', coordinator: 'Dr. Nitin Upadhaya & Dr. Neeraj Mishra', category: 'tech', slug: 'aerospace-club' },
    { id: 2, name: 'Analytics Club', coordinator: 'Dr. Divya Chaturvedi', category: 'tech', slug: 'analytics-club' },
    { id: 5, name: 'ASIMOV (Robotics Club)', coordinator: 'Dr. Karuna Markam', category: 'tech', slug: 'asimov-robotics' },
    { id: 7, name: 'CADCrew', coordinator: 'Prof. Vaibhav Shivhare', category: 'tech', slug: 'cadcrew' },
    { id: 10, name: "Chemical Engineer's Group, MITS", coordinator: 'Ms. Shivangi Sharma', category: 'tech', slug: 'chem-eng-group' },
    { id: 11, name: 'Competitive Coding Club', coordinator: 'Dr Ranjeet Kumar Singh & Dr Yashwant Swale', category: 'tech', slug: 'competitive-coding' },
    { id: 13, name: 'Connect Tech', coordinator: 'Prof. Khushboo Agrawal & Dr Bhavna Rathore', category: 'tech', slug: 'connect-tech' },
    { id: 18, name: 'Electronics Club', coordinator: 'Prof. Madhav Singh', category: 'tech', slug: 'electronics-club' },
    { id: 19, name: 'Energy Club', coordinator: 'Dr. C.S. Malvi', category: 'tech', slug: 'energy-club' },
    { id: 23, name: 'Fun-Tech Club', coordinator: 'Prof. Jaimala Jha & Dr Tej Singh', category: 'tech', slug: 'fun-tech' },
    { id: 24, name: 'Google Developer Student Club (GDSC)', coordinator: 'Dr R S Jadon', category: 'tech', slug: 'gdsc' },
    { id: 29, name: 'Innovation & DIY Club', coordinator: 'Dr. Gavendra Norkey, Dr. Devesh K Lal & Dr. Ankit Tiwari', category: 'tech', slug: 'innovation-diy' },
    { id: 30, name: 'IoT Edge Club', coordinator: 'Dr. Aftab Ahmed Ansari', category: 'tech', slug: 'iot-edge' },
    { id: 40, name: 'October Sky (Rocket Club, MITS)', coordinator: 'Dr. R. P. Narwaria', category: 'tech', slug: 'october-sky' },
    { id: 50, name: 'Skyroads (Gaming) Club', coordinator: 'Prof. Neha Bharadwaj', category: 'tech', slug: 'skyroads-gaming' },
    { id: 57, name: 'The AI Club', coordinator: 'Dr. R. S. Jadon', category: 'tech', slug: 'ai-club' },

    // Cultural & Creative Clubs
    { id: 3, name: 'Animation Club', coordinator: 'Dr Devesh K Lal', category: 'creative', slug: 'animation-club' },
    { id: 4, name: 'Art Club', coordinator: 'Prof. Pooja Sahu', category: 'creative', slug: 'art-club' },
    { id: 6, name: 'Bandish: Music Club of MITS', coordinator: 'Dr. Mir Shahnawaz Ahmad & Dr. Shipra Shukla', category: 'cultural', slug: 'bandish-music' },
    { id: 15, name: 'Dance Club', coordinator: 'Prof. Parul Saxena & Pritha Singh Kushwah', category: 'cultural', slug: 'dance-club' },
    { id: 20, name: 'Filmmaking Club', coordinator: 'Dr Nishant Jain & Dr Dheeraj K Dixit', category: 'creative', slug: 'filmmaking-club' },
    { id: 26, name: 'Hindi Samiti', coordinator: 'Dr Shubhi Kansal', category: 'cultural', slug: 'hindi-samiti' },
    { id: 31, name: 'Lafz-e-Bayan', coordinator: 'Dr Atul K Ray', category: 'cultural', slug: 'lafz-e-bayan' },
    { id: 41, name: 'Photography & Videography Club', coordinator: 'Prof. D. K. Parsediya', category: 'creative', slug: 'photography-videography' },
    { id: 43, name: 'Querencia (Literary Club)', coordinator: 'Dr. Arzoo Choubey', category: 'cultural', slug: 'querencia-literary' },
    { id: 48, name: 'Shakhshiyat, Our Own Fashion', coordinator: 'Prof. Richa Mishra & Prof. Versha Sinha', category: 'creative', slug: 'shakhshiyat-fashion' },
    { id: 52, name: 'Spic Macay Heritage Club', coordinator: 'Dr. Manish Dixit & Dr. Mir Shahnawaz Ahmad', category: 'cultural', slug: 'spic-macay' },

    // Sports & Fitness
    { id: 22, name: 'Fitness Club', coordinator: 'Prof. R.P. Kori', category: 'sports', slug: 'fitness-club' },
    { id: 53, name: 'Sports Club', coordinator: 'Dr. B.P.S. Bhadauria', category: 'sports', slug: 'sports-club' },

    // Social & Awareness Clubs
    { id: 8, name: 'Care4Earth Club', coordinator: 'Dr Jaimala Jha & Ms. Khushboo Agarwal', category: 'social', slug: 'care4earth' },
    { id: 17, name: 'Disaster Management Awareness Club', coordinator: 'Dr. Jyoti Vimal & Prof. Vedansh Chaturvedi', category: 'social', slug: 'disaster-management' },
    { id: 25, name: 'Heritage & Tourism', coordinator: 'Prof. Gautam Bhadoria & Prof Jaimala Jha', category: 'social', slug: 'heritage-tourism' },
    { id: 28, name: 'Human of MITS (HoM): The Universal Human Values Club', coordinator: 'Prof. Arun Kumar', category: 'social', slug: 'hom-human-values' },
    { id: 38, name: 'Nature Club', coordinator: 'Dr. Pratesh Jaiswal, Dr Prachi Singh & Dr Hemant Choubey', category: 'social', slug: 'nature-club' },
    { id: 44, name: 'Rashtraya Club', coordinator: 'Dr. Vikas Mahor', category: 'social', slug: 'rashtraya-club' },
    { id: 45, name: 'Red Ribbon Club', coordinator: 'Prof. D.K. Parsediya', category: 'social', slug: 'red-ribbon' },
    { id: 46, name: 'Rotract Club', coordinator: 'Prof. Kuldeep Swarnkar', category: 'social', slug: 'rotract-club' },
    { id: 55, name: 'StopNot Club', coordinator: 'Dr. Shubhi Kansal', category: 'social', slug: 'stopnot-club' },
    { id: 56, name: 'TEDx Club', coordinator: 'Mr. Vikram S. Rajput', category: 'social', slug: 'tedx-club' },

    // Academic & Research Clubs
    { id: 9, name: 'Career Catalyst Club', coordinator: 'Dr. Devanshu Tiwari', category: 'academic', slug: 'career-catalyst' },
    { id: 12, name: 'Concrete Structures Club', coordinator: 'Prof. A.K. Saxena & Dr. Hemant Shrivastava', category: 'academic', slug: 'concrete-structures' },
    { id: 14, name: 'Creative Architects, MITS', coordinator: 'Prof Garima Parihar', category: 'academic', slug: 'creative-architects' },
    { id: 16, name: 'Digital Learning Group', coordinator: 'Prof. Punit Kumar Johari', category: 'academic', slug: 'digital-learning' },
    { id: 21, name: 'Finance Club', coordinator: 'Dr. Minakshi Dahiya', category: 'academic', slug: 'finance-club' },
    { id: 32, name: 'Mathematics Club', coordinator: 'Dr. Vijay Shankar Sharma', category: 'academic', slug: 'mathematics-club' },
    { id: 34, name: 'MITS - Model United Nations (MITS–MUN)', coordinator: 'Dr. Sunita Sharma & Dr. Rahul Dubey', category: 'academic', slug: 'mits-mun' },
    { id: 36, name: 'MITS Journalism Society', coordinator: 'Prof. Anish P. Jacob & Prof Pooja Sahu', category: 'academic', slug: 'journalism-society' },
    { id: 37, name: 'Multidisciplinary Learning & Research Club', coordinator: 'Dr. Nikhil Paliwal & Dr. Saurabh K Rajput', category: 'academic', slug: 'multidisciplinary-research' },
    { id: 42, name: 'Project Expo Club', coordinator: 'Prof. R.P. Kori & Dr. Shourabh S. Raghuwanshi', category: 'academic', slug: 'project-expo' },
    { id: 47, name: 'Science Club', coordinator: 'Dr. Anjula Gaur & Dr. Baljinder Kaur', category: 'academic', slug: 'science-club' },
    { id: 49, name: 'SkillSphere', coordinator: 'Dr Smita Parte', category: 'academic', slug: 'skillsphere' },
    { id: 51, name: 'Soft Civil Club', coordinator: 'Dr. Abhilash Shukla', category: 'academic', slug: 'soft-civil' },
    { id: 54, name: 'Standards Club', coordinator: 'Dr. Hemant Shrivastava', category: 'academic', slug: 'standards-club' },
    { id: 59, name: 'The Speakers Club', coordinator: 'Dr. Surendra Chaurasiya', category: 'academic', slug: 'speakers-club' },

    // Wellness & Spirituality
    { id: 27, name: 'Holistic Health Club', coordinator: 'Prof. Vishal Chaudhary', category: 'wellness', slug: 'holistic-health' },
    { id: 33, name: 'Meditation Club', coordinator: 'Dr. P. K. Singhal & Prof. Mahesh Parmar', category: 'wellness', slug: 'meditation-club' },
    { id: 39, name: 'Nutrition Ninja Club', coordinator: 'Dr. Anjula Gaur', category: 'wellness', slug: 'nutrition-ninja' },
    { id: 58, name: 'The Bhagwat Club', coordinator: 'Dr C S Malvi', category: 'wellness', slug: 'bhagwat-club' },

    // Professional Bodies & Chapters
    { id: 60, name: 'ISTE Student\'s Chapter MITS', coordinator: 'Dr Manjaree Pandit & Dr. Vishal Chaudhary', category: 'professional', slug: 'iste-chapter' },
    { id: 61, name: 'IETE Students\' Forum', coordinator: 'Dr.V. V. Thakre & Dr. Himanshu Singh', category: 'professional', slug: 'iete-forum' },
    { id: 62, name: 'IEI Student Chapter EED', coordinator: 'Prof. Vishal Chaudhary', category: 'professional', slug: 'iei-chapter-eed' },
    { id: 63, name: 'IEEE PES SBC', coordinator: 'Dr Bhavna Rathore', category: 'professional', slug: 'ieee-pes-sbc' },
    { id: 64, name: 'IWWA Student Chapter', coordinator: 'Prof A. K Saxena, Dr. Prachi Singh & Prof. Aditya Kumar Agarwal', category: 'professional', slug: 'iwwa-chapter' },
    { id: 65, name: 'ICI Student Chapter', coordinator: 'Prof A. K Saxena & Dr Hemant Shrivastava', category: 'professional', slug: 'ici-chapter' },
    { id: 66, name: 'SAEIndia MITS Collegiate Club', coordinator: 'Prof Vaibhav Shivhare', category: 'professional', slug: 'saeindia-mits' },
    { id: 67, name: 'GeeksforGeeks (GFG) Campus Body', coordinator: 'Dr. Kuldeep Narayan Tripathi, Dr. Mir Shahnawaz Ahmad', category: 'professional', slug: 'gfg-campus' },
    { id: 68, name: 'Soft Computing Research Society', coordinator: 'Dr. Vikas Shinde', category: 'professional', slug: 'soft-computing' },
    { id: 69, name: 'IEI Student Chapter (Mechanical Engineering)', coordinator: 'Dr. Surendra Chaurasia', category: 'professional', slug: 'iei-chapter-mech' },
    { id: 70, name: 'ACM MITS Student Chapter', coordinator: 'Neha Bharadwaj', category: 'professional', slug: 'acm-mits' },
];

export const getClubsByCategory = (categoryId) => {
    return clubs.filter(club => club.category === categoryId);
};

export const getClubBySlug = (slug) => {
    return clubs.find(club => club.slug === slug);
};

export const searchClubs = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return clubs.filter(club =>
        club.name.toLowerCase().includes(lowercaseQuery) ||
        club.coordinator.toLowerCase().includes(lowercaseQuery)
    );
};

export default clubs;
