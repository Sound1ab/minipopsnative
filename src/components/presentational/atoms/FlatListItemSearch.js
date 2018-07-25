// @flow
import React from 'react'
import { ImageWrapper, Heading } from '../atoms'
import styled from 'styled-components'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
}

const Wrapper = styled.View`
  height: ${({ height }) => height};
  width: 100%;
`

const TextWrapper = styled.View`
  padding: 8px;
`

const View = styled.View``

export const FlatListItemSearch = (props: Props) => (
  <View>
    <Wrapper index={props.index} height={300}>
      <ImageWrapper source={{ uri: `${props.item.imageUrl}` }} />
    </Wrapper>
    <TextWrapper>
      <Heading font="l" color="black">
        {props.item.title}
      </Heading>
      <Heading font="xxs" color="black">
        Price: £{props.item.price}
      </Heading>
      <Heading font="xxs" color="black">
        Ending: {props.item.endTime}
      </Heading>
      <Heading font="xxs" color="black">
        Postage: £{props.item.postage}
      </Heading>
    </TextWrapper>
  </View>
)

FlatListItemSearch.defaultProps = {
  height: 300,
}
