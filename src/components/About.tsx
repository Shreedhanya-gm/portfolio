import { Box, Typography } from '@mui/material';
import Section from './Section';
import { portfolio } from '../data/portfolio';

export default function About() {
  const { summary, philosophy, learning, highlights } = portfolio.about;
  return (
    <Section id="about" title="About">
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, gridTemplateColumns: { md: '1.3fr 1fr' } }}>
        <Box sx={{ maxWidth: 620 }}>
          {summary.map((p) => <Typography key={p} color="text.secondary" sx={{ mb: 2 }}>{p}</Typography>)}
          <Typography variant="h3" component="h3" sx={{ mt: 4, mb: 1 }}>How I work</Typography>
          <Typography color="text.secondary">{philosophy}</Typography>
          <Typography variant="h3" component="h3" sx={{ mt: 4, mb: 1 }}>Learning next</Typography>
          <Typography color="text.secondary">{learning}</Typography>
        </Box>
        <Box component="dl" sx={{ m: 0, alignSelf: 'start' }}>
          {highlights.map((h) => (
            <Box key={h.label} sx={{ py: 2, borderBottom: 1, borderColor: 'divider', '&:first-of-type': { pt: 0 } }}>
              <Typography component="dt" variant="body2" color="text.secondary">{h.label}</Typography>
              <Typography component="dd" sx={{ m: 0, fontWeight: 600 }}>{h.value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
