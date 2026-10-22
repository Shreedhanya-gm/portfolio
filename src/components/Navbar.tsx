import { useState } from 'react';
import { AppBar, Box, Button, Drawer, IconButton, Link, Toolbar, Container, List, ListItemButton } from '@mui/material';
import { Menu, Moon, Sun, X, Download } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Mode } from '../theme/theme';

const links = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' }, { id: 'contact', label: 'Contact' },
];
const ids = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];

export default function Navbar({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const { resumeUrl, initials, name } = portfolio;

  const toggle = (
    <IconButton onClick={onToggle} aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`} color="inherit">
      {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );

  return (
    <AppBar position="fixed" color="transparent" elevation={0}
      sx={{ backdropFilter: 'blur(14px)', bgcolor: (t) => `${t.palette.background.default}b3`, borderBottom: 1, borderColor: 'divider', backgroundImage: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64, justifyContent: 'space-between' }}>
          <Link href="#home" aria-label={`${name} – back to top`} color="text.primary" sx={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', textDecoration: 'none' }}>
            {initials}<Box component="span" sx={{ color: 'primary.main' }}>.</Box>
          </Link>

          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {links.map((l) => (
              <Button key={l.id} href={`#${l.id}`} color="inherit" aria-current={active === l.id ? 'true' : undefined}
                sx={{ color: active === l.id ? 'text.primary' : 'text.secondary', borderBottom: 2, borderRadius: 0,
                  borderColor: active === l.id ? 'primary.main' : 'transparent', minHeight: 40, px: 1.5 }}>
                {l.label}
              </Button>
            ))}
            {resumeUrl && <Button href={resumeUrl} download variant="outlined" size="small" startIcon={<Download size={16} />} sx={{ ml: 1.5 }}>Resume</Button>}
            {toggle}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {toggle}
            <IconButton onClick={() => setOpen(true)} aria-label="Open menu" color="inherit"><Menu size={22} /></IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 260, p: 1 } }}>
        <IconButton onClick={() => setOpen(false)} aria-label="Close menu" sx={{ alignSelf: 'flex-end' }}><X size={22} /></IconButton>
        <List component="nav" aria-label="Mobile">
          {links.map((l) => (
            <ListItemButton key={l.id} component="a" href={`#${l.id}`} onClick={() => setOpen(false)} selected={active === l.id} sx={{ minHeight: 48 }}>{l.label}</ListItemButton>
          ))}
          {resumeUrl && <ListItemButton component="a" href={resumeUrl} download sx={{ minHeight: 48 }}>Download resume</ListItemButton>}
        </List>
      </Drawer>
    </AppBar>
  );
}
