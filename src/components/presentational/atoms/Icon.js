// @flow
import React from 'react'
// import VectorIcon from 'react-native-vector-icons/Feather'
import VectorIcon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'

type Props = {
  name: string,
  size: number,
  color: string,
  position: string,
  top: number,
  bottom: number,
  left: number,
  right: number,
}

const Wrapper = styled.View`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  z-index: 2;
`

export const Icon = (props: Props) => (
  <Wrapper
    position={props.position}
    top={props.top}
    bottom={props.bottom}
    left={props.left}
    right={props.right}
  >
    <VectorIcon name={props.name} size={props.size} color={props.color} />
  </Wrapper>
)

Icon.defaultProps = {
  name: 'search',
  size: 30,
  color: 'black',
  position: 'relative',
  top: 'auto',
  bottom: 'auto',
  left: 'auto',
  right: 'auto',
}
