// @flow
import React from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../../theme'
import { MinipopsIcon } from './MinipopsIcon'

type PropTypes = {
  isVisible: Boolean,
  size: Number,
  color: String,
  stickRight: Boolean,
}

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  margin-left: ${({ stickRight }) => (stickRight ? 'auto' : '')};
`)

const MinipopsIconAnimatable = Animatable.createAnimatableComponent(
  MinipopsIcon,
)

export const Spinner = (props: PropTypes) => (
  <Wrapper
    stickRight={props.stickRight}
    useNativeDriver={true}
    transition={['opacity']}
    style={{ opacity: props.isVisible ? 1 : 0 }}
  >
    <MinipopsIconAnimatable
      size={props.size}
      useNativeDriver={true}
      animation="rotate"
      iterationCount="infinite"
    />
  </Wrapper>
)

Spinner.defaultProps = {
  isVisible: true,
  size: 40,
  color: colors.primary,
  stickRight: false,
}
