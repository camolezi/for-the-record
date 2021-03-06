/* eslint-disable camelcase */
import {
  formatToMonthYear,
  getFirstMonthDay,
  getFirstWeekDayInMonth,
  getNextMonth,
  getNumberDaysInMonth,
  getPreviousMonth,
  getWeekDayIndex,
} from './WeekDays';

describe('WeekDays utility library', () => {
  describe('#getNumberDaysInMonth', () => {
    it('should return the number of days in the month of a date', () => {
      const feb_3_2021 = new Date(2021, 1, 3);
      expect(getNumberDaysInMonth(feb_3_2021)).toBe(28);
    });
  });

  describe('#getFirstWeekDayInMonth', () => {
    it('should return the first week day name in the month of the provided date', () => {
      const feb_3_2021 = new Date(2021, 1, 3);
      expect(getFirstWeekDayInMonth(feb_3_2021)).toBe('Mon');

      const april_5_2021 = new Date(2021, 3, 5);
      expect(getFirstWeekDayInMonth(april_5_2021)).toBe('Thu');
    });
  });

  describe('#getWeekDayIndex', () => {
    it('should return the index of the week day', () => {
      expect(getWeekDayIndex('Mon')).toBe(1);
      expect(getWeekDayIndex('Sat')).toBe(6);
    });
  });

  describe('#formatToMonthYear', () => {
    it('should return the month/year of the provided date', () => {
      const feb_3_2021 = new Date(2021, 1, 3);
      expect(formatToMonthYear(feb_3_2021)).toMatch(/February 2021/i);

      const april_5_2021 = new Date(2021, 3, 5);
      expect(formatToMonthYear(april_5_2021)).toMatch(/April 2021/i);
    });
  });

  describe('#getNextMonth', () => {
    it('should return the next month of the provided date', () => {
      const feb_3_2021 = new Date(2021, 1, 3);

      expect(getNextMonth(feb_3_2021).getMonth()).toBe(
        feb_3_2021.getMonth() + 1
      );
    });
  });

  describe('#getPreviousMonth', () => {
    it('should return the previous month of the provided date', () => {
      const feb_3_2021 = new Date(2021, 1, 3);

      expect(getPreviousMonth(feb_3_2021).getMonth()).toBe(
        feb_3_2021.getMonth() - 1
      );
    });
  });

  describe('#getFirstMonthDay', () => {
    it('should return the first day of the month', () => {
      const feb_3_2021 = new Date(2021, 1, 3);
      const firstDay = new Date(2021, 1);

      expect(getFirstMonthDay(feb_3_2021)).toStrictEqual(firstDay);
    });
  });
});
