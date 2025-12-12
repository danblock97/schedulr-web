import 'server-only';

export function isTurnstileBypassedInDev(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.TURNSTILE_DISABLE_IN_DEV === 'true';
}

export type TurnstileVerifyResult =
  | { success: true }
  | { success: false; error: string };

export async function verifyTurnstile(token: string, remoteIp?: string): Promise<TurnstileVerifyResult> {
  if (isTurnstileBypassedInDev()) return { success: true };
  if (!token) return { success: false, error: 'Missing Turnstile token' };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: false, error: 'Missing required env var: TURNSTILE_SECRET_KEY' };

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { success: false, error: `Turnstile HTTP ${res.status}: ${text || res.statusText}` };
  }

  const json = (await res.json()) as { success?: boolean; ['error-codes']?: string[] };
  if (json.success) return { success: true };

  const codes = json['error-codes']?.join(', ') || 'unknown';
  return { success: false, error: `Turnstile verification failed: ${codes}` };
}


