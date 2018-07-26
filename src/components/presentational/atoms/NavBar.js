// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'

type Props = {
  handleBack: Function,
}

const View = styled.View`
  flex: 0 0 auto;
  flex-direction: ${({ handleBack }) => (handleBack ? 'row' : 'column')};
  padding: 40px 16px 24px 16px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

export const NavBar = (props: Props) => (
  <View handleBack={props.handleBack}>
    {props.handleBack && (
      <TouchableOpacity onPress={props.handleBack}>
        <IconWrapper>
          <Icon name="chevron-left" />
        </IconWrapper>
      </TouchableOpacity>
    )}
    {props.children}
  </View>
)

NavBar.defaultProps = {
  handleBack: null,
}
