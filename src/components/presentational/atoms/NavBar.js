// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'
import { colors, shadow } from '../../../theme'

type Props = {
  handleBack: Function,
}

const View = styled.View`
  flex: 0 0 auto;
  flex-direction: ${({ handleBack }) => (handleBack ? 'row' : 'column')};
  padding: 48px 16px 16px 16px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

export const NavBar = (props: Props) => (
  <View handleBack={props.handleBack}>
    {props.handleBack && (
      <TouchableOpacity onPress={props.handleBack}>
        <IconWrapper>
          <Icon name="ios-arrow-back" top="-2" color={colors.primary} />
        </IconWrapper>
      </TouchableOpacity>
    )}
    {props.children}
  </View>
)

NavBar.defaultProps = {
  handleBack: null,
}
