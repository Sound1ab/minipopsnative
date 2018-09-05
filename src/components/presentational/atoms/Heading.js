// @flow
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography'
import { colors } from '../../../theme'

type Props = {
  numberOfLines: ?number,
  font: string,
  weight: string,
}

const styles = (size, color, marginBottom, weight) => {
  const style = StyleSheet.create({
    xl: {
      ...iOSUIKit.largeTitleEmphasizedObject,
      ...sanFranciscoWeights[weight],
      marginBottom: marginBottom ? 8 : 0,
      color: colors.primary,
    },
    l: {
      ...iOSUIKit.title3Object,
      ...sanFranciscoWeights[weight],
      marginBottom: marginBottom ? 8 : 0,
      color,
    },
    m: {
      ...iOSUIKit.bodyObject,
      ...sanFranciscoWeights[weight],
      marginBottom: marginBottom ? 8 : 0,
      color,
    },
    s: {
      ...iOSUIKit.subheadObject,
      ...sanFranciscoWeights[weight],
      color,
    },
    xs: {
      ...iOSUIKit.footnoteObject,
      ...sanFranciscoWeights[weight],
      color,
    },
    xxs: {
      ...iOSUIKit.caption2Object,
      ...sanFranciscoWeights[weight],
      color,
      marginBottom: marginBottom ? 4 : 0,
    },
  })
  return style[size]
}
export const Heading = (props: Props) => (
  <Text
    numberOfLines={props.numberOfLines}
    style={styles(props.size, props.color, props.marginBottom, props.weight)}
  >
    {props.children}
  </Text>
)

Heading.defaultProps = {
  numberOfLines: 1,
  size: 's',
  color: 'white',
  marginBottom: false,
  weight: 'thin',
}
