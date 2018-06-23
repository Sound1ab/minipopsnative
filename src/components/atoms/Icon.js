// @flow
import React from 'react'
import VectorIcon from 'react-native-vector-icons/Feather'

type Props = {
  name: string,
  size: number,
  color: string,
}

export const Icon = (props: Props) => (
  <VectorIcon name={props.name} size={props.size} color={props.color} />
)

Icon.defaultProps = {
  name: 'menu',
  size: 30,
  color: 'black',
}
