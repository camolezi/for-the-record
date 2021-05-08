import { format, getDaysInMonth, startOfMonth, addMonths } from 'date-fns';

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export function getWeekDays(): WeekDay[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

export function getNumberDaysInMonth(date: Date): number {
  return getDaysInMonth(date);
}

export function getWeekDayIndex(day: WeekDay): number {
  return getWeekDays().findIndex((value) => day === value);
}

export function getFirstWeekDayInMonth(date: Date): WeekDay {
  const startMonth = startOfMonth(date);
  return getWeekDays()[startMonth.getDay()];
}

export function formatToMonthYear(date: Date): string {
  return format(date, 'MMMM YYYY');
}

export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function getPreviousMonth(date: Date): Date {
  return addMonths(date, -1);
}
