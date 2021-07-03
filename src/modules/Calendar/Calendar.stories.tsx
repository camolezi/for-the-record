/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { Story, Meta } from '@storybook/react';
import WrapWithProviders from '../../app/Providers';
import { CreateStore } from '../../app/Store';
import Calendar, { CalendarProps } from './Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
  decorators: [
    (CalendarStory) => WrapWithProviders(<CalendarStory />, CreateStore()),
  ],
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const FebCalendar = Template.bind({});
FebCalendar.args = {
  date: new Date(2021, 1),
  onNextMonth: () => {},
  onPreviousMonth: () => {},
};
