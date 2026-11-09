
export const site = {
  name: 'Aryan Gupta',

  title: 'Developer | AI & ML Enthusiast',

  intro:
    'I build modern web experiences, explore artificial intelligence, and turn ideas into real-world projects.',

  email: 'aryanguptasonu2007@gmail.com',

  github: 'https://github.com/aryanguptasonu2007-oss',

  linkedin:
    'https://www.linkedin.com/in/aryan-gupta-29306538a/',

  resume: '/projects/resume.pdf',

  photo: '/images/Profile.jpeg',

  education: {
    degree: 'B.Tech in Computer Science Engineering',
    specialization: 'Artificial Intelligence and Machine Learning',
    university: 'Rungta International Skills University',
    year: '2nd Year'
  },

  about:
    'Currently pursuing a B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning at Rungta International Skills University. I am passionate about software development, web technologies, and exploring the potential of AI. I enjoy building practical projects, learning new technologies, and turning creative ideas into meaningful solutions. Always curious to learn, grow, and improve as a developer.',

  // Short list used by the scrolling marquee under the hero
  skills: [
    'Java',
    'C',
    'Python',
    'React',
    'CSS',
    'JavaScript'
  ],

  // Skills showcase. `icon` must match a key in src/components/Skills.jsx.
  // `tag` (optional) links a skill to project tags so "Used in ..." is shown automatically.
  skillGroups: [
    {
      category: 'Programming Languages',
      blurb: 'The languages I learn and build with.',
      items: [
        { name: 'Java', icon: 'Java', tag: 'Java', text: 'Object-oriented programming and backend development.' },
        { name: 'C', icon: 'C', text: 'Programming fundamentals and problem solving.' },
        { name: 'Python', icon: 'Python', tag: 'Python', text: 'Scripting, backend APIs and AI-related work.' },
        { name: 'JavaScript', icon: 'JavaScript', tag: 'JavaScript', text: 'Building interactive web interfaces.' }
      ]
    },
    {
      category: 'Frontend Development',
      blurb: 'Building what users see and interact with.',
      items: [
        { name: 'HTML', icon: 'HTML', text: 'Semantic structure for web pages.' },
        { name: 'CSS', icon: 'CSS', tag: 'CSS', text: 'Responsive layouts and styling.' },
        { name: 'React', icon: 'React', tag: 'React', text: 'Component-based user interfaces.' }
      ]
    },
    {
      category: 'Backend & Data',
      blurb: 'Services, APIs and data behind an application.',
      items: [
        { name: 'Spring Boot', icon: 'Spring Boot', tag: 'Spring Boot', text: 'Java backend development.' },
        { name: 'REST APIs', icon: 'REST APIs', text: 'Connecting frontends with backend services.' },
        { name: 'SQL', icon: 'SQL', text: 'Querying and managing relational data.' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      blurb: 'My B.Tech specialization and main area of exploration.',
      items: [
        { name: 'Artificial Intelligence', icon: 'Artificial Intelligence', tag: 'AI', text: 'Exploring intelligent applications and tools.' },
        { name: 'Machine Learning', icon: 'Machine Learning', text: 'Learning core concepts as part of my degree.' }
      ]
    },
    {
      category: 'Core Concepts & Tools',
      blurb: 'Fundamentals and everyday developer workflow.',
      items: [
        { name: 'Data Structures and Algorithms', icon: 'Data Structures and Algorithms', text: 'Problem solving and core CS fundamentals.' },
        { name: 'Git and GitHub', icon: 'Git and GitHub', text: 'Version control and project hosting.' }
      ]
    }
  ],

  projects: [
    {
      name: 'TripPlanner',
      link: 'https://trip-planner-three-psi.vercel.app/#/',
      images: [
        '/projects/home.png',
        '/projects/destinations.png',
        '/projects/plan.png',
        '/projects/build.png'
      ],


      description:
        'TripPlanner is a tourist trip planning platform designed to help travelers explore destinations across India and organize their journeys. It combines destination discovery with personalized trip planning in an interactive experience.',

      features: [
        'Destination exploration',
        'Personalized trip planning',
        'Destination information',
        'Interactive frontend',
        'Java Spring Boot backend',
        'User authentication'
      ],

      tags: [
        'React',
        'JavaScript',
        'CSS',
        'Java',
        'Spring Boot'
      ],

      github:
        'https://github.com/aryanguptasonu2007-oss/TripPlanner.git',

      demo:
        'https://trip-planner-three-psi.vercel.app/#/'
    },

    {
      name: 'AI Resume Analyzer',
      link: 'https://resume-analyzer.vercel.app/',
      images: [
        '/projects/First.png',
        '/projects/Second.png',
        '/projects/Third.png'
      ],

      description:
        'AI Resume Analyzer is a web application that helps users evaluate their resumes against job descriptions. It identifies matching skills, highlights missing skills, and provides a resume matching score to help users understand how well their profile fits a target role.',

      features: [
        'Resume upload',
        'Job description analysis',
        'Matching skills identification',
        'Missing skills identification',
        'Resume matching score',
        'Job-specific analysis'
      ],

      tags: [
        'React',
        'Python',
        'AI',
        'FastAPI'
      ],

      github:
        'https://github.com/aryanguptasonu2007-oss/Resume_Analyzer.git',

      demo: 'https://resume-analyzer.vercel.app/'
    },

    {
      name: 'Tic-Tac-Toe',
      link: 'https://aryanguptasonu2007-oss.github.io/TIC-TAC-TOE-Game/',
      images: [
        '/projects/tic-tac-toe.png',
        '/projects/tic-tac-toe.2.png'
      ],

      description:
        'Tic-Tac-Toe is an interactive game website where you can play against the computer at different AI difficulty levels.',

      features: [
        'Interactive gameplay',
        'AI difficulty levels'
      ],

      tags: [
        'Interactive Game',
        'Difficulty Levels'
      ],

      // Add your repository / live URLs here to enable the buttons.
      github: 'https://github.com/aryanguptasonu2007-oss/TIC-TAC-TOE-Game.git',
      demo: 'https://aryanguptasonu2007-oss.github.io/TIC-TAC-TOE-Game/'
    }
  ],

  // ---------------------------------------------------------------
  // CERTIFICATIONS - one entry per PDF in public/certificates/
  //   file    : the original PDF (public/certificates/<file>)
  //   preview : image of the certificate (public/certificates/previews/<file>)
  // Newest first. See README.md ("Add a certificate").
  // ---------------------------------------------------------------
  certifications: [
    {
      title: 'Object Oriented Programming in Java',
      issuer: 'IBM',
      platform: 'Coursera',
      date: 'Apr 20, 2026',
      file: 'ibm-oop-java.pdf',
      preview: 'ibm-oop-java.jpg'
    },
    {
      title: 'Solutions Architecture Job Simulation',
      issuer: 'AWS',
      platform: 'Forage',
      date: 'Feb 1, 2026',
      file: 'aws-solutions-architecture.pdf',
      preview: 'aws-solutions-architecture.jpg'
    },
    {
      title: 'Advisors & Consulting Services Job Simulation',
      issuer: 'Mastercard',
      platform: 'Forage',
      date: 'Jan 23, 2026',
      file: 'mastercard-advisors-consulting.pdf',
      preview: 'mastercard-advisors-consulting.jpg'
    },
    {
      title: 'GenAI Powered Data Analytics Job Simulation',
      issuer: 'Tata',
      platform: 'Forage',
      date: 'Jan 20, 2026',
      file: 'tata-genai-data-analytics.pdf',
      preview: 'tata-genai-data-analytics.jpg'
    },
    {
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte',
      platform: 'Forage',
      date: 'Jan 19, 2026',
      file: 'deloitte-data-analytics.pdf',
      preview: 'deloitte-data-analytics.jpg'
    },
    {
      title: 'Getting Started with Microsoft Excel',
      issuer: 'Coursera',
      platform: 'Coursera Project',
      date: 'Dec 22, 2025',
      file: 'coursera-microsoft-excel.pdf',
      preview: 'coursera-microsoft-excel.jpg'
    }
  ],

  // ---------------------------------------------------------------
  // ACHIEVEMENTS - Google Cloud Arcade goodies photos.
  // Put images in public/goodies/ and add one entry per photo:
  //   { title: 'Short title', text: 'One short line.', image: 'photo-name.jpg' }
  // ---------------------------------------------------------------
  goodies: [
    {
      title: "Google Cloud Arcade Goodies",
      text: "Memories from my Google Cloud Arcade journey.",
      photo: '/goodies/Goodies.jpeg'
    }
  ],

  // ---------------------------------------------------------------
  // LEARNING PATH - years are intentionally omitted (add `years` to any
  // stage only when you want to show them).
  // ---------------------------------------------------------------
  learningPath: [
    {
      icon: 'school',
      stage: '10th',
      title: 'Notre Dame School',
      place: 'Gumla',
      text: 'Completed secondary education (Class 10).'
    },
    {
      icon: 'book',
      stage: '12th',
      title: 'DAV Public School',
      place: 'Gumla',
      text: 'Completed senior secondary education (Class 12).'
    },
    {
      icon: 'cap',
      stage: 'College',
      title: 'Rungta International Skills University',
      place: 'B.Tech in Computer Science Engineering',
      text: 'Specialization in Artificial Intelligence and Machine Learning.',
      badge: 'Currently in 2nd Year'
    }
  ],

  currentLearning: {
    title: 'Current Learning Journey',
    text: 'Alongside my degree, I am steadily building my technical foundation: programming, web development, problem solving and the basics of AI and machine learning.',
    focus: [
      'Java and C',
      'Python',
      'Web development with React',
      'Data Structures and Algorithms',
      'Spring Boot and REST APIs',
      'Artificial Intelligence and Machine Learning'
    ]
  },

  contact: {
    heading: "Let's Build Something Amazing",

    text:
      "Have an idea, project, or opportunity? I'd love to connect and explore how we can build something meaningful together."
  },

  nav: [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['certifications', 'Certificates'],
    ['achievements', 'Achievements'],
    ['learning', 'Learning Path'],
    ['contact', 'Contact']
  ]
}
