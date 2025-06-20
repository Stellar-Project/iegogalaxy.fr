export function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000); // <-- CORRECT

  const intervals = [
    { label: "an", seconds: 31536000 },
    { label: "mois", seconds: 2592000 },
    { label: "jour", seconds: 86400 },
    { label: "heure", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "seconde", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `Il y a ${count} ${interval.label}${count > 1 ? "s" : ""}`;
    }
  }

  return "À l’instant";
}

export function getISOWeek(date: Date) {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
