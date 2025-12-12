'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type PriorityOption = 'none' | 'urgent' | 'high' | 'medium' | 'low';

function TurnstileWidget(props: { onToken: (token: string | null) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const bypassInDev =
    process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_TURNSTILE_DISABLE_IN_DEV === 'true';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (bypassInDev) {
      props.onToken('dev-bypass');
      return;
    }
    if (!siteKey) return;
    if (!containerRef.current) return;
    if (renderedRef.current) return;

    const render = () => {
      if (!containerRef.current) return;
      if (!window.turnstile) return;
      if (renderedRef.current) return;

      renderedRef.current = true;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: unknown) => props.onToken(typeof token === 'string' ? token : null),
        'expired-callback': () => props.onToken(null),
        'error-callback': () => props.onToken(null),
      });
    };

    // Load Turnstile script once.
    const scriptId = 'cf-turnstile-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if (window.turnstile) render();
      else existing.addEventListener('load', render, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', render, { once: true });
    document.head.appendChild(script);
  }, [props, siteKey]);

  const reset = () => {
    props.onToken(bypassInDev ? 'dev-bypass' : null);
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  // Expose a simple reset by listening to a custom event (used after submit).
  useEffect(() => {
    const handler = () => reset();
    window.addEventListener('turnstile-reset', handler);
    return () => window.removeEventListener('turnstile-reset', handler);
  }, []);

  if (bypassInDev) {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
        Spam protection is disabled in development.
      </div>
    );
  }

  if (!siteKey) {
    return (
      <div className="text-sm text-red-600">
        Turnstile is not configured. Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>.
      </div>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" />;
}

export function BugReportForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityOption>('none');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ identifier: string; stateName: string | null } | null>(
    null,
  );

  const canSubmit = useMemo(() => {
    return (
      title.trim().length >= 3 &&
      description.trim().length >= 10 &&
      !submitting &&
      !!turnstileToken
    );
  }, [description, submitting, title, turnstileToken]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!turnstileToken) {
      setError('Please complete the spam check.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/linear/issueCreate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          priority,
          turnstileToken,
        }),
      });

      const json = (await res.json().catch(() => ({}))) as
        | { issue?: { identifier: string; url: string | null; stateName: string | null }; error?: string }
        | undefined;

      if (!res.ok) {
        setError(json?.error || 'Failed to submit bug report.');
        return;
      }

      if (!json?.issue?.identifier) {
        setError('Bug report submitted, but response was unexpected.');
        return;
      }

      setSuccess({ identifier: json.issue.identifier, stateName: json.issue.stateName ?? null });
      setTitle('');
      setDescription('');
      setPriority('none');
      setTurnstileToken(null);
      window.dispatchEvent(new Event('turnstile-reset'));
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card hover={false} className="p-0 overflow-hidden border border-gray-100 shadow-lg shadow-indigo-100">
      <div className="p-6 md:p-8 text-left">
        {success ? (
          <div className="py-8 md:py-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm"
                >
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading mt-5">
                Bug report received
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2 max-w-md">
                Thanks — we’ll take a look as soon as we can.
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Reference: <span className="font-semibold text-gray-500">{success.identifier}</span>
              </p>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setSuccess(null);
                    setError(null);
                    window.dispatchEvent(new Event('turnstile-reset'));
                  }}
                >
                  Submit another
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading">Report a bug</h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  This goes straight into our backlog (label: <span className="font-semibold">Schedulr</span>).
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <Input
                label="Issue title"
                placeholder="E.g. Invite link shows a blank screen"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue description</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base min-h-[140px] resize-y focus:outline-none focus:ring-2 focus:ring-[#FA4A8C] focus:border-transparent transition-all duration-200"
                  placeholder="Steps to reproduce, what you expected, what happened, device/iOS version, screenshots, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={10000}
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FA4A8C] focus:border-transparent transition-all duration-200 bg-white"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityOption)}
                >
                  <option value="none">No priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="pt-1">
                <TurnstileWidget onToken={setTurnstileToken} />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end">
                <Button type="submit" variant="primary" size="md" disabled={!canSubmit}>
                  {submitting ? 'Submitting…' : 'Submit bug report'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Card>
  );
}


