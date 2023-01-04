import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TradesIcon(props: any) {
  return (
    <Svg width={25} height={25} viewBox="0 0 20 20" {...props}>
      <Path
        data-name="Trac\xE9 924"
        d="M1091.006 20.829l-4.29 4.3-1.65-1.65a1 1 0 00-1.124-.281 1 1 0 00-.567.567 1 1 0 00.281 1.124l2.35 2.36a.992.992 0 00.326.216 1.009 1.009 0 00.384.074 1 1 0 00.7-.29l5-5a1 1 0 10-1.41-1.42m-2.72-6.79a10 10 0 103.827.761 10 10 0 00-3.827-.761m0 18a8 8 0 115.657-2.343 8 8 0 01-5.657 2.343"
        transform="translate(-1078.286 -14.039)"
        fill={props.fill}
      />
    </Svg>
  );
}

export default TradesIcon;
