import * as React from 'react';
import Svg, {SvgProps, Defs, G, Rect} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const IconPlus = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Defs></Defs>
    <G filter="url(#a)">
      <Rect
        width={327}
        height={48}
        fill={props.color}
        data-name="Rectangle 5"
        rx={16}
        transform="translate(48 48)"
      />
    </G>
  </Svg>
);
export default IconPlus;
