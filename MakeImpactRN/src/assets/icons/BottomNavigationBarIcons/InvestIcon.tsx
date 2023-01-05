import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MIPink, TertiaryText } from '../../styles/RegularTheme';

function InvestIcon(props: { focused: boolean | undefined }) {
  return (
    <Svg
      width={props.focused ? 28 : 23}
      height={props.focused ? 28 : 23}
      color={props.focused ? MIPink : TertiaryText}
      viewBox={'0 0 23 23'}>
      <Path
        data-name="Trac\xE9 193"
        d="M9.46 137l.54-.59V140a1 1 0 002 0v-3.59l.54.55a1.005 1.005 0 00.721.337 1.018 1.018 0 00.958-.622 1 1 0 00-.219-1.1l-2.29-2.29a1.034 1.034 0 00-1.42 0L8 135.54A1.032 1.032 0 009.46 137m1.54 6a3 3 0 102.121.879A3 3 0 0011 143m0 4a1 1 0 11.707-.293A1 1 0 0111 147m-7-1a1 1 0 10.293-.707A1 1 0 004 146m14 0a1 1 0 10-.293.707A1 1 0 0018 146m1-7h-4a1 1 0 000 2h4a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8a1 1 0 011-1h4a1 1 0 000-2H3a3 3 0 00-3 3v8a3 3 0 003 3h16a3 3 0 003-3v-8a3 3 0 00-3-3"
        transform="translate(0 -133.005)"
        fill={props.focused ? MIPink : TertiaryText}
      />
    </Svg>
  );
}

export default InvestIcon;
