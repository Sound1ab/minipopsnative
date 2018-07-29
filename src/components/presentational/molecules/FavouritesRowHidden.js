// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Heading, Icon } from '../atoms/index'
import { colors, shadow } from '../../../theme/index'
import { Functional } from '../../../helpers/index'

const Wrapper = styled.View`
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
  align-items: flex-end;
  height: 100;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
  background-color: ${colors.primary};
`

const TextWrapper = styled.View`
  flex: 1;
  width: 100;
  padding: 16px;
  align-items: center;
  justify-content: center;
`

type PropTypes = {
  artistAlbum: {},
  index: number,
  handlePress: Function,
  rowMap: Function,
  id: string,
}

export const FavouritesRowHidden = (props: PropTypes) => (
  <TouchableOpacity
    onPress={() => {
      props.handlePress({
        id: props.id,
        item: props.artistAlbum,
      })
      props.rowMap[props.artistAlbum.spotifyId].closeRow()
    }}
  >
    <Wrapper index={props.index}>
      <TextWrapper>
        <Icon name="ios-trash" color="white" />
      </TextWrapper>
    </Wrapper>
  </TouchableOpacity>
)

FavouritesRowHidden.defaultProps = {
  artistAlbum: {},
  index: 0,
  handlePress: () => {},
  rowMap: () => {},
  id: '',
}

export default FavouritesRowHidden
