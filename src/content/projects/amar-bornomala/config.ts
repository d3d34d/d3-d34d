import { Project } from "../index";

export const project: Project = {
  id: "amar-bornomala",
  title: "Amar Bornomala",
  order: 1, // Set as first in the grid (after featured)
  featured: false,
  shortDescription: "Interactive educational platform for children to learn Bangla, English, and Arabic alphabets and numbers.",
  fullDescription: `
    Amar Bornomala is an interactive, educational mobile application designed primarily for children, preschoolers, and toddlers to facilitate the learning of Bangla, English, and Arabic alphabets and numbers in a fun and engaging way.
    
    The platform features comprehensive learning modules, audio pronunciations, and interactive games to reinforce early literacy. A key highlight is the digital "Hatekhori" writing practice, which allows children to practice letter tracing directly on their device.
  `,
  thumbnail: "/content/projects/amar-bornomala/dashboard.png",
  tags: [
    { label: "Education", color: "green" },
    { label: "Mobile Web", color: "blue" },
    { label: "Interactive", color: "purple" }
  ],
  liveUrl: "https://amar-bornomala-learn-bangla-475126623981.us-east1.run.app",
  codeUrl: "https://amar-bornomala-learn-bangla-475126623981.us-east1.run.app",
  codeUrlLabel: "Demo",
  stats: [
    { label: "Language", value: "Multi" },
    { label: "Platform", value: "Web" },
    { label: "User Base", value: "Toddlers" }
  ]
};
