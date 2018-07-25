// @flow
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography'

type Props = {
  font: string,
}

const styles = (font, color, marginBottom) => {
  const style = StyleSheet.create({
    xl: {
      ...iOSUIKit.largeTitleEmphasizedObject,
      ...sanFranciscoWeights.thin,
      marginBottom: marginBottom ? 8 : 0,
      color,
    },
    l: {
      ...iOSUIKit.title3Object,
      ...sanFranciscoWeights.thin,
      marginBottom: marginBottom ? 8 : 0,
      color,
    },
    m: {
      ...iOSUIKit.bodyObject,
      ...sanFranciscoWeights.thin,
      marginBottom: marginBottom ? 4 : 0,
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
      marginBottom: marginBottom ? 4 : 0,
    },
  })
  return style[font]
}
export const Heading = (props: Props) => (
  <Text style={styles(props.font, props.color, props.marginBottom)}>
    {props.children}
  </Text>
)

Heading.defaultProps = {
  font: 'body',
  color: 'white',
  marginBottom: false,
}
