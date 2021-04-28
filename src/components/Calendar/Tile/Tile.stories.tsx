import React from 'react';

import { Story, Meta } from '@storybook/react';
import Tile, { TileProps } from './Tile';
import { CreateStore } from '../../../app/Store';
import WrapWithProviders from '../../../app/Providers';

export default {
  title: 'Tile',
  component: Tile,
  decorators: [(TileStory) => WrapWithProviders(<TileStory />, CreateStore())],
} as Meta;

const Template: Story<TileProps> = (args) => <Tile {...args} />;

export const DoubleDigitDay = Template.bind({});

DoubleDigitDay.args = {
  text: '31',
};

export const SingleDigitday = Template.bind({});

SingleDigitday.args = {
  text: '1',
};
