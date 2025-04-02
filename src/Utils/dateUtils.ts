import { formatDistanceToNow } from "date-fns";

/**
 * Converts an ISO date string into a human-readable relative time.
 * @param postTime - ISO 8601 date string
 * @returns Formatted relative time string
 */
export const getRelativeTime = (
  postTime: string | undefined
): string => {
  if (!postTime) return "Unknown time"; // Handle null/undefined

  try {
    const postDate = new Date(
      postTime.includes("Z")
        ? postTime
        : postTime + "Z"
    );
    if (isNaN(postDate.getTime()))
      throw new Error("Invalid date");

    let relativeTime = formatDistanceToNow(
      postDate,
      { addSuffix: true }
    );

    if (
      relativeTime.includes("less than a minute")
    ) {
      return "Just now";
    }

    return relativeTime
      .replace("about ", "")
      .replace("ago", "ago");
  } catch (error) {
    console.error(
      "Invalid date format:",
      postTime
    );
    return "Invalid date";
  }
};
