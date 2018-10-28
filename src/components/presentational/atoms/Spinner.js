// @flow
import React from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'
import { MinipopsIcon } from './MinipopsIcon'

type PropTypes = {
  isVisible: Boolean,
  size: Number,
  stickRight: Boolean,
  iterationCount: string | number,
  style: Object,
}

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  margin-left: ${({ stickRight }) => (stickRight ? 'auto' : 0)};
`)

const MinipopsIconAnimatable = Animatable.createAnimatableComponent(
  MinipopsIcon,
)

export const Spinner = (props: PropTypes) => (
  <Wrapper
    stickRight={props.stickRight}
    useNativeDriver={true}
    transition={['opacity']}
    style={{
      ...props.style,
      opacity: props.isVisible ? 1 : 0,
    }}
  >
    <MinipopsIconAnimatable
      size={props.size}
      useNativeDriver={true}
      animation="rotate"
      iterationCount={props.iterationCount}
    />
  </Wrapper>
)

Spinner.defaultProps = {
  isVisible: true,
  size: 40,
  stickRight: false,
  interationCount: 'infinite',
  style: {},
}
