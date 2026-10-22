import type { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';

interface Props { id: string; title: string; children: ReactNode }

export default function Section({ id, title, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <Box component="section" id={id} aria-labelledby={`${id}-title`} sx={{ py: { xs: 9, md: 14 }, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography id={`${id}-title`} variant="h2" component="h2" sx={{ mb: { xs: 5, md: 7 } }}>{title}</Typography>
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}
