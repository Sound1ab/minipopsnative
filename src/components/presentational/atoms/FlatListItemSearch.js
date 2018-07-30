// @flow
import React from 'react'
import { Heading, Button } from '../atoms'
import { ImageSlider } from '../molecules'
import { View, Dimensions } from 'react-native'
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
  padding: 16px;
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
    <ImageWrapper index={props.index} height={Dimensions.get('window').width}>
      <ImageSlider images={props.item.imageUrl} />
    </ImageWrapper>
    <ContentWrapper>
      <RelativeWrapper>
        <Heading size="m" color="black" marginBottom>
          {props.item.title}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Price: £{props.item.price}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Ending: {props.item.endTime}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Postage: £{props.item.postage}
        </Heading>
        <Heading size="xxs" color="black">
          Bids: {props.item.bids}
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
