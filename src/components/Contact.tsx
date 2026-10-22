import { useState, type FormEvent } from 'react';
import { Alert, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Github, Linkedin, Mail } from 'lucide-react';
import Section from './Section';
import { portfolio } from '../data/portfolio';

type Field = 'name' | 'email' | 'message';
type Status = { kind: 'idle' | 'sending' | 'success' | 'mailto' } | { kind: 'error'; text: string };

export default function Contact() {
  const { email, github, linkedin, formEndpoint } = portfolio;
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) e.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Enter a valid email address, like name@example.com.';
    if (values.message.trim().length < 10) e.message = 'Write at least 10 characters.';
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (!formEndpoint) {
      // No backend configured: open the visitor's email app instead of faking a send.
      const body = encodeURIComponent(`${values.message}\n\n– ${values.name} (${values.email})`);
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Portfolio message')}&body=${body}`;
      setStatus({ kind: 'mailto' });
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: 'success' });
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus({ kind: 'error', text: `Your message was not sent. Try again, or email ${email} directly.` });
    }
  };

  const field = (k: Field, label: string, extra: object = {}) => (
    <TextField label={label} value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })}
      error={!!errors[k]} helperText={errors[k]} required fullWidth {...extra} />
  );

  return (
    <Section id="contact" title="Let’s work together">
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, gridTemplateColumns: { md: '1fr 1.1fr' } }}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 440 }}>
            I’m open to internships, collaborations and conversations about code. The quickest way to reach me is email.
          </Typography>
          <Stack spacing={1.5} alignItems="flex-start">
            <Link href={`mailto:${email}`} sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}><Mail size={18} aria-hidden />{email}</Link>
            <Link href={github} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}><Github size={18} aria-hidden />GitHub profile</Link>
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}><Linkedin size={18} aria-hidden />LinkedIn profile</Link>
          </Stack>
        </Box>
        <Box component="form" onSubmit={submit} noValidate aria-label="Contact form">
          <Stack spacing={2.5}>
            {field('name', 'Name', { autoComplete: 'name' })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
            {field('message', 'Message', { multiline: true, minRows: 4 })}
            <Button type="submit" variant="contained" disabled={status.kind === 'sending'} sx={{ alignSelf: 'flex-start' }}>
              {status.kind === 'sending' ? 'Sending…' : formEndpoint ? 'Send message' : 'Open in email app'}
            </Button>
            <Box aria-live="polite">
              {status.kind === 'success' && <Alert severity="success">Message sent. I’ll reply by email.</Alert>}
              {status.kind === 'error' && <Alert severity="error">{status.text}</Alert>}
              {status.kind === 'mailto' && <Alert severity="info">Your email app should open with the message filled in. If it did not, write to {email}.</Alert>}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
}
