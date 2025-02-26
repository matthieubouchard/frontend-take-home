import { DateTime } from "luxon";

export const formatDate = (dateString: string) =>
  DateTime.fromISO(dateString).toFormat("LLL d, yyyy");
