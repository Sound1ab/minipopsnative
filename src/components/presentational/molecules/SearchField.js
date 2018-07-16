// @flow
import React from 'react'
import { InputWrapper } from '../atoms'

type PropTypes = {
  handleChange: Function,
  value: string,
}

type Props = {}

export const SearchField = (props: Props) => (
  <InputWrapper handleChange={props.handleChange} value={props.value} />
)

SearchField.defaultProps = {
  handleChange: () => {},
  value: '',
}
