// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'
import { colors, shadow } from '../../../theme'

type PropTypes = {
  handleAddToFavourites: Function,
  handleRemoveFromFavourites: Function,
  isFavourite: Boolean,
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 16px;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
  background-color: white;
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
        <Icon name="ios-heart" color={colors.primary} />
      ) : (
        <Icon name="ios-heart-outline" color={colors.primary} />
      )}
    </TouchableOpacity>
  </Wrapper>
)

ActionBar.defaultProps = {
  handleAddToFavourites: () => {},
  handleRemoveFromFavourites: () => {},
  isFavourite: false,
}
