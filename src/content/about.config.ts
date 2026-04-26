// ================================================================
// ABOUT PAGE CONFIGURATION
// Edit this file to update your bio, skills, and profile photo.
// ================================================================

export const aboutConfig = {
  // ── PROFILE IMAGE ─────────────────────────────────────────────
  // Replace the file at public/content/profile.jpg to update your photo.
  profileImage: "/images/dhebo_profile.jpg",      // ← Path to your photo
  profileImageAlt: "Dhebobrotha Dhibo - Profile",    // ← Alt text for accessibility

  // ── INTRO ─────────────────────────────────────────────────────
  greeting: "Hello, I'm",                    // ← Greeting prefix
  name: "Dhebobrotha Dhibo",                 // ← Your displayed name
  title: "Cybersecurity Analyst",            // ← Your job title / role

  // ── BIO ───────────────────────────────────────────────────────
  // Each string in this array becomes a separate paragraph.
  bio: [
    "Cybersecurity Specialist with 7+ years of experience in IT and telecommunications. Expert in network security, threat analysis, and digital defense. Specialized in identifying vulnerabilities, performing root cause analysis, and mitigating security threats like phishing and malware to protect critical organizational assets.",
  ],

  // ── EXPERTISE ──────────────────────────────────────────────────
  expertise: [
    "Threat Detection & Analysis",
    "Network & Information Security",
    "Vulnerability Management",
    "Root Cause Analysis",
    "Incident Documentation",
    "Customer Support & Troubleshooting",
  ],

  // ── SKILLS ────────────────────────────────────────────────────
  // Add or remove skill categories. Each category has a label, icon, and list of items.
  skillCategories: [
    {
      category: "Network Security",
      icon: "🌐",
      skills: ["TCP/IP", "Firewalls", "VPNs", "Wireshark"],
    },
    {
      category: "Cybersecurity Tools",
      icon: "🛠️",
      skills: ["Nmap", "Metasploit", "Burp Suite", "SIEM Tools"],
    },
    {
      category: "Defense & Analysis",
      icon: "🛡️",
      skills: ["Threat Detection", "Phishing Analysis", "Malware Identification"],
    },
    {
      category: "IT & Systems",
      icon: "💻",
      skills: ["Troubleshooting", "Incident Reporting", "Compliance", "Linux"],
    },
  ],

  // ── EDUCATION ──────────────────────────────────────────────────
  education: [
    {
      degree: "Applied Computer Science, Computer Science",
      institution: "The University of Winnipeg",
    },
    {
      degree: "Bachelor's degree, Computer Science & Engineering",
      institution: "Leading University",
    },
    {
      degree: "Diploma in Creative Advertising, Advertising",
      institution: "Seneca Polytechnic",
    },
  ],

  // ── RESUME ─────────────────────────────────────────────────────
  resumeUrl: "/content/resume.pdf",
  resumeUpdated: "April 2026",
};
