export function formatDateString(dateString: string): string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const isYesterday: boolean =
    currentDate.getDate() - inputDate.getDate() === 1 &&
    currentDate.getMonth() === inputDate.getMonth() &&
    currentDate.getFullYear() === inputDate.getFullYear();

  const isOlderThanYesterday: boolean = inputDate < currentDate;

  if (isYesterday) {
    return 'Yesterday';
  } else if (isOlderThanYesterday) {
    const formattedDate: string =
      inputDate.getDate() +
      '/' +
      (inputDate.getMonth() + 1) +
      '/' +
      inputDate.getFullYear().toString().substring(2);
    return formattedDate;
  } else {
    const hours: string = inputDate.getHours().toString().padStart(2, '0');
    const minutes: string = inputDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
