import { Box, Typography } from '@mui/material';
import Section from './Section';
import { portfolio } from '../data/portfolio';

export default function Education() {
  if (!portfolio.timeline.length) return null;
  return (
    <Section id="experience" title="Education and experience">
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {portfolio.timeline.map((t) => (
          <Box component="li" key={t.title} sx={{ display: 'grid', gap: 1, gridTemplateColumns: { md: '200px 1fr' }, py: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography color="text.secondary">{t.period}</Typography>
            <Box>
              <Typography variant="h3" component="h3">{t.title}</Typography>
              <Typography color="primary" sx={{ mb: 1 }}>{t.place}</Typography>
              <Typography color="text.secondary">{t.description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
