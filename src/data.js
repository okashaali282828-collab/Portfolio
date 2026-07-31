import logoUrl from "./assets/images/logo.png";
import photoUrl from "./assets/images/profile-photo.png";

const DATA = {
  name: "Muhammad Okasha",
  role: "Front-end Back-end Developer / UI Designer",
  logoUrl,
  photoUrl,

  nav: ["About me", "Skills", "Portfolio"],

  social: {
    email: "mailto:okashalinkedin@gmail.com",
    github: "https://github.com/okashaali282828-collab",
    linkedin: "https://www.linkedin.com/in/muhammad-okasha28/",
    facebook: "https://www.facebook.com/okasha57437",
    instagram: "https://www.instagram.com/me_okasha/?hl=en",
  },

  banner: {
    title: "DIGITAL TRANSFORMATION",
    text: "Converting business vision into scalable, high-impact web applications built with modern tools.",
  },

  about: {
    title: "Okasha | Software & Web Developer",
    intro:
      "Hi, I'm Okasha! I'm a developer based in Lahore. Over the past 2 Years, I’ve been dedicated to mastering front-end technologies and turning creative designs into functional, interactive websites.",
    bio: "Driven and innovative Developer with a passion for building scalable digital products and modern applications. Experienced in writing clean, efficient code and delivering seamless user experiences. Always eager to adopt new technologies and tackle challenging technical problems.",
    cards: [
      {
        icon: "PenTool",
        title: "DESIGN",
        text: "I can design the website based on your needs and suggestions. I can also create it from scratch by consulting with you during work.",
      },
      {
        icon: "Code2",
        title: "DEVELOPMENT",
        text: "Based on a project created by me or another one, sent by you, I can program the website to be fully functional and responsive.",
      },
      {
        icon: "Wrench",
        title: "MAINTENANCE",
        text: "In case of any problems or the need for changes, I can introduce new functionalities and solutions.",
      },
    ],
  },

  skills: {
    usingNow: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JAVASCRIPT",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "REACT",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "NODE JS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "TAILWINDCSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "GIT",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
    ],
    learning: [
      {
        name: "NEXT JS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "NEST JS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
      },
      {
        name: "TYPESCRIPT",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "MONGODB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "MYSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
    other: [
      {
        name: "JAVA",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "PYTHON",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        name: "SQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
      },
    ],
  },

  portfolio: {
    bgUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=60",
    projects: [
      // data.js ke portfolio.projects array mein isey add karein:

{
  title: "AI Image Generator",
  tags: "coded, designed",
  desc: "An AI-powered image generation application built with modern web tools.",
  imgUrl: "/imagep1.png", // Aap yahan apni project ki screenshot URL bhi daal sakte hain
  category: "coded",
  demoUrl: "ai-image-generator-chi-pearl.vercel.app", // Agar live demo website link hai toh yahan daalein
  moreUrl: "https://github.com/okashaali282828-collab/ai-image-generator", // Aap ki GitHub repo link
},
      {
        title: "Resume Ats Checker",
        tags: "coded",
        desc: "A web application that checks resumes against job descriptions for ATS compatibility.",
        imgUrl: "./imagep2.png",
        category: "coded",
        demoUrl: "https://resume-ats-checker-production.up.railway.app/", // Agar live demo website link hai toh yahan daalein
        moreUrl: "https://github.com/okashaali282828-collab/Resume-Ats-Checker.git",
      },
      {
        title: "ITSM Mobile App",
        tags: "designed",
        desc: "A mobile app experience for ITSM Service Management that will enable your mobile workforce to reach new levels of productivity",
        imgUrl: "./imagep3.png",
        category: "designed",

      },
      {
        title: "Portfolio Website",
        tags: "coded, designed",
        desc: "Coming Soon: Application to show case my skills, projects, and contact information in a visually appealing way with an AI chatbot feature.",
        imgUrl: "./imagep4.png",
        category: "coded, designed",
      },
    ],
  },

  contact: {
    text: "Got a project in mind or just want to say hi? Fill out the form below, and I'll get back to you as soon as possible!",
  },

  footer: {
    year: "2026",
  },
};

export default DATA;