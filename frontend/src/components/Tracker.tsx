import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_BASE = "/api";

export default function Tracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    const fullPath = location.pathname + location.search;

    fetch(`${API_BASE}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: fullPath,
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname, location.search]);

  return null;
}