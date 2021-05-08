import {
  formatToMonthYear,
  getNextMonth,
  getPreviousMonth,
} from '../../src/utils/DateTime/WeekDays';

describe('Calendar Page', () => {
  beforeEach(() => {
    cy.visit('/calendar');
  });

  it('should display month and year', () => {
    const currentDate = new Date();
    const currentMonthText = formatToMonthYear(currentDate);

    cy.findByText(currentMonthText, { exact: false });

    cy.findByRole('button', {
      name: /NextMonth/i,
    }).click();

    const nextMonthText = formatToMonthYear(getNextMonth(currentDate));
    cy.findByText(nextMonthText, {
      exact: false,
    });

    cy.findByRole('button', {
      name: /PreviousMonth/i,
    })
      .as('PreviousButton')
      .click();

    cy.findByText(currentMonthText, { exact: false });

    cy.get('@PreviousButton').click();

    const previousMonthText = formatToMonthYear(getPreviousMonth(currentDate));
    cy.findByText(previousMonthText, { exact: false });
  });
});

export default {};
