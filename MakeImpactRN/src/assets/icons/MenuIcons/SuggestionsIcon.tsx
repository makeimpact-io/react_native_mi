import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MIPink } from '../../styles/RegularTheme';

const SuggestionsIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 20 20"
    {...props}>
    <Path
      id="Path_236"
      data-name="Path 236"
      d="M147.028,51.01h-10a1,1,0,0,0,0,2h10a1,1,0,0,0,0-2m-4,4h-6a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2m-1-11a10,10,0,0,0-10,10,9.891,9.891,0,0,0,2.26,6.33l-2,2a.979.979,0,0,0,.74,1.67h9a10,10,0,0,0,0-20m0,18h-6.59l.93-.93a1,1,0,0,0,0-1.41,8,8,0,1,1,5.66,2.34"
      transform="translate(-132 -44.01)"
      fill={MIPink}
    />
  </Svg>
);
export default SuggestionsIcon;
