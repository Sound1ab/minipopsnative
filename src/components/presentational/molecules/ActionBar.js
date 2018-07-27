// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'
import { colors } from '../../../Theme'

type PropTypes = {
  handleAddToFavourites: Function,
  handleRemoveFromFavourites: Function,
  isFavourite: Boolean,
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 16px;
  border-bottom-color: ${colors.gray};
  border-bottom-width: 1px;
`

export const ActionBar = (props: PropTypes) => (
  <Wrapper>
    <TouchableOpacity
      onPress={
        props.isFavourite
          ? props.handleRemoveFromFavourites
          : props.handleAddToFavourites
      }
    >
      {props.isFavourite ? (
        <Icon name="heart" color={colors.primary} />
      ) : (
        <Icon name="heart-o" color={colors.primary} />
      )}
    </TouchableOpacity>
  </Wrapper>
)

ActionBar.defaultProps = {
  handleAddToFavourites: () => {},
  handleRemoveFromFavourites: () => {},
  isFavourite: false,
}
