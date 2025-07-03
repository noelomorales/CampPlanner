import { useState } from 'react';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);

  async function submit() {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pw }),
    });
    if (res.ok) setAuthed(true);
    setPw('');
  }

  if (authed) return <>{children}</>;
  return (
    <div>
      <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="password" />
      <button onClick={submit}>Enter</button>
    </div>
  );
}
