// @flow
import React from 'react'
import { Heading, Button } from '../atoms'
import { ImageSlider } from '../molecules'
import { View } from 'react-native'
import styled from 'styled-components'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
}

const ImageWrapper = styled.View`
  height: ${({ height }) => height};
  width: 100%;
`

const ContentWrapper = styled.View`
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const RelativeWrapper = styled.View`
  width: 100%;
`

const AbsoluteWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`

export const FlatListItemSearch = (props: Props) => (
  <View>
    <ImageWrapper index={props.index} height={300}>
      <ImageSlider images={props.item.imageUrl} />
    </ImageWrapper>
    <ContentWrapper>
      <RelativeWrapper>
        <Heading font="m" color="black" marginBottom>
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
        <AbsoluteWrapper>
          <Button title="View" />
        </AbsoluteWrapper>
      </RelativeWrapper>
    </ContentWrapper>
  </View>
)

FlatListItemSearch.defaultProps = {
  height: 300,
}
