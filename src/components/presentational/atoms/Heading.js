// @flow
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography'

type Props = {
  numberOfLines: ?number,
  font: string,
  weight: string,
}

const xl = styled.Text`
  ${iOSUIKit.largeTitleEmphasizedObject};
  ${({ weight }) => sanFranciscoWeights[weight]};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 8 : 0)};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const l = styled.Text`
  ${iOSUIKit.title3Object};
  ${({ weight }) => sanFranciscoWeights[weight]};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 8 : 0)};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const m = styled.Text`
  ${iOSUIKit.bodyObject};
  ${({ weight }) => sanFranciscoWeights[weight]};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 8 : 0)};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const s = styled.Text`
  ${iOSUIKit.subheadObject};
  ${({ weight }) => sanFranciscoWeights[weight]};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const xs = styled.Text`
  ${iOSUIKit.footnoteObject};
  ${({ weight }) => sanFranciscoWeights[weight]};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const xxs = styled.Text`
  ${iOSUIKit.caption2Object};
  ${({ weight }) => sanFranciscoWeights[weight]};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? 4 : 0)};
  color: ${({ theme, size }) => (size === 'xl' ? theme.primary : theme.text)};
`

const headings = {
  xl,
  l,
  m,
  s,
  xs,
  xxs,
}

export const Heading = ({
  weight,
  size,
  numberOfLines,
  children,
  marginBottom,
  theme,
}: Props) =>
  React.createElement(
    withTheme(headings[size]),
    { weight, size, numberOfLines, marginBottom, theme },
    children,
  )

Heading.defaultProps = {
  numberOfLines: 2,
  size: 's',
  color: 'white',
  marginBottom: false,
  weight: 'thin',
}
