//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextStyle} from 'react-native';

export interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  size?: number;
  color?: string;
  weight?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  spacing?: number;
  lineHeight?: number;
  numberOfLines?: number;
  ellipsizeMode?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  accessibilityState?: any;
  accessibilityValue?: any;
  nativeID?: string;
  maxFontSizeMultiplier?: number;
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  allowFontScaling?: boolean;
  selectable?: boolean;
  adjustsLetterSpacingToFitWidth?: boolean;
  onLayout?: (event: any) => void;
  onTextLayout?: (event: any) => void;
  dataDetectorType?: string;
  suppressHighlighting?: boolean;
  textBreakStrategy?: string;
  disabled?: boolean;
  selectionColor?: string;
  textTransform?: string;
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  light?: boolean;
}

// create a component
const Typography = (props: TypographyProps) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: props.size,
      color: props.color ?? "#484848",
      textAlign: props.align,
      letterSpacing: props.spacing,
      lineHeight: props.lineHeight,
      fontFamily: `Poppins-${
        props.bold
          ? 'Bold'
          : props.semibold
          ? 'SemiBold'
          : props.medium
          ? 'Medium'
          : props.light
          ? 'Light'
          : 'Regular'
      }`,
    },
  });

  return (
    <Text
      selectable={props.selectable}
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      testID={props.testID}
      accessibilityLabel={props.accessibilityLabel}
      accessibilityHint={props.accessibilityHint}
      accessibilityState={props.accessibilityState}
      style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

// define your styles

//make this component available to the app
export default Typography;
