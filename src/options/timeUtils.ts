export function formatTimeString(timestampString: string): string {
  const inputDate = new Date(timestampString);
  const hours: string = inputDate.getHours().toString().padStart(2, '0');
  const minutes: string = inputDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
