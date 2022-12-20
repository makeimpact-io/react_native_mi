import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function CloseIcon(props) {
  return (
    <Svg width={15} height={15} viewBox="0 0 9 9" {...props}>
      <G data-name="Group 423">
        <Path
          data-name="Path 9"
          d="M.706.709l4 3.982 4 3.982m0-7.964l-4 3.982-4 3.982"
          fill="none"
          stroke="#000"
        />
      </G>
    </Svg>
  );
}

export default CloseIcon;
