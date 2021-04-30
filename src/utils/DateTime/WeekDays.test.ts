/* eslint-disable camelcase */
import {
  getFirstWeekDayInMonth,
  getNumberDaysInMonth,
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
});
