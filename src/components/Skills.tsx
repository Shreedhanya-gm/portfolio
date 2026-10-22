import { Box, Chip, Stack, Typography } from '@mui/material';
import Section from './Section';
import { portfolio } from '../data/portfolio';

export default function Skills() {
  const groups = portfolio.skills.filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <Section id="skills" title="Skills">
      <Box sx={{ display: 'grid', gap: { xs: 4, md: 5 }, gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
        {groups.map((g) => (
          <Box key={g.title}>
            <Typography variant="h3" component="h3" sx={{ fontSize: '1.05rem', mb: 1.5 }}>{g.title}</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {g.items.map((s) => <Chip key={s} label={s} variant="outlined" />)}
            </Stack>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
