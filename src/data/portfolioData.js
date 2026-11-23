export const portfolioData = {
  personal: {
    name: "Vaishnavi More",
    role: "Software Engineer",
    titles: [
      "Software Engineer",
      "Full-Stack Web Developer",
      "Data Analytics Specialist",
      "Python & .NET Developer"
    ],
    email: "vaishnavimore1311@gmail.com",
    phone: "+91 9321126159",
    location: "Pune, Maharashtra, India",
    bio: "Passionate Software Engineer with a strong foundation in full-stack web development, data analytics, and backend architecture. Adept at building responsive user interfaces, transforming raw datasets into actionable Power BI dashboards, and developing robust applications using Python, React, and ASP.NET. Driven by problem-solving, clean code design, and creating impactful digital experiences.",
    shortBio: "Building high-performance web applications and transforming data into intelligent digital solutions.",
    github: "https://github.com/vaishnavimore1311",
    linkedin: "https://linkedin.com/in/vaishnavi-more-876701437",
    availability: "Available for Full-time Roles & Internships",
    resumeUrl: "#resume",
    stats: [
      { label: "Academic CGPA/Score", value: "75%" },
      { label: "Featured Projects", value: "4+" },
      { label: "Core Technologies", value: "15+" },
      { label: "Certifications", value: "5+" }
    ]
  },

  about: {
    headline: "Transforming Ideas into High-Quality Code & Actionable Data Insights",
    paragraphs: [
      "I am a Software Engineer based in Pune, India, currently pursuing my Bachelor of Computer Applications (BCA) at Adarsh College, Vita. My technical journey bridges modern web application engineering with data analytics, enabling me to understand both how software operates and how data drives business decisions.",
      "With hands-on experience in full-stack frameworks (React, ASP.NET MVC, Django, FastAPI) and data intelligence tools (Power BI, Power Query, DAX, SQL, Pandas), I love engineering solutions that solve real-world problems. Whether building AI-assisted roommate matching platforms or architecting automated parking systems, I prioritize user experience, performance, and maintainability.",
      "I am a continuous learner with proven agility in adapting to new tech stacks, algorithmic thinking, and collaborative team environments. I'm actively seeking opportunities to contribute to forward-thinking engineering teams."
    ],
    highlights: [
      {
        title: "Full-Stack Web Engineering",
        desc: "Creating responsive, accessible, and fast web applications using React, modern JavaScript, HTML5/CSS3, and robust backends like ASP.NET and Python."
      },
      {
        title: "Data Analytics & BI Dashboards",
        desc: "Proficient in Power BI, DAX, Power Query, and SQL to clean data, build insightful visual KPI dashboards, and deliver data-driven intelligence."
      },
      {
        title: "AI Integration & Problem Solving",
        desc: "Integrating intelligent matching algorithms and machine learning frameworks (NumPy, Pandas, FastAPI) to automate workflows and elevate user trust."
      },
      {
        title: "Clean Architecture & Version Control",
        desc: "Committed to clean code principles, modular component design, agile workflows, and version control using Git and GitHub."
      }
    ]
  },

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Adarsh College, Vita",
      period: "Expected Graduation: 04/2026",
      score: "75% Aggregate",
      description: "Comprehensive coursework in Object-Oriented Programming, Database Management Systems (DBMS), Web Technologies, Software Engineering, and Data Structures.",
      highlights: ["Strong academic track record", "Lead technical projects in Web and AI applications", "Active participant in technical symposiums"]
    },
    {
      degree: "Higher Secondary Certificate (Class 12 - HSC)",
      institution: "Modern College, Vita",
      period: "Completed: 03/2023",
      score: "52.33%",
      description: "Science stream with specialization in Mathematics, Physics, Chemistry, and Information Technology fundamentals.",
      highlights: ["Developed core analytical and mathematical problem-solving skills", "Participated in science exhibitions"]
    },
    {
      degree: "Secondary School Certificate (Class 10 - SSC)",
      institution: "Shelakbav High School, Shelakbav",
      period: "Completed: 04/2021",
      score: "88.80% (Distinction)",
      description: "Strong foundational academic performance with excellence in Mathematics, Science, and Languages.",
      highlights: ["Graduated with High Distinction (88.80%)", "School merit rank holder"]
    }
  ],

  skillCategories: [
    {
      name: "Programming Languages",
      skills: [
        { name: "Python", level: 88, icon: "python" },
        { name: "JavaScript (ES6+)", level: 85, icon: "javascript" },
        { name: "C++", level: 80, icon: "cpp" },
        { name: "C", level: 82, icon: "c" },
        { name: "C# (.NET)", level: 78, icon: "csharp" },
        { name: "Java (Basic)", level: 70, icon: "java" }
      ]
    },
    {
      name: "Web & Frameworks",
      skills: [
        { name: "React.js", level: 85, icon: "react" },
        { name: "ASP.NET MVC", level: 80, icon: "dotnet" },
        { name: "HTML5 & CSS3", level: 95, icon: "html" },
        { name: "Tailwind CSS", level: 90, icon: "tailwind" },
        { name: "FastAPI & Flask", level: 80, icon: "python" },
        { name: "Django", level: 76, icon: "django" }
      ]
    },
    {
      name: "Data Analytics & BI",
      skills: [
        { name: "Power BI Desktop", level: 90, icon: "chart" },
        { name: "SQL & Relational DBs", level: 85, icon: "database" },
        { name: "Power Query & DAX", level: 82, icon: "layers" },
        { name: "Pandas & NumPy", level: 84, icon: "code" },
        { name: "Data Visualization & Matplotlib", level: 80, icon: "chart" },
        { name: "Microsoft Excel (Advanced)", level: 92, icon: "sheet" }
      ]
    },
    {
      name: "Tools & Soft Skills",
      skills: [
        { name: "Git & GitHub", level: 88, icon: "git" },
        { name: "VS Code & Visual Studio", level: 90, icon: "terminal" },
        { name: "Problem Solving", level: 92, icon: "brain" },
        { name: "Quick Learning", level: 95, icon: "zap" },
        { name: "Time Management", level: 90, icon: "clock" },
        { name: "Team Collaboration", level: 88, icon: "users" }
      ]
    }
  ],

  projects: [
    {
      id: "roomilink-ai",
      title: "RoomiLink AI",
      category: "Full-Stack & AI",
      period: "09/2026 – 10/2026",
      featured: true,
      tagline: "AI-Powered Roommate & Rental Accommodation Platform",
      description: "Full-stack web application that helps students and working professionals find suitable rooms and compatible roommates using AI-based matching, lifestyle preferences, budget, location, and amenity compatibility. Built with fraud detection to eliminate suspicious rental listings.",
      keyFeatures: [
        "AI-driven lifestyle and roommate compatibility matching algorithm",
        "Automated suspicious listing and fraudulent rental detection system",
        "Comprehensive search filters: budget, geo-location, pet policies, and amenities",
        "Responsive, modern interface for both tenants and property owners"
      ],
      technologies: ["React.js", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "AI Matching"],
      github: "https://github.com/vaishnavimore1311/roomilink-ai",
      live: "https://roomilink-ai-demo.vercel.app",
      image: "roomilink"
    },
    {
      id: "smart-parking",
      title: "Smart Parking Management System",
      category: "Web Application",
      period: "01/2026 – 03/2026",
      featured: true,
      tagline: "Automated Vehicle Slot Allocation & Real-Time Parking Portal",
      description: "Developed a modern web-based parking management system featuring automated vehicle slot allocation, real-time availability tracking, and automated parking fee calculation.",
      keyFeatures: [
        "Algorithmic vehicle slot assignment based on vehicle dimensions and space availability",
        "Real-time visual map of occupied and vacant parking slots",
        "Secure administrative portal for checking vehicles in and out with timestamp recording",
        "Built responsive UI using HTML, CSS, JavaScript and scalable backend using ASP.NET MVC (C#)"
      ],
      technologies: ["ASP.NET MVC", "C#", "SQL Server", "JavaScript", "CSS3", "Bootstrap"],
      github: "https://github.com/vaishnavimore1311/smart-parking-management",
      live: "https://smartparking-demo.azurewebsites.net",
      image: "parking"
    },
    {
      id: "pizza-delivery",
      title: "Online Pizza Delivery Application",
      category: "Web Application",
      period: "01/2025 – 06/2025",
      featured: false,
      tagline: "Interactive Food Ordering Platform with Dynamic Customization",
      description: "Developed an engaging responsive pizza ordering web application with dynamic shopping cart capabilities, crust and topping customizer, and real-time pricing.",
      keyFeatures: [
        "Custom pizza builder with instant price updates based on ingredients and toppings",
        "Interactive shopping cart with item quantity modifiers and checkout simulation",
        "Customer authentication, order tracking, and receipt generation",
        "Responsive cross-device user experience built with PHP, MySQL, and JavaScript"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Ajax"],
      github: "https://github.com/vaishnavimore1311/online-pizza-delivery",
      live: "https://pizzadelivery-demo.com",
      image: "pizza"
    },
    {
      id: "sales-analytics-powerbi",
      title: "Enterprise Sales & KPI Analytics Dashboard",
      category: "Data Analytics",
      period: "06/2025 – 08/2025",
      featured: false,
      tagline: "Interactive Business Intelligence & Executive KPI Reporting",
      description: "Engineered an end-to-end business intelligence dashboard in Power BI. Cleaned complex datasets via Power Query, formulated advanced DAX calculations for revenue growth and profit margins, and visualized key business metrics.",
      keyFeatures: [
        "Interactive KPI cards for gross revenue, customer acquisition cost, and monthly churn",
        "Regional sales drill-down reports and cohort retention visualizations",
        "Automated data transformation pipelines using Power Query and SQL queries",
        "Published executive-ready reports with role-based viewing permissions"
      ],
      technologies: ["Power BI", "Power Query", "DAX", "SQL", "Microsoft Excel"],
      github: "https://github.com/vaishnavimore1311/powerbi-sales-analytics",
      live: "https://app.powerbi.com/view?r=sales-analytics-demo",
      image: "analytics"
    }
  ],

  certifications: [
    {
      id: "cert-cpp",
      name: "C++ Programming Certification",
      issuer: "Technical Training Institute",
      date: "2024",
      description: "Mastery of Object-Oriented Programming (OOP), memory management, pointers, templates, and Standard Template Library (STL).",
      credentialUrl: "https://github.com/vaishnavimore1311/certificates",
      skills: ["C++", "OOP", "STL", "Memory Management"]
    },
    {
      id: "cert-c",
      name: "C Programming Certification",
      issuer: "Technical Training Institute",
      date: "2023",
      description: "In-depth foundation in procedural programming, algorithmic problem solving, pointers, and data manipulation.",
      credentialUrl: "https://github.com/vaishnavimore1311/certificates",
      skills: ["C Language", "Data Structures", "Algorithms"]
    },
    {
      id: "cert-mysql",
      name: "MySQL Database Specialist",
      issuer: "Database Certification Board",
      date: "2024",
      description: "Relational database design, normalisation, complex joins, indexing, stored procedures, and query optimization.",
      credentialUrl: "https://github.com/vaishnavimore1311/certificates",
      skills: ["MySQL", "RDBMS", "SQL Queries", "Indexing"]
    },
    {
      id: "cert-java",
      name: "Java Certificate",
      issuer: "Core Java Academy",
      date: "2024",
      description: "Core Java concepts including Class hierarchy, Interfaces, Exception handling, Multithreading, and Collections framework.",
      credentialUrl: "https://github.com/vaishnavimore1311/certificates",
      skills: ["Java", "OOP", "Collections", "Exception Handling"]
    },
    {
      id: "cert-roomilink",
      name: "RoomiLink AI Project Certification",
      issuer: "Project Innovation Evaluation",
      date: "2026",
      description: "Awarded for exceptional innovation in developing an AI-driven accommodation platform with fraud listing detection algorithms.",
      credentialUrl: "https://github.com/vaishnavimore1311/certificates",
      skills: ["AI Matching", "Full-Stack Web", "Product Innovation"]
    }
  ]
};

