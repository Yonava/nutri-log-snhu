export function getMealPeriod(date: Date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return 'breakfast';
  } else if (hour >= 12 && hour < 17) {
    return 'lunch';
  } else if (hour >= 17 && hour < 22) {
    return 'dinner';
  } else {
    return 'snack';
  }
}