import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SignOutIcon(props: any) {
  return (
    <Svg
      transform="rotate(90)"
      width={45}
      height={15}
      viewBox="0 0 18 20"
      {...props}>
      <Path
        data-name="Trac\xE9 80"
        d="M359.716 312.71l1.29-1.3V323a1 1 0 002 0v-11.59l1.29 1.3a1 1 0 101.42-1.42l-3-3a1 1 0 00-1.42 0l-3 3a1 1 0 001.42 1.42m8.29 2.29h-2a1 1 0 000 2h2a1 1 0 011 1v7a1 1 0 01-1 1h-12a1 1 0 01-1-1v-7a1 1 0 011-1h2a1 1 0 000-2h-2a3 3 0 00-3 3v7a3 3 0 003 3h12a3 3 0 003-3v-7a3 3 0 00-3-3"
        transform="translate(-353.006 -307.994)"
      />
    </Svg>
  );
}

export default SignOutIcon;
