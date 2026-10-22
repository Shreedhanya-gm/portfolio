import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { useWebGL } from '../hooks/useWebGL';

const Scene3D = lazy(() => import('./Scene3D'));

function StaticOrb() {
  return (
    <Box aria-hidden sx={{ width: '55%', maxWidth: 360, aspectRatio: '1', borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, #e9e6f3 0%, #8b83a8 35%, #2a2733 75%)', boxShadow: '0 0 0 1px rgba(167,139,250,.3)' }} />
  );
}

export default function Hero() {
  const reduce = !!useReducedMotion();
  const webgl = useWebGL();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [lowPower] = useState(() => (navigator.hardwareConcurrency ?? 8) <= 2);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { role, headline, intro, location, availability } = portfolio;
  const useScene = webgl && !lowPower;

  return (
    <Box component="section" id="home" aria-labelledby="hero-title" sx={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', pt: 10, pb: 6, overflow: 'hidden' }}>
      <Box ref={wrap} sx={{ position: 'absolute', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        top: { xs: 64, md: 0 }, right: 0, bottom: { md: 0 }, left: { xs: 0, md: '38%' }, height: { xs: '42svh', md: 'auto' }, opacity: { xs: 0.55, md: 1 } }}>
        {useScene ? (
          <Suspense fallback={<StaticOrb />}><Scene3D visible={visible} reduceMotion={reduce} /></Suspense>
        ) : <StaticOrb />}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: '30svh', md: 0 } }}>
        <Box sx={{ maxWidth: 680 }}>
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Typography color="primary" sx={{ fontWeight: 600, mb: 2 }}>{role}</Typography>
            <Typography id="hero-title" variant="h1" component="h1">{headline}</Typography>
            <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 520, fontSize: '1.1rem' }}>{intro}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
              <Button href="#projects" variant="contained">Explore my work</Button>
              <Button href="#contact" variant="outlined" color="inherit" sx={{ borderColor: 'divider' }}>Get in touch</Button>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 5, color: 'text.secondary' }}>
              <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
              <Typography variant="body2">{availability}</Typography>
              <MapPin size={14} aria-hidden /><Typography variant="body2">{location}</Typography>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
