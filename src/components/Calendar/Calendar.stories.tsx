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

export const MonthCalendarMockMonth = Template.bind({});
MonthCalendarMockMonth.args = {};
