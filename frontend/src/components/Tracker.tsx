import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_BASE = "/api";

export default function Tracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    fetch(`${API_BASE}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location.pathname, userAgent: navigator.userAgent, referrer: document.referrer || null }),
    }).catch(() => {});
  }, [location.pathname]);

  return null;
}
