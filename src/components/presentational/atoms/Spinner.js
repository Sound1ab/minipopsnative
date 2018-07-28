// @flow
import React from 'react'
import styled from 'styled-components'
import SpinKit from 'react-native-spinkit'
import { colors } from '../../../theme'

type PropTypes = {
  isVisible: Boolean,
  size: Number,
  color: String,
}

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  margin: 42px 16px 0 0;
  z-index: 10;
`

export const Spinner = (props: PropTypes) => (
  <Wrapper>
    <SpinKit
      isVisible={props.isVisible}
      size={props.size}
      type={'ChasingDots'}
      color={props.color}
    />
  </Wrapper>
)

Spinner.defaultProps = {
  isVisible: true,
  size: 35,
  color: colors.primary,
}
