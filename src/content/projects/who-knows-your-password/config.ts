import { Project } from "../index";

export const project: Project = {
  id: "who-knows-your-password",
  title: "Who knows your password?",
  order: 2, // Set as second in the grid
  featured: false,
  shortDescription: "A security tool to analyze password strength and check against known credential breaches.",
  fullDescription: `
    Who knows your password? is a cybersecurity utility designed to help users evaluate the strength of their passwords and determine if their credentials have been exposed in documented data breaches.
    
    The application provides real-time feedback on password complexity and security metrics, encouraging better digital hygiene and the adoption of more secure authentication practices.
  `,
  thumbnail: "/content/projects/who-knows-your-password/cover.png",
  tags: [
    { label: "Security", color: "yellow" },
    { label: "Cybersecurity", color: "blue" },
    { label: "Privacy", color: "purple" }
  ],
  liveUrl: "https://d3d34d.github.io/Who-knows-your-password-/",
  codeUrl: "https://github.com/d3d34d/Who-knows-your-password-",
  codeUrlLabel: "Github",
  stats: [
    { label: "Analysis", value: "Real-time" },
    { label: "Breach Check", value: "API" },
    { label: "Privacy", value: "Focused" }
  ]
};
