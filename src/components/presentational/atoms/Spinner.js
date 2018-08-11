// @flow
import React from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../../theme'
import { MinipopsIcon } from './MinipopsIcon'
// const recordImage = require('../../../assets/2000px-Disque_Vinyl-1-60.png')

type PropTypes = {
  isVisible: Boolean,
  size: Number,
  color: String,
}

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  margin-left: auto;
  align-self: flex-start;
`)

const MinipopsIconAnimatable = Animatable.createAnimatableComponent(
  MinipopsIcon,
)

export const Spinner = (props: PropTypes) => (
  <Wrapper
    useNativeDriver={true}
    transition={['opacity']}
    style={{ opacity: props.isVisible ? 1 : 0 }}
  >
    <MinipopsIconAnimatable
      size={40}
      useNativeDriver={true}
      animation="rotate"
      iterationCount="infinite"
      // source={recordImage}
    />
  </Wrapper>
)

Spinner.defaultProps = {
  isVisible: true,
  size: 35,
  color: colors.primary,
}
