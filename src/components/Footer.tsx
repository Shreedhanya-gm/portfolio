import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { portfolio } from '../data/portfolio';

export default function Footer() {
  const { name, github, linkedin } = portfolio;
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ sm: 'center' }}>
          <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} {name}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" color="text.secondary"><Github size={20} /></Link>
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" color="text.secondary"><Linkedin size={20} /></Link>
            <IconButton component="a" href="#home" aria-label="Back to top"><ArrowUp size={20} /></IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
