import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const IconList = (props: SvgProps) => (
  <Svg  width={24} height={24} {...props}>
    <Path
      fill={props.color}
      d="M5.733 21.003a5.5 5.5 0 0 1-5.725-5.269q-.009-.225 0-.451V6.844c0-3.438 2.18-5.859 5.491-5.971h7.64a.761.761 0 0 1 .1 1.514l-.1.006h-7.4a4.015 4.015 0 0 0-4.2 3.818q-.009.2 0 .4v8.429c0 2.638 1.509 4.342 3.975 4.44h8.985a4.006 4.006 0 0 0 4.2-4.209V7.903a.764.764 0 0 1 1.519-.1l.007.1v7.135c0 3.437-2.178 5.85-5.492 5.961h-.238Zm-.792-6.888-.094-.061a.759.759 0 0 1-.2-.973l.062-.093L7.757 9.04a.766.766 0 0 1 .982-.2l.095.063 2.87 2.245 2.513-3.223a.762.762 0 0 1 1.27.839l-.063.093-2.981 3.831a.766.766 0 0 1-.981.2l-.093-.063-2.87-2.245-2.577 3.334a.767.767 0 0 1-.977.2Zm10.631-11.39A2.72 2.72 0 1 1 18.3 5.433h-.008a2.718 2.718 0 0 1-2.72-2.708Zm1.526 0a1.193 1.193 0 1 0 1.2-1.188 1.192 1.192 0 0 0-1.192 1.188Z"
    />
  </Svg>
)
export default IconList