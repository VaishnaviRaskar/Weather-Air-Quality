export const formatTime = (timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const kmFromMeters = (m) => (m / 1000).toFixed(1);
