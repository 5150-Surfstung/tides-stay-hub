import { useState, useCallback } from "react";

export function usePersistedRecord(key: string) {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggle = useCallback(
    (item: string) => {
      setState((prev) => {
        const next = { ...prev, [item]: !prev[item] };
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key],
  );

  const reset = useCallback(() => {
    setState({});
    try {
      localStorage.removeItem(key);
    } catch {}
  }, [key]);

  return [state, toggle, reset] as const;
}
