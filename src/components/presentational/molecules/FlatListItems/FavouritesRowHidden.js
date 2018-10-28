// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '../../atoms'
import { shadow } from '../../../../theme'

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
  background-color: ${({ theme }) => theme.background};
`

const TextWrapper = styled.TouchableOpacity`
  width: 100px;
  padding: 16px;
  align-items: center;
  justify-content: center;
`

const TextWrapperWatch = styled(TextWrapper)``

const TextWrapperRemove = styled(TextWrapper)``

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
            variables: {
              id: props.id,
              watchingId: props.artistAlbum.spotifyId,
            },
          })
          props.rowMap[props.artistAlbum.spotifyId].closeRow()
        }}
      >
        <Icon name="ios-megaphone" />
      </TextWrapperWatch>
    ) : (
      <TextWrapperWatch
        onPress={() => {
          props.handleAddToWatchList({
            variables: {
              id: props.id,
              watching: {
                artist: props.artistAlbum.artist,
                album: props.artistAlbum.album,
                spotifyId: props.artistAlbum.spotifyId,
              },
            },
          })
          props.rowMap[props.artistAlbum.spotifyId].closeRow()
        }}
      >
        <Icon name="ios-megaphone-outline" />
      </TextWrapperWatch>
    )}
    <TextWrapperRemove
      onPress={() => {
        props.handlePress({
          variables: {
            id: props.id,
            favouriteId: props.artistAlbum.spotifyId,
          },
        })
        props.rowMap[props.artistAlbum.spotifyId].closeRow()
      }}
    >
      <Icon name="ios-trash" />
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
