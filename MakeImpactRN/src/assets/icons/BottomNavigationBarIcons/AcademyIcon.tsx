import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MIPink, TertiaryText } from '../../styles/RegularTheme';

function AcademyIcon(props: { focused: boolean | undefined }) {
  return (
    <Svg
      width={props.focused ? 28 : 23}
      height={props.focused ? 28 : 23}
      color={props.focused ? MIPink : TertiaryText}
      viewBox={'0 0 23 23'}>
      <Path
        data-name="Trac\xE9 522"
        d="M416.17 55.06a12.864 12.864 0 00-9.17 1.86 13.071 13.071 0 00-9.17-1.81 1 1 0 00-.83 1v12a1.006 1.006 0 00.35.775 1 1 0 00.82.225 10.9 10.9 0 018.25 1.91l.12.07h.11a.91.91 0 00.7 0h.11l.12-.07a10.9 10.9 0 018.25-2.02 1 1 0 001.17-1V56a1 1 0 00-.83-.94M406 68.35a12.875 12.875 0 00-6-1.48h-1v-10a8.78 8.78 0 011 0 10.867 10.867 0 016 1.8zm9-1.44h-1a12.875 12.875 0 00-6 1.48v-9.72a10.867 10.867 0 016-1.8 8.78 8.78 0 011 0zm1.17 4.15a12.864 12.864 0 00-9.17 1.86 12.864 12.864 0 00-9.17-1.86.985.985 0 10.34 1.94 10.9 10.9 0 018.25 1.91 1 1 0 001.16 0 10.9 10.9 0 018.25-1.91 1 1 0 001.17-.79 1.009 1.009 0 00-.013-.391 1 1 0 00-.163-.357 1 1 0 00-.654-.4"
        transform="translate(-396.987 -54.87)"
        fill={props.focused ? MIPink : TertiaryText}
      />
    </Svg>
  );
}

export default AcademyIcon;
