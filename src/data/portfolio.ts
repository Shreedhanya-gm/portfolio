// All personal content lives here. Replace every PLACEHOLDER value with your own.
// Empty strings / empty arrays are hidden automatically in the UI.

export interface Project {
  name: string; problem: string; solution: string; features: string[];
  stack: string[]; github: string; demo: string; isPlaceholder: boolean;
}
export interface SkillGroup { title: string; items: string[] }
export interface TimelineItem { period: string; title: string; place: string; description: string }

export const portfolio = {
  name: 'Your Name',            // PLACEHOLDER
  initials: 'YN',
  role: 'Computer Science Student & Aspiring Developer',
  headline: 'Building thoughtful digital experiences.',
  intro: 'I enjoy turning ideas into working software: careful engineering, creative interfaces, steady problem-solving, and learning something new with every project.',
  location: 'Bengaluru, India', // PLACEHOLDER
  availability: 'Open to internships and collaborations',
  email: 'you@example.com',     // PLACEHOLDER
  github: 'https://github.com/your-username',
  linkedin: 'https://www.linkedin.com/in/your-username',
  resumeUrl: '',                // e.g. '/resume.pdf' (put the file in /public). Hidden while empty.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
  about: {
    summary: [
      'PLACEHOLDER: I am a computer science student who likes building things end to end, from the interface to the data underneath.',
      'PLACEHOLDER: Outside of coursework I explore graphics programming, open-source tools and anything that makes the web feel more alive.',
    ],
    philosophy: 'Make it work, make it clear, then make it fast. Simple code that others can read beats clever code.',
    learning: 'Systems design, testing practices, and WebGL/shader fundamentals.',
    highlights: [
      { label: 'Education', value: 'B.Tech, Computer Science (PLACEHOLDER)' },
      { label: 'Interests', value: 'Web, graphics, developer tools' },
      { label: 'Current focus', value: 'Full-stack projects with TypeScript' },
    ],
  },
  skills: [
    { title: 'Programming languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'] },
    { title: 'Frontend development', items: ['React', 'HTML & CSS', 'Material UI', 'Three.js'] },
    { title: 'Backend development', items: ['Node.js', 'Express', 'REST APIs'] },
    { title: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
    { title: 'Tools and platforms', items: ['Git & GitHub', 'Linux', 'Vite', 'VS Code'] },
    { title: 'Core computer science', items: ['Data structures', 'Algorithms', 'Operating systems', 'Databases', 'Networks'] },
  ] as SkillGroup[],
  projects: [
    { name: 'Sample project: Task Planner', problem: 'Students juggle deadlines across many tools.', solution: 'A single planner that groups tasks by course and due date.', features: ['Drag-and-drop boards', 'Due-date reminders', 'Offline support'], stack: ['React', 'TypeScript', 'Node.js'], github: '', demo: '', isPlaceholder: true },
    { name: 'Sample project: Campus Map', problem: 'New students struggle to find buildings and rooms.', solution: 'An interactive map with search and walking routes.', features: ['Room search', 'Accessible routes', 'Mobile-first layout'], stack: ['React', 'Leaflet', 'PostgreSQL'], github: '', demo: '', isPlaceholder: true },
    { name: 'Sample project: Algorithm Visualizer', problem: 'Algorithms are hard to grasp from static diagrams.', solution: 'Step-by-step animations for sorting and graph algorithms.', features: ['Speed control', 'Step back and forward', 'Complexity notes'], stack: ['TypeScript', 'Canvas API'], github: '', demo: '', isPlaceholder: true },
  ] as Project[],
  timeline: [
    { period: '2022 – present', title: 'B.Tech in Computer Science', place: 'Your University (PLACEHOLDER)', description: 'Coursework in algorithms, databases and operating systems.' },
  ] as TimelineItem[],
};
