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

export const WithDecoration = Template.bind({});

WithDecoration.args = {
  recordsNumber: 1,
  text: '31',
};

export const WithoutDecoration = Template.bind({});

WithoutDecoration.args = {
  text: '1',
};
