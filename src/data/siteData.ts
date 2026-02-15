import profileImage from '@/assets/munir.jpeg';

export const siteData = {
  name: "Munir Rahman",
  title: "Full-Stack Web Developer",
  location: "Kandahar, Afghanistan",
  tagline: "Building exceptional digital experiences with modern technologies",
  email: "munirrahmanrahmani0@gmail.com",
  phone: "+93711717893",
  profileImage: profileImage,
  socialLinks: {
    github: "https://github.com/Munir-Rahman", // Replace with actual URL
  },
  stats: {
    happyClients: 20,
    completedProjects: 30,
    yearsExperience: 3,
    technologiesMastered: 15,
  },
  roles: [
    "Full-Stack Web Developer",
    "Database Developer",
    "AI Developer",
    "Educator",
    "Freelancer",
    "Innovator",
  ],
  about: `I'm a passionate Full-Stack Developer & AI Developer based in Kandahar, Afghanistan, 
  specializing in building exceptional digital experiences. With expertise spanning 
  from frontend frameworks to database architecture and AI integration, I transform 
  complex ideas into elegant, scalable solutions. My approach combines technical 
  excellence with creative problem-solving to deliver projects that exceed expectations.`,
  
  technologies: [
    { name: "HTML", icon: "html", proficiency: "Expert", level: 98 },
    { name: "CSS", icon: "css", proficiency: "Expert", level: 97 },
    { name: "JavaScript", icon: "javascript", proficiency: "Expert", level: 99 },
    { name: "TypeScript", icon: "typescript", proficiency: "Expert", level: 96 },
    { name: "Tailwind CSS", icon: "tailwind", proficiency: "Expert", level: 98 },
    { name: "ReactJS", icon: "react", proficiency: "Expert", level: 97 },
    { name: "NextJS", icon: "nextjs", proficiency: "Expert", level: 96 },
    { name: "Node.js", icon: "nodejs", proficiency: "Expert", level: 97 },
    { name: "Express.js", icon: "express", proficiency: "Expert", level: 96 },
    { name: "MongoDB", icon: "mongodb", proficiency: "Expert", level: 96 },
    { name: "MySQL", icon: "mysql", proficiency: "Expert", level: 98 },
    { name: "SQL Server", icon: "sqlserver", proficiency: "Expert", level: 97 },
  ],

  skills: [
    { name: "JavaScript / TypeScript", level: 99 },
    { name: "React / Next.js", level: 97 },
    { name: "Node.js / Express", level: 96 },
    { name: "SQL / Database Design", level: 98 },
    { name: "Tailwind CSS", level: 98 },
    { name: "MongoDB", level: 96 },
  ],

  developmentPhases: [
    {
      phase: 1,
      title: "Requirements & Discovery",
      summary: "Understanding your vision, goals, and target audience through collaborative discussions.",
      deliverables: ["Project scope document", "Technical requirements", "Timeline & milestones"],
    },
    {
      phase: 2,
      title: "Design & Prototyping",
      summary: "Creating visual designs and interactive prototypes that bring your ideas to life.",
      deliverables: ["UI/UX wireframes", "Interactive prototypes", "Design system"],
    },
    {
      phase: 3,
      title: "Development & Testing",
      summary: "Building robust, scalable code with comprehensive testing at every stage.",
      deliverables: ["Production-ready code", "Unit & integration tests", "Performance optimization"],
    },
    {
      phase: 4,
      title: "Launch & Monitoring",
      summary: "Deploying your solution and ensuring smooth operation with ongoing support.",
      deliverables: ["Deployment & hosting", "Analytics setup", "Maintenance plan"],
    },
  ],

  // Chatbot knowledge base
  chatbotInfo: {
    personality: "innovative, dedicated, and creative developer",
    summary: "Munir Rahman is an innovative Full-Stack Web Developer, Database Developer, Educator, Freelancer, and Innovator from Kandahar, Afghanistan. He is passionate about building exceptional digital experiences using modern technologies.",
    expertise: [
      "Full-Stack Web Development with React, Next.js, Node.js",
      "Database design and development with SQL Server, MySQL, PostgreSQL, MongoDB",
      "AI and machine learning integration",
      "Frontend development with modern frameworks",
      "Backend API development and optimization",
      "Education and mentoring in programming",
    ],
    traits: [
      "Innovative problem solver",
      "Dedicated professional",
      "Creative thinker",
      "Detail-oriented developer",
      "Continuous learner",
      "Team collaborator",
    ],
  },
};

export type SiteData = typeof siteData;
