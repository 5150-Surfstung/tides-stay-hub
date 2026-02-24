import { useState, useEffect, useCallback } from "react";
import { Send, Users, ArrowLeft, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribers, setSubscribers] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("/");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const authenticate = async () => {
    try {
      const res = await fetch("/api/push/stats", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers);
        setAuthenticated(true);
        setResult(null);
      } else {
        setResult({ type: "error", message: "Invalid admin key" });
      }
    } catch {
      setResult({ type: "error", message: "Connection failed" });
    }
  };

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch("/api/push/stats", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers);
      }
    } catch {}
  }, [adminKey]);

  useEffect(() => {
    if (authenticated) {
      refreshStats();
      const interval = setInterval(refreshStats, 30000);
      return () => clearInterval(interval);
    }
  }, [authenticated, refreshStats]);

  const sendNotification = async () => {
    if (!title.trim() || !body.trim()) {
      setResult({ type: "error", message: "Title and message are required" });
      return;
    }
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), url: url.trim() || "/" }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({
          type: "success",
          message: `Sent to ${data.sent} subscriber${data.sent !== 1 ? "s" : ""}${data.cleaned > 0 ? ` (${data.cleaned} stale removed)` : ""}`,
        });
        setTitle("");
        setBody("");
        setUrl("/");
        refreshStats();
      } else {
        setResult({ type: "error", message: data.error || "Failed to send" });
      }
    } catch {
      setResult({ type: "error", message: "Connection failed" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b2230] text-white">
      <div className="max-w-lg mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold mb-6 hover:underline" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Stay Hub
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-extrabold" data-testid="text-admin-title">Push Notifications</h1>
        </div>

        {!authenticated ? (
          <div className="bg-black/30 border border-border rounded-xl p-6 space-y-4">
            <div className="text-sm text-muted-foreground">Enter your admin key to manage push notifications.</div>
            <input
              type="password"
              placeholder="Admin key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && authenticate()}
              className="w-full px-4 py-3 rounded-xl border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="input-admin-key"
            />
            <button
              onClick={authenticate}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
              data-testid="button-authenticate"
            >
              Sign In
            </button>
            {result?.type === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm" data-testid="text-auth-error">
                <AlertCircle className="w-4 h-4" /> {result.message}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <div className="text-2xl font-extrabold text-primary" data-testid="text-subscriber-count">
                  {subscribers ?? "—"}
                </div>
                <div className="text-xs text-muted-foreground font-semibold">Active subscribers</div>
              </div>
            </div>

            <div className="bg-black/30 border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" /> Send Flash Deal
              </h2>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Title</label>
                <input
                  placeholder="e.g. Happy Hour Special!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={60}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-push-title"
                />
                <div className="text-right text-[10px] text-white/30 mt-1">{title.length}/60</div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Message</label>
                <textarea
                  placeholder="e.g. 2-for-1 cocktails at Pinky's until 7pm tonight!"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={3}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  data-testid="input-push-body"
                />
                <div className="text-right text-[10px] text-white/30 mt-1">{body.length}/200</div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Link (optional)</label>
                <input
                  placeholder="/"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-push-url"
                />
              </div>

              {title.trim() && body.trim() && (
                <div className="bg-white/5 border border-border rounded-xl p-4">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Preview</div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white">{title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{body}</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={sendNotification}
                disabled={sending || !title.trim() || !body.trim()}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                data-testid="button-send-push"
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send to {subscribers ?? 0} Subscriber{subscribers !== 1 ? "s" : ""}
                  </>
                )}
              </button>

              {result && (
                <div
                  className={`flex items-center gap-2 text-sm ${result.type === "success" ? "text-green-400" : "text-red-400"}`}
                  data-testid="text-send-result"
                >
                  {result.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {result.message}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
