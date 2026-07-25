export function formatDate(dateString) {
  if (!dateString) return "Unknown";

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatNumber(num) {
  if (num == null) return "0";
  return new Intl.NumberFormat("en-US").format(num);
}
