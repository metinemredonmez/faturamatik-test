import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Path,
  G,
  SvgProps,
  Ellipse,
} from "react-native-svg"
const FaturamatikTabIcon = (props:SvgProps) => (
  <Svg
    
    width={59.741}
    height={60.978}
    {...props}
  >
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#3185ed" />
        <Stop offset={1} stopColor="#54c9f1" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#52c5f1" />
        <Stop offset={1} stopColor="#3184ed" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#889dcb" />
        <Stop offset={1} stopColor="#0033a1" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#0033a1" />
        <Stop offset={1} stopColor="#889dcb" />
      </LinearGradient>
      <ClipPath id="d">
        <Path
          fill="url(#a)"
          d="M0 26.017C0 11.649 11.412 0 25.49 0s25.49 11.649 25.49 26.017-11.413 26.018-25.49 26.018S0 40.386 0 26.017Z"
          data-name="Union 4"
        />
      </ClipPath>
    </Defs>
    <G data-name="Group 15510">
      <G data-name="Group 9825">
        <Ellipse
          cx={29.871}
          cy={30.489}
          fill="rgba(255,255,255,0.28)"
          data-name="Ellipse 1"
          rx={29.871}
          ry={30.489}
        />
        <G data-name="Ellipse 1 Kopie" transform="translate(4.381 4.472)">
          <Ellipse
            cx={25.49}
            cy={26.017}
            fill="url(#b)"
            data-name="Ellipse 1 Kopie"
            rx={25.49}
            ry={26.017}
          />
          <Path
            fill="url(#c)"
            d="M25.49 0c14.078 0 25.49 11.648 25.49 26.017S39.567 52.035 25.49 52.035 0 40.386 0 26.017 11.412 0 25.49 0Z"
            data-name="Gradient Overlay"
            opacity={0.92}
          />
        </G>
        <G clipPath="url(#d)" transform="translate(4.381 4.472)">
          <Path
            fill="url(#e)"
            d="M481.633 1792.555c10.163 0 18.34-10.948 26.685-10.569 13.709.622 15.134 18.06 15.134 26.83 0 16.165-18.01 29.269-40.226 29.269S443 1824.981 443 1808.816c0-7.813 2.617-25.627 11.152-26.424 10.753-1.003 16.003 10.163 27.481 10.163Z"
            data-name="Ellipse 2"
            transform="translate(-456.143 -1760.44)"
          />
        </G>
      </G>
      <G fill="#fff" data-name="Group 14045">
        <Path
          d="M42.455 30.217 27.776 16.273v5.857l8.087 8.087-8.087 8.087v5.857Z"
          data-name="Path 11534"
        />
        <Path
          d="m34.749 30.217-4.884-4.884-.12-.12-1.969-1.968-6.972-6.972v6.972l6.973 6.972-6.973 6.972v6.972l8.941-8.941Z"
          data-name="Path 11535"
        />
      </G>
    </G>
  </Svg>
)
export default FaturamatikTabIcon
