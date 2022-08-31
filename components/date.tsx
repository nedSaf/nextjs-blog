// @ts-ignore
import { parseISO, format } from "date-fns";

export default function DateElement({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
