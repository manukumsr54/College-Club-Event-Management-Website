-- Seed Data for College Club Event Management System

-- 1. Seed Admin
-- Credentials: admin@collegeclub.edu / Admin@123
INSERT INTO admins (email, password_hash, name)
VALUES (
    'admin@collegeclub.edu',
    '$2a$10$J8t88VVjZNCOn19kGaPoPOIBs82Y1HiALleNEO61dm4Bzd6rFU2.e',
    'Club Head Lead'
) ON CONFLICT (email) DO NOTHING;

-- 2. Seed Events
INSERT INTO events (title, description, category, date, time, venue, image, featured)
VALUES
(
    'HackNova 2026: 24-Hour National Hackathon',
    'Join over 400 passionate developers, designers, and innovators for a 24-hour sprint to solve real-world problems. Tracks include AI & Intelligent Agents, Web3 & FinTech, Sustainable Tech, and Open Innovation. Mentorship from top industry engineers, hardware lab access, meals, and over $5,000 in prizes!',
    'Technical',
    '2026-10-15',
    '09:00 AM - 09:00 AM (Next Day)',
    'Main Campus Auditorium & Tech Innovation Lab',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    TRUE
),
(
    'NeuralCraft: Hands-on Generative AI & LLM Workshop',
    'A comprehensive, interactive deep-dive into building modern AI applications with LangChain, vector databases, and multi-agent frameworks. Bring your laptop and leave with a deployed production-grade AI assistant. Open to all skill levels with basic Python knowledge.',
    'Workshop',
    '2026-10-22',
    '02:00 PM - 06:00 PM',
    'Computing Block, Seminar Hall 3B',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'CyberShield CTF: Capture The Flag Championship',
    'Test your ethical hacking, reverse engineering, web exploitation, and cryptography skills in our flagship collegiate jeopardy-style CTF. Compete individually or in teams of up to 3. Beginner friendly onboarding challenges available.',
    'Competition',
    '2026-10-28',
    '10:00 AM - 05:00 PM',
    'Cybersecurity Research Center, Room 402',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'DesignPulse: UI/UX & Product Design Sprint',
    'A rapid prototyping and design thinking challenge where students collaborate to redesign campus digital touchpoints. Featuring Figma workflow masterclasses, design critiques by senior product designers, and portfolio reviews.',
    'Workshop',
    '2026-11-05',
    '11:00 AM - 04:00 PM',
    'Design Thinking Studio, Arts & Media Wing',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'Acoustic Odyssey: Club Music & Unplugged Night',
    'An open-air evening celebrating student indie musicians, acoustic duos, and original songwriting. Relax under the fairy lights with hot cider, great vibes, and live sets from our campus musical talent.',
    'Cultural',
    '2026-11-12',
    '06:30 PM - 09:30 PM',
    'Open Amphitheatre, Student Quad',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'RoboClash: Autonomous Bot Sumo & Maze Runner',
    'Watch high-torque custom microbots battle for supremacy in our custom sumo ring and navigate sensor-driven obstacle labyrinths. Technical inspects begin at 9:30 AM.',
    'Technical',
    '2026-11-20',
    '10:00 AM - 04:00 PM',
    'Mechanical Engineering Hangar',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'Inter-Branch Esports Arena: Valorant & Rocket League',
    'Battle for departmental bragging rights in our high-octane esports tournament. Broadcast live on campus Twitch with student commentary, high-refresh displays, and gaming peripherals for all participants.',
    'Sports',
    '2026-11-25',
    '11:00 AM - 07:00 PM',
    'Student Recreation Center, E-Lounge',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    FALSE
),
(
    'TechTalks: Future of Cloud Architecture & Edge Computing',
    'An illuminating keynote session with distinguished university alumni working at hyperscalers. Learn about distributed systems, serverless patterns, and how to prepare for careers in modern infrastructure engineering.',
    'Seminar',
    '2026-12-02',
    '03:00 PM - 05:00 PM',
    'Auditorium Hall B',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    FALSE
);

-- 3. Seed Registrations for Demonstration
INSERT INTO registrations (event_id, name, email, college, year, phone)
VALUES
(1, 'Aarav Sharma', 'aarav.sharma@college.edu', 'Institute of Engineering & Technology', '3rd Year', '+91 98765 43210'),
(1, 'Rohan Verma', 'rohan.v@techuniv.edu', 'National Science Academy', '2nd Year', '+91 91234 56780'),
(1, 'Priya Nair', 'priya.nair@innovate.org', 'City Technical College', '4th Year', '+91 99887 76655'),
(2, 'Aditi Rao', 'aditi.rao@college.edu', 'Institute of Engineering & Technology', '2nd Year', '+91 98111 22334'),
(2, 'Kabir Mehta', 'kabir.m@polytech.ac.in', 'Metropolitan Polytechnic', '1st Year', '+91 97222 33445'),
(3, 'Vikram Malhotra', 'vikram.sec@college.edu', 'Institute of Engineering & Technology', '3rd Year', '+91 98333 44556'),
(4, 'Ananya Sen', 'ananya.design@artsinst.edu', 'School of Visual Arts', '2nd Year', '+91 98444 55667'),
(5, 'Ishaan Gupta', 'ishaan.g@college.edu', 'Institute of Engineering & Technology', '1st Year', '+91 98555 66778'),
(6, 'Tanvi Joshi', 'tanvi.j@mechlabs.edu', 'State Engineering College', '4th Year', '+91 98666 77889');
