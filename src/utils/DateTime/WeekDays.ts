import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  endOfMonth,
  startOfDay,
  endOfDay,
} from 'date-fns';

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export function getWeekDays(): ReadonlyArray<WeekDay> {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
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
  return format(date, 'MMMM yyyy');
}

export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function getPreviousMonth(date: Date): Date {
  return addMonths(date, -1);
}

export function getFirstMonthDay(date: Date): Date {
  return startOfMonth(date);
}

export function getEndMonthDay(date: Date): Date {
  return endOfMonth(date);
}

export function getStartOfDay(date: Date): Date {
  return startOfDay(date);
}

export function getEndOfDay(date: Date): Date {
  return endOfDay(date);
}

export function isDateOnDay(date: Date, dayOfMonth: number): boolean {
  const day = date.getDate();
  return day === dayOfMonth;
}

export function formatSecondsToCounter(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const withLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

  return `${withLeadingZero(minutes)}:${withLeadingZero(seconds)}`;
}
