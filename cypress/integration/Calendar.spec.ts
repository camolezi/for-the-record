import { formatToMonthYear } from '../../src/utils/DateTime/WeekDays';

describe('Calendar Page', () => {
  beforeEach(() => {
    cy.visit('/calendar');
  });

  it('should display month and year', () => {
    const currentMonthYear = formatToMonthYear(new Date());
    cy.findByText(currentMonthYear, { exact: false });

    cy.findByRole('button', {
      name: /NextMonth/i,
    }).click();

    cy.findByRole('button', {
      name: /PreviousMonth/i,
    });
  });
});

export default {};
