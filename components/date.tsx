// @ts-ignore
import { parseISO, format } from "date-fns";

/**
 * Format a timestamp to a human-readable date.
 *
 * @param timestamp : string
 *   The timestamp.
 *
 * @constructor
 */
export default function DateElement({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp);
  return <time dateTime={timestamp}>{format(date, "LLLL d, yyyy")}</time>;
}
