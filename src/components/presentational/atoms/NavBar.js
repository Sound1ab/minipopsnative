// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {}

const View = styled.View`
  flex: 0 0 auto;
  padding: 32px 16px 24px 16px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
`

export const NavBar = (props: Props) => <View>{props.children}</View>

NavBar.defaultProps = {}
