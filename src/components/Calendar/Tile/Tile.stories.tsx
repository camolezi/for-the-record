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

export const HelloWorld = Template.bind({});

HelloWorld.args = {
  text: '31',
};

export const GoodbyToAWorld = Template.bind({});

GoodbyToAWorld.args = {
  text: '1',
};
