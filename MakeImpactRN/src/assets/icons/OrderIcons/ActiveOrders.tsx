import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ActiveOrders(props: any) {
  return (
    <Svg width={25} height={25} viewBox="0 0 20 20" {...props}>
      <Path
        data-name="Trac\xE9 1077"
        d="M1359.2 159.549h-4.53a1 1 0 000 2h2.4a8 8 0 01-13.78-5.51 1 1 0 00-2 0 10 10 0 0016.88 7.23v1.77a1 1 0 002 0v-4.5a1 1 0 00-.97-.99m-7.91-13.51a10 10 0 00-6.88 2.77v-1.77a1 1 0 00-2 0v4.5a1 1 0 001 1h4.5a1 1 0 000-2h-2.4a8 8 0 0113.78 5.5 1 1 0 002 0 10 10 0 00-10-10"
        transform="translate(-1341.286 -146.039)"
        fill={props.fill}
      />
    </Svg>
  );
}

export default ActiveOrders;
