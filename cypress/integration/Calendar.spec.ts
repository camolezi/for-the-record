import {
  formatToMonthYear,
  getNextMonth,
  getNumberDaysInMonth,
  getPreviousMonth,
} from '../../src/utils/DateTime/WeekDays';

describe('Calendar Page', () => {
  beforeEach(() => {
    cy.visit('/calendar');
  });

  it('should display correct month and year title', () => {
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

  it('should display the correct number of days', () => {
    const currentDate = new Date();
    const numberOfDays = getNumberDaysInMonth(currentDate);

    for (let day = 1; day <= numberOfDays; day += 1) {
      cy.findByText(String(day), { exact: true }).should('be.visible');
    }

    cy.findByRole('button', {
      name: /NextMonth/i,
    }).click();

    const numberOfDaysNextMonth = getNumberDaysInMonth(
      getNextMonth(currentDate)
    );

    for (let day = 1; day <= numberOfDaysNextMonth; day += 1) {
      cy.findByText(String(day), { exact: true }).should('be.visible');
    }
  });
});

export default {};
