import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MIPink, TertiaryText } from '../../styles';

function NewsIcon(props: { focused: boolean | undefined }) {
  return (
    <Svg
      width={props.focused ? 28 : 23}
      height={props.focused ? 28 : 23}
      color={props.focused ? MIPink : TertiaryText}
      viewBox={'0 0 23 23'}>
      <Path
        data-name="Trac\xE9 173"
        d="M12 59H6a1 1 0 000 2h6a1 1 0 000-2m-4-6h2a1 1 0 000-2H8a1 1 0 000 2m12 2h-3v-9a1 1 0 00-1.5-.87l-3 1.72-3-1.72a1 1 0 00-1 0l-3 1.72-3-1.72A1 1 0 001 46v16a3 3 0 003 3h14a3 3 0 003-3v-6a1 1 0 00-1-1M4 63a1 1 0 01-1-1V47.73l2 1.14a1.078 1.078 0 001 0l3-1.72 3 1.72a1.078 1.078 0 001 0l2-1.14V62a3.02 3.02 0 00.18 1zm15-1a1 1 0 01-2 0v-5h2zm-7-7H6a1 1 0 000 2h6a1 1 0 000-2"
        transform="translate(-1 -44.996)"
        fill={props.focused ? MIPink : TertiaryText}
      />
    </Svg>
  );
}

export default NewsIcon;
