import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { Github, ExternalLink } from 'lucide-react';
import Section from './Section';
import { portfolio, type Project } from '../data/portfolio';

function Preview({ name, index }: { name: string; index: number }) {
  const hue = [262, 280, 245][index % 3];
  const bar = (top: string, w: string, h: number, a: number, s: number) => (
    <Box sx={{ position: 'absolute', left: '16%', top, width: w, height: h, borderRadius: 4, bgcolor: `hsl(${hue} ${s}% 70% / ${a})` }} />
  );
  return (
    <Box role="img" aria-label={`Placeholder preview for ${name}`}
      sx={{ aspectRatio: '16 / 10', borderRadius: 1, border: 1, borderColor: 'divider', overflow: 'hidden', position: 'relative',
        background: `linear-gradient(135deg, hsl(${hue} 25% 16%), hsl(${hue} 20% 10%))`,
        transition: 'transform .4s', '.project:hover &': { transform: 'scale(1.015)' }, '@media (prefers-reduced-motion: reduce)': { transition: 'none' } }}>
      <Box sx={{ position: 'absolute', inset: '14% 10%', border: 1, borderColor: `hsl(${hue} 40% 45% / .5)`, borderRadius: 1 }} />
      {bar('26%', '36%', 8, 0.6, 60)}{bar('38%', '56%', 6, 0.25, 20)}{bar('48%', '44%', 6, 0.25, 20)}
    </Box>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  return (
    <Box component="article" className="project" sx={{ display: 'grid', gap: { xs: 3, md: 6 }, alignItems: 'center', gridTemplateColumns: { md: '1.1fr 1fr' }, '& > :first-of-type': { order: { md: i % 2 ? 2 : 0 } } }}>
      <Preview name={p.name} index={i} />
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          <Typography variant="h3" component="h3">{p.name}</Typography>
          {p.isPlaceholder && <Chip size="small" variant="outlined" label="Demo content" />}
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 1 }}><strong>Problem:</strong> {p.problem}</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}><strong>Solution:</strong> {p.solution}</Typography>
        <Box component="ul" sx={{ pl: 2.5, my: 2, color: 'text.secondary' }}>{p.features.map((f) => <li key={f}>{f}</li>)}</Box>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>{p.stack.map((s) => <Chip key={s} size="small" label={s} />)}</Stack>
        <Stack direction="row" spacing={3}>
          {p.github && <Link href={p.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', gap: 0.75, alignItems: 'center' }}><Github size={16} aria-hidden />Source on GitHub</Link>}
          {p.demo && <Link href={p.demo} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', gap: 0.75, alignItems: 'center' }}><ExternalLink size={16} aria-hidden />Live demo</Link>}
        </Stack>
      </Box>
    </Box>
  );
}

export default function Projects() {
  if (!portfolio.projects.length) return null;
  return (
    <Section id="projects" title="Featured projects">
      <Stack spacing={{ xs: 8, md: 12 }}>{portfolio.projects.map((p, i) => <ProjectRow key={p.name} p={p} i={i} />)}</Stack>
    </Section>
  );
}
