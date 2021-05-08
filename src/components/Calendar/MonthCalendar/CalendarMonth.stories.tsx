import React from 'react';

import { Story, Meta } from '@storybook/react';
import CalendarMonth, { CalendarMonthProps } from './CalendarMonth';
import WrapWithProviders from '../../../app/Providers';
import { CreateStore } from '../../../app/Store';

export default {
  title: 'MonthCalendar',
  component: CalendarMonth,
  decorators: [
    (CalendarStory) => WrapWithProviders(<CalendarStory />, CreateStore()),
  ],
} as Meta;

const Template: Story<CalendarMonthProps> = (args) => (
  <CalendarMonth {...args} />
);

export const MonthCalendarMockMonth = Template.bind({});

MonthCalendarMockMonth.args = {
  startAtDay: 'Wed',
  numberOfDays: 30,
};
