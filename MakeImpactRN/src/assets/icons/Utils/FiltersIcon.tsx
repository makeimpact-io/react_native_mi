import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const FiltersIcon = (props: { color: string }) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    style={{ transform: [{ rotate: '90deg' }] }}
    {...props}>
    <G
      fill="none"
      stroke={props.color}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}>
      <Circle cx={5} cy={8} r={2} />
      <Path d="M7 8h25" />
      <Circle cx={5} cy={24} r={2} />
      <Path d="M7 24h25" />
      <Circle cx={27} cy={16} r={2} />
      <Path d="M25 16H0m3-8H0m29 8h3M3 24H0" />
    </G>
  </Svg>
);

export default FiltersIcon;
