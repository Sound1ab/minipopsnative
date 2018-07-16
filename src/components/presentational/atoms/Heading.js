// @flow
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {
  systemWeights,
  human,
  iOSUIKit,
  sanFranciscoWeights,
} from 'react-native-typography'

type Props = {
  font: string,
}

console.log(sanFranciscoWeights)
console.log(iOSUIKit)

const styles = (font, color) => {
  const style = StyleSheet.create({
    xl: {
      ...iOSUIKit.largeTitleEmphasizedObject,
      ...sanFranciscoWeights.semibold,
      color,
    },
    l: {
      ...iOSUIKit.title3Object,
      ...sanFranciscoWeights.medium,
      color,
    },
    m: {
      ...iOSUIKit.bodyObject,
      ...sanFranciscoWeights.thin,
      color,
    },
    s: {
      ...iOSUIKit.subheadObject,
      ...sanFranciscoWeights.thin,
      color,
    },
    xs: {
      ...iOSUIKit.footnoteObject,
      ...sanFranciscoWeights.thin,
      color,
    },
    xxs: {
      ...iOSUIKit.caption2Object,
      ...sanFranciscoWeights.thin,
      color,
    },
  })
  return style[font]
}
export const Heading = (props: Props) => (
  <Text style={styles(props.font, props.color)}>{props.children}</Text>
)

Heading.defaultProps = {
  font: 'body',
  color: 'white',
}
