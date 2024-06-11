import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconSettings = (props: SvgProps) => (
  <Svg  width={24} height={24} {...props}>
    <Path
      fill={props.color}
      d="M12.317 15.173a3.715 3.715 0 1 1 3.763 3.686h-.049a3.7 3.7 0 0 1-3.714-3.686Zm1.743 0a1.975 1.975 0 1 0 2-1.957h-.027a1.967 1.967 0 0 0-1.973 1.957Zm-13.188.865a.865.865 0 0 1 0-1.729h7.144a.865.865 0 0 1 0 1.729H.872ZM0 3.686a3.715 3.715 0 1 1 3.714 3.688A3.7 3.7 0 0 1 0 3.685Zm1.743 0a1.975 1.975 0 1 0 2-1.957h-.027a1.967 1.967 0 0 0-1.973 1.956Zm9.99.865a.865.865 0 0 1-.058-1.728h7.2a.865.865 0 0 1 .058 1.728h-7.2Z"
    />
  </Svg>
)
export default IconSettings
