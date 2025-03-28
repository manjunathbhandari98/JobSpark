export const formatDateToMonthYear = (dateString: string) => {
  if (!dateString) return ""; // Handle empty or invalid input
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};
