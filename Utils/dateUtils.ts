export function getFormattedTodayDate(): string {
  const today = new Date();
  return [
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
    today.getFullYear()
  ].join('-');
}