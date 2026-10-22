
# 3D developer portfolio

React + Vite + TypeScript, MUI, React Three Fiber, Framer Motion.

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # type-check + production build

- Content: edit `src/data/portfolio.ts` (name, links, skills, projects, timeline). Empty fields and lists are hidden.
- Resume button: put `resume.pdf` in `public/`, set `resumeUrl: '/resume.pdf'`.
- Contact form: without `VITE_FORM_ENDPOINT` (see `.env.example`) it opens the visitor's email app; with one it POSTs JSON and shows real success and failure states.
- Accent colour and typography: `src/theme/theme.ts`, `index.html`.


