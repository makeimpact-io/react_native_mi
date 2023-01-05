import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { White } from '../../styles/RegularTheme';

function GoBackIcon(props: any) {
  return (
    <Svg width="10" height="17.5" fill={White} viewBox="0 0 12 21" {...props}>
      <Path d="M3.621 10.5l7.94-7.939A1.501 1.501 0 009.439.439l-9 9a1.5 1.5 0 000 2.122l9 9a1.5 1.5 0 102.122-2.122L3.62 10.5z" />
    </Svg>
  );
}

export default GoBackIcon;
