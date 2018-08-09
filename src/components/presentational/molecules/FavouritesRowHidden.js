// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity, View } from 'react-native'
import { Heading, Icon } from '../atoms/index'
import { colors, shadow } from '../../../theme/index'
import { Functional } from '../../../helpers/index'

const Wrapper = styled.View`
  flex: 1;
  height: 100;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
  flex-direction: row;
  justify-content: space-between;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
  background-color: white;
`

const TextWrapper = styled.TouchableOpacity`
  width: 100px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`

const TextWrapperWatch = styled(TextWrapper)`
  background-color: ${colors.tertiary};
`

const TextWrapperRemove = styled(TextWrapper)`
  background-color: ${colors.primary};
`

type PropTypes = {
  artistAlbum: {},
  index: number,
  handleRemoveFromWatchList: Function,
  handleAddToWatchList: Function,
  handlePress: Function,
  rowMap: Function,
  id: string,
  watched: Boolean,
}

export const FavouritesRowHidden = (props: PropTypes) => (
  <Wrapper index={props.index}>
    {props.watched ? (
      <TextWrapperWatch
        onPress={() => {
          props.handleRemoveFromWatchList({
            id: props.id,
            item: props.artistAlbum,
          })
          props.rowMap[props.artistAlbum.spotifyId].closeRow()
        }}
      >
        <Icon name="ios-remove-circle" color="white" />
      </TextWrapperWatch>
    ) : (
      <TextWrapperWatch
        onPress={() => {
          props.handleAddToWatchList({
            id: props.id,
            item: props.artistAlbum,
          })
          props.rowMap[props.artistAlbum.spotifyId].closeRow()
        }}
      >
        <Icon name="ios-add-circle" color="white" />
      </TextWrapperWatch>
    )}
    <TextWrapperRemove
      onPress={() => {
        props.handlePress({
          id: props.id,
          item: props.artistAlbum,
        })
        props.rowMap[props.artistAlbum.spotifyId].closeRow()
      }}
    >
      <Icon name="ios-trash" color="white" />
    </TextWrapperRemove>
  </Wrapper>
)

FavouritesRowHidden.defaultProps = {
  artistAlbum: {},
  index: 0,
  handleAddToWatchList: () => {},
  handleRemoveFromWatchList: () => {},
  handlePress: () => {},
  rowMap: () => {},
  id: '',
  watched: false,
}

export default FavouritesRowHidden
