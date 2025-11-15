import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

type IconProps = React.ComponentProps<typeof FontAwesome>;

export default function TabBarIcon(props: IconProps) {
  const { size = 24, color, ...rest } = props;
  return <FontAwesome size={size} color={color} {...rest} />;
} 