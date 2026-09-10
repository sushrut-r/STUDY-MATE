/**
 * Piyush Kumar Portfolio - Core Structured Data
 * B.Tech CSE (Data Science) @ CSVTU Bhilai & BS Data Science @ IIT Madras
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Piyush Kumar",
    headline: "B.Tech CSE (Data Science) | BS Data Science",
    subheadline: "3rd Semester • CSVTU Bhilai & IIT Madras • Bhilai, Chhattisgarh, India",
    brandMotto: "Building with Code. Learning with Data. Creating with People.",
    animatedTagline: [
      "Building Digital Products",
      "Exploring Data & AI Systems",
      "11M+ Views Creator on Picnic Study",
      "Crafting Practical Web Software"
    ],
    bio: "I’m Piyush Kumar, a Data Science student and aspiring software developer who enjoys building practical digital products, exploring data and turning ideas into useful applications. Alongside my technical journey, I run Picnic Study, an educational content and podcast platform where I have hosted 55+ conversations with achievers and professionals and contributed to 11M+ YouTube views. I’m currently strengthening my foundations in programming, DSA, web development, databases and data analysis while building real-world projects.",
    contact: {
      phone: "+91 8975795841",
      phoneRaw: "+918975795841",
      email: "piyushkumar.dev.contact@gmail.com",
      location: "Bhilai, Chhattisgarh, India",
      linkedin: "https://www.linkedin.com/in/piyush-kumar-743aa387",
      linkedinHandle: "in/piyush-kumar-743aa387",
      github: "https://github.com/py4312",
      githubHandle: "py4312",
      youtube: "https://youtube.com/@picnicstudy",
      youtubeHandle: "@picnicstudy"
    },
    statusBadge: "Open to Collaborations & Software / Data Internships"
  },

  education: [
    {
      id: "csvtu",
      institution: "Chhattisgarh Swami Vivekanand Technical University (CSVTU), Bhilai",
      degree: "B.Tech in Computer Science & Engineering (Data Science)",
      period: "2024 – Present (3rd Semester)",
      location: "Bhilai, Chhattisgarh, India",
      tag: "Primary Degree",
      accent: "from-cyan-500 to-blue-600",
      highlights: [
        "Specialized core curriculum in Data Science, Machine Learning Fundamentals & Systems",
        "Current coursework: Data Structures & Algorithms, Object-Oriented Programming (C++), Computer Architecture, DBMS",
        "Building practical software prototypes alongside university coursework"
      ]
    },
    {
      id: "iitm",
      institution: "Indian Institute of Technology Madras (IIT Madras)",
      degree: "BS in Data Science & Applications",
      period: "Pursuing (Dual-Track)",
      location: "Chennai / Online, India",
      tag: "Premier Dual Degree",
      accent: "from-violet-500 to-purple-600",
      highlights: [
        "Rigorous training in Mathematics for Data Science, Statistics, Computational Thinking & Python",
        "Algorithm design, data wrangling pipelines, and statistical inference foundations",
        "Simultaneous dual-degree pursuit to combine strong CSE fundamentals with advanced data science"
      ]
    },
    {
      id: "competitive",
      institution: "National Engineering Entrance Examinations",
      degree: "JEE Advanced 2025 & MHT-CET 2025 Qualified",
      period: "2025",
      location: "National Level",
      tag: "Competitive Distinction",
      accent: "from-amber-500 to-orange-600",
      highlights: [
        "Qualified JEE Advanced 2025 — Globally recognized among the most rigorous problem-solving tests",
        "Qualified MHT-CET 2025 — Proving deep analytical proficiency across Mathematics, Physics & Chemistry"
      ]
    },
    {
      id: "schooling",
      institution: "High School & Senior Secondary Board",
      degree: "Class XII (90%) & Class X (92%)",
      period: "2022 – 2024",
      location: "India",
      tag: "Academic Excellence",
      accent: "from-emerald-500 to-teal-600",
      highlights: [
        "Class XII Board: Scored 90.0% with strong focus on PCM & Computer Science",
        "Class X Board: Scored 92.0% with academic distinction across all disciplines"
      ]
    }
  ],

  skillsCategories: [
    {
      id: "programming",
      title: "Programming & Core CS",
      icon: "code",
      color: "#38bdf8",
      skills: [
        { name: "Python", status: "Proficient", isLearning: false, desc: "Data processing, scripting, automation, backend logic." },
        { name: "C++", status: "Proficient", isLearning: false, desc: "STL, memory management, algorithmic computation." },
        { name: "OOP in C++", status: "Proficient", isLearning: false, desc: "Classes, inheritance, polymorphism, encapsulation, abstractions." },
        { name: "C", status: "Foundational", isLearning: false, desc: "Pointers, memory layout, structured procedural programming." },
        { name: "DSA", status: "Developing Foundations", isLearning: true, desc: "Arrays, Linked Lists, Stacks, Queues, Trees, Recursion, Complexity Analysis." },
        { name: "Java", status: "Currently Learning", isLearning: true, desc: "JVM fundamentals, standard library, object models, cross-platform concepts." }
      ]
    },
    {
      id: "web",
      title: "Web Development",
      icon: "layout",
      color: "#818cf8",
      skills: [
        { name: "HTML5 & CSS3", status: "Proficient", isLearning: false, desc: "Semantic markup, responsive layouts, CSS Grid, Flexbox, animations." },
        { name: "JavaScript (ES6+)", status: "Proficient", isLearning: false, desc: "Async/await, DOM APIs, event architecture, modern frontend patterns." },
        { name: "Responsive Web Dev", status: "Proficient", isLearning: false, desc: "Mobile-first design, fluid typography, cross-browser compatibility." },
        { name: "Frontend Architecture", status: "Proficient", isLearning: false, desc: "Component hierarchy, state management, modern UI/UX design." },
        { name: "Web App Development", status: "Active Building", isLearning: false, desc: "Building practical web utilities, creator tools, student apps." },
        { name: "Full-Stack Dev", status: "Expanding / Learning", isLearning: true, desc: "Connecting frontend applications to REST APIs, databases & server backends." }
      ]
    },
    {
      id: "data",
      title: "Data & Database Systems",
      icon: "database",
      color: "#34d399",
      skills: [
        { name: "Python for Data Analysis", status: "Proficient", isLearning: false, desc: "Data wrangling, cleaning, automated statistical workflows." },
        { name: "NumPy", status: "Proficient", isLearning: false, desc: "Vectorized operations, n-dimensional matrix math, arrays." },
        { name: "Pandas", status: "Proficient", isLearning: false, desc: "DataFrames, aggregations, time-series, merging multi-source data." },
        { name: "SQL", status: "Proficient", isLearning: false, desc: "Relational queries, joins, groupings, aggregations, schema design." },
        { name: "DBMS Principles", status: "Currently Learning", isLearning: true, desc: "Relational theory, normalization (1NF-BCNF), ACID properties, indexing." },
        { name: "Data Analysis", status: "Currently Learning", isLearning: true, desc: "Statistical modeling, hypothesis formulation, trend exploration." },
        { name: "Excel & AI Workflows", status: "Proficient", isLearning: false, desc: "Advanced formulas, pivot tables, AI-assisted data manipulation." },
        { name: "Data Visualization", status: "Proficient", isLearning: false, desc: "Transforming raw metrics into intuitive, actionable charts & visual reports." }
      ]
    },
    {
      id: "tools_other",
      title: "Tools, AI & Executive Skills",
      icon: "cpu",
      color: "#fbbf24",
      skills: [
        { name: "Git & GitHub", status: "Proficient", isLearning: false, desc: "Version control, branching, pull requests, repository management." },
        { name: "AI-Assisted Dev", status: "Proficient", isLearning: false, desc: "Pair programming with LLMs, code scaffolding, prompt engineering." },
        { name: "Problem Solving", status: "Proficient", isLearning: false, desc: "Analytical approach honed through JEE Advanced and competitive exam training." },
        { name: "High-Level Communication", status: "Distinction", isLearning: false, desc: "Interviewing elite civil servants, IAS/IFS officers, and creators on camera." },
        { name: "Research & Synthesis", status: "Distinction", isLearning: false, desc: "Deep domain research, condensing complex subjects into structured insights." },
        { name: "Content Strategy", status: "Distinction (11M+ views)", isLearning: false, desc: "Audience psychology, retention curves, thumbnail & title optimization." },
        { name: "Project Management", status: "Proficient", isLearning: false, desc: "End-to-end execution, scheduling, resource coordination, delivery." }
      ]
    }
  ],

  projects: {
    studymate: {
      id: "studymate",
      title: "StudyMate",
      tagline: "Next-Gen Student Productivity & Digital Workspace Ecosystem",
      badge: "Major Featured Project",
      status: "In Active Development / Beta Prototype",
      overview: "StudyMate is a student-focused digital productivity ecosystem engineered to solve academic fragmentation. It unifies course syllabus tracking, customizable Pomodoro focus zones, smart flashcard revision, and centralized resource folders into one clean, distraction-free environment.",
      problem: "Students pursuing rigorous technical degrees (such as B.Tech & BS Data Science) struggle with scattered PDF materials, untracked syllabus completion, broken revision cadences, and disorganized focus sessions.",
      solution: "A centralized digital study workstation featuring active syllabus completion heatmaps, Pomodoro focus chambers with binaural soundscapes, interactive formula flashcards, and an integrated notes repository.",
      techStack: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5 Canvas", "IndexedDB / LocalStorage", "Python Analytics Backend (Prototype)"],
      features: [
        { title: "Smart Syllabus Progress Tracker", desc: "Visual milestone tracking with chapter-by-chapter completion analytics and projected exam readiness." },
        { title: "Pomodoro Focus Chamber", desc: "Interactive focus & break timers with customizable intervals, session logging, and productivity analytics." },
        { title: "Spaced-Repetition Flashcards", desc: "Interactive card deck system with self-assessment rating to reinforce core formulas and CS concepts." },
        { title: "Curriculum Resource Vault", desc: "Structured subject repository for quick access to lecture summaries, cheat sheets, and problem sets." }
      ],
      roadmap: [
        { phase: "Phase 1 (Completed)", desc: "Core Workspace UI, Responsive Layout, LocalStorage Engine, Focus Timer with audio cues." },
        { phase: "Phase 2 (In Progress)", desc: "Interactive Spaced Repetition Flashcard algorithm, CSVTU & IITM course syllabus presets." },
        { phase: "Phase 3 (Upcoming)", desc: "AI-powered automated summary generator, cloud synchronization, collaborative study rooms." }
      ]
    },

    personalizedApps: {
      id: "personalized-apps",
      title: "Personalized Web Applications for Educators & Creators",
      badge: "Prototype / In Development",
      status: "Prototype / In Active Development",
      tagline: "Bespoke Digital Platforms Built for Educational Leaders & Former PhysicsWallah (PW) Faculty",
      overview: "A dedicated suite of tailored web applications created around the specific operational and pedagogical requirements of independent educators and former PW faculty members.",
      problem: "Mass-market LMS platforms are often bloated, rigid, and slow on low-bandwidth mobile connections, preventing independent educators from delivering customized tests, personal branding, and high-engagement resources to their students.",
      solution: "Lightweight, hyper-responsive web applications tailored to educator workflows: customized chapter-wise test engines, instant student performance diagnostics, structured video course portals, and AI-assisted question bank builders.",
      highlights: [
        "Custom User Experiences designed specifically for educator-student workflows",
        "High-Performance Responsive Interfaces optimized for mobile student audiences",
        "Interactive Test Dashboards with instant score analytics and solution walkthroughs",
        "AI-Assisted Question Generation and automated solution structuring",
        "Scalable and modular frontend architecture ready for production backend integration"
      ],
      techStack: ["JavaScript", "Tailwind CSS", "HTML5 Web APIs", "Data Analytics", "AI Prompt Workflows"]
    },

    dataProjects: [
      {
        id: "youtube-eda",
        title: "YouTube Channel Audience & Retention EDA",
        category: "Data Analysis & Visualization",
        status: "Evolving Project (Active Learning)",
        problem: "Decoding viewer behavior patterns, drop-off timestamps, and topic resonance across 11M+ views on Picnic Study.",
        solution: "Exploratory data analysis pipeline processing video engagement metrics to determine optimal video durations, high-converting thumbnail tropes, and audience retention inflection points.",
        techStack: ["Python", "Pandas", "NumPy", "Matplotlib / Seaborn", "Excel"],
        impact: "Analyzed over 50+ video datasets representing millions of audience impressions."
      },
      {
        id: "academic-performance-model",
        title: "Student Preparation Strategies & Exam Correlation Analysis",
        category: "Statistical Analysis & Modeling",
        status: "Evolving Project (Active Learning)",
        problem: "Investigating quantitative correlations between daily revision routines, mock test frequency, and competitive exam outcomes.",
        solution: "Statistical correlation model evaluating preparation variables across student datasets to surface high-impact study behaviors.",
        techStack: ["Python", "Pandas", "SQL", "Excel", "Data Modeling"],
        impact: "Multi-variable statistical analysis applied to competitive entrance scenarios."
      },
      {
        id: "dual-curriculum-db",
        title: "CSVTU & IIT Madras Dual-Curriculum Schema & Indexer",
        category: "Database Design & SQL",
        status: "Evolving Project (Active Learning)",
        problem: "Structuring and tracking simultaneous prerequisites, assignment deadlines, and credit distribution across two rigorous degrees.",
        solution: "Relational database schema and SQL query pipeline designed to map course dependencies, track semester milestones, and optimize study allocation.",
        techStack: ["SQL", "DBMS Principles", "Python", "Schema Design"],
        impact: "Mapped 8 semesters of B.Tech CSE (DS) alongside IIT Madras foundational milestones."
      }
    ],

    webProjects: [
      {
        id: "picnic-hub",
        title: "Picnic Study Media & Episode Discovery Hub",
        category: "Interactive Web Application",
        status: "Prototype",
        problem: "55+ long-form interviews across UPSC, CAPF, CA, and NEET required an intuitive, filterable portal for student exploration.",
        solution: "Fast, responsive web portal featuring instant category filtering, time-coded topic markers, guest bios, and direct YouTube player integration.",
        techStack: ["JavaScript (ES6+)", "CSS3 Flexbox/Grid", "Web APIs", "Responsive UI"],
        github: "https://github.com/py4312",
        demo: "#picnic-study"
      },
      {
        id: "dev-terminal",
        title: "Cybernetic 3D Developer Portfolio & Terminal",
        category: "Creative Web Development",
        status: "Completed",
        problem: "Traditional resume websites fail to communicate dual-discipline competence in engineering, data, and executive communication.",
        solution: "Bespoke 3D WebGL developer universe featuring an interactive CLI terminal, real-time particle constellation, and audio frequency visualizer.",
        techStack: ["Three.js", "JavaScript", "Tailwind CSS", "HTML5 Canvas"],
        github: "https://github.com/py4312",
        demo: "#"
      },
      {
        id: "algo-sorter",
        title: "Algorithmic Logic & Sorting Visualizer",
        category: "CS Utility",
        status: "In Development",
        problem: "Abstract DSA sorting logic and pointer manipulations can be difficult to conceptualize without visual feedback.",
        solution: "Interactive browser canvas animating Bubble Sort, Quick Sort, Binary Search, and recursion stacks step-by-step.",
        techStack: ["JavaScript", "HTML5 Canvas", "CSS Animations", "DSA Foundations"],
        github: "https://github.com/py4312",
        demo: "#"
      },
      {
        id: "edtech-quiz",
        title: "Dynamic Assessment & Quiz Engine",
        category: "EdTech Application",
        status: "Prototype",
        problem: "Educators require low-latency quiz engines with instant score breakdowns and explanation modules for student cohorts.",
        solution: "Clean web quiz engine with active countdown timer, randomized question banks, categorized score analytics, and review modes.",
        techStack: ["JavaScript (ES6+)", "Tailwind CSS", "JSON Schema", "LocalStorage"],
        github: "https://github.com/py4312",
        demo: "#"
      }
    ]
  },

  picnicStudy: {
    title: "FROM CODE TO CONVERSATIONS",
    brand: "PICNIC STUDY",
    role: "Founder & Podcast Host",
    tagline: "Demystifying High-Stakes Careers, Competitive Exams & Success Mindsets",
    views: "11M+",
    viewsCount: 11200000,
    podcastsCount: 55,
    description: "Piyush founded Picnic Study to bridge the information and mentorship gap for millions of ambitious Indian students. As host and executive creator, he leads long-form dialogues with achievers from UPSC, CAPF, IRS, IFS, CA, CS, NEET and other competitive fields — translating years of preparation into actionable wisdom.",
    stats: [
      { value: "11M+", label: "YouTube Views", sub: "Organic Audience Reach" },
      { value: "55+", label: "Podcasts Hosted", sub: "In-Depth Interviews" },
      { value: "10+", label: "Domains Explored", sub: "UPSC, CAPF, IRS, CA, NEET" },
      { value: "100%", label: "End-to-End Ownership", sub: "Research to Distribution" }
    ],
    responsibilities: [
      { icon: "search", title: "Deep Guest Research", desc: "Exhaustive background synthesis into guest careers, exam blueprints, psychological hurdles, and unique perspectives prior to every recording." },
      { icon: "send", title: "High-Stakes Outreach", desc: "Cold pitching and coordinating directly with senior civil servants, IRS/IFS officers, UPSC AIR achievers, CA rankers, and defense personnel." },
      { icon: "mic", title: "Interview Direction & Hosting", desc: "Structuring 60-90 minute multi-part conversations, asking penetrating questions, maintaining on-camera poise, and steering deep discussions." },
      { icon: "image", title: "Thumbnail & Title Psychology", desc: "A/B testing visual packaging, crafting high-CTR titles, and applying data-driven audience retention strategies." },
      { icon: "trending-up", title: "Audience Engagement & SEO", desc: "Managing community discussions, analyzing YouTube Studio retention curves, optimizing search tags and timestamps." },
      { icon: "video", title: "Production & Direction", desc: "Studio setup, audio post-production, lighting, multi-camera switching coordination, and final video release management." }
    ],
    guestCategories: [
      {
        category: "Civil Services (UPSC / IRS / IFS)",
        icon: "award",
        summary: "Strategy masterclasses with UPSC AIR rankers and officers breaking down prelims, mains answer writing, optional subjects, and interview board psychology.",
        tag: "UPSC & Civil Services"
      },
      {
        category: "Defense & Paramilitary (CAPF / Armed Forces)",
        icon: "shield",
        summary: "Conversations with CAPF Assistant Commandants on physical training, leadership under pressure, and mental fortitude.",
        tag: "Defense Forces"
      },
      {
        category: "Finance & Corporate Law (CA / CS)",
        icon: "briefcase",
        summary: "Insights from Chartered Accountants and Company Secretaries on tackling CA Final, articleship rigor, and corporate finance.",
        tag: "Finance & Law"
      },
      {
        category: "Medical & Sciences (NEET / Healthcare)",
        icon: "activity",
        summary: "Top NEET scorers and doctors detailing memorization frameworks, physics numerical shortcuts, and handling high-stakes exam day pressure.",
        tag: "Medical & Healthcare"
      }
    ],
    youtubeUrl: "https://youtube.com/@picnicstudy"
  },

  beyondCode: {
    title: "BEYOND CODE",
    subtitle: "Communication, Research & Executive Execution",
    quote: "A capable developer writes code. An exceptional builder communicates the vision, researches deeply, understands human psychology, and executes relentlessly.",
    pillars: [
      {
        icon: "users",
        title: "Executive Communication & Outreach",
        desc: "Comfortable initiating conversations with senior civil servants, academic mentors, and industry leaders with poise and credibility."
      },
      {
        icon: "file-search",
        title: "In-Depth Research & Domain Synthesis",
        desc: "Ability to rapidly absorb unfamiliar domains — from tax law and defense protocols to machine learning architectures — and extract core truths."
      },
      {
        icon: "message-square",
        title: "Translating Complex Concepts",
        desc: "Skilled at deconstructing intricate technical, procedural, or academic ideas into clear, engaging, student-friendly narratives."
      },
      {
        icon: "compass",
        title: "Content Strategy & Audience Psychology",
        desc: "Intuitive and data-backed understanding of audience retention, curiosity triggers, and digital distribution dynamics."
      },
      {
        icon: "target",
        title: "End-to-End Project Ownership",
        desc: "Proven capacity to take an initiative from raw concept to scheduling, production, technical execution, and public launch."
      },
      {
        icon: "sparkles",
        title: "Public Speaking & On-Camera Presence",
        desc: "Extensive experience moderating high-profile dialogues on camera with structured articulation and spontaneous adaptability."
      }
    ]
  },

  achievements: [
    { value: "11M+", label: "YouTube Views", detail: "Organic view count achieved across educational podcasts and videos on Picnic Study.", isTop: true },
    { value: "55+", label: "Podcasts Hosted", detail: "In-depth conversations hosted with top civil servants, rankers, and industry experts.", isTop: true },
    { value: "90%", label: "Class XII Board", detail: "Senior Secondary Board Examination with distinction in Physics, Chemistry & Mathematics.", isTop: false },
    { value: "92%", label: "Class X Board", detail: "Secondary School Examination with high academic honors across all subjects.", isTop: false },
    { value: "2025", label: "JEE Advanced Qualified", detail: "Qualified India's prestigious and highly competitive engineering entrance examination.", isTop: true },
    { value: "2025", label: "MHT-CET Qualified", detail: "Qualified Maharashtra State Common Entrance Test for engineering programs.", isTop: false }
  ]
};
