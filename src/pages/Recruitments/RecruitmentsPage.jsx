import { motion } from 'framer-motion';
import { Briefcase, Search, Filter, MapPin, Clock, ExternalLink } from 'lucide-react';

const mockRecruitments = [
    { id: 1, title: 'Web Developer', club: 'GDSC MITS', deadline: '2026-03-01', positions: 3, applications: 25 },
    { id: 2, title: 'Content Writer', club: 'Media Committee', deadline: '2026-02-28', positions: 2, applications: 15 },
    { id: 3, title: 'Event Coordinator', club: 'E-Cell MITS', deadline: '2026-03-05', positions: 5, applications: 40 },
    { id: 4, title: 'Graphic Designer', club: 'Creative Arts Club', deadline: '2026-03-10', positions: 2, applications: 18 },
];

export default function RecruitmentsPage() {
    return (
        <div className="section-spacing">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center section-header"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-6">
                        <Briefcase className="w-4 h-4" />
                        <span>Open Positions</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                        <span className="text-primary">Club </span>
                        <span className="text-gradient">Recruitments</span>
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Join the core teams of your favorite clubs. Apply for open positions and showcase your skills.
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-xl mx-auto mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search positions..."
                            className="input pl-12 w-full"
                        />
                    </div>
                </motion.div>

                {/* Recruitments List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockRecruitments.map((recruitment, i) => (
                        <motion.div
                            key={recruitment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card group hover:border-indigo-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold font-display text-primary group-hover:text-indigo-500 transition-colors">
                                        {recruitment.title}
                                    </h3>
                                    <p className="text-secondary">{recruitment.club}</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                                    Open
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-secondary">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Deadline: {new Date(recruitment.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                                <span>{recruitment.positions} positions</span>
                                <span>{recruitment.applications} applications</span>
                            </div>

                            <button className="btn btn-primary w-full">
                                Apply Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
