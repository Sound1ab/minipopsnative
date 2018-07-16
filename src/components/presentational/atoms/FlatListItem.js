// @flow
import React from 'react'
import { ImageWrapper, Heading } from '../atoms'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
}

const Wrapper = styled.View`
  padding: 0 16px 16px 16px;
  height: ${({ height }) => height};
  width: 100%;
  border-radius: 5px;
  background-color: transparent;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
`

const TextWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 8px;
`

const RelativeWrapper = styled.View`
  flex: 1;
`

var styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 5,
  },
})

export const FlatListItem = (props: Props) => (
  <Wrapper index={props.index} height={300}>
    <RelativeWrapper>
      <ImageWrapper source={{ uri: `https:${props.item.imageUrl}` }} />
      <LinearGradient
        colors={[
          'rgba(156, 68, 249,0)',
          'rgba(114, 110, 248,0.3)',
          'rgba(79,50,74,0.8)',
        ]}
        style={styles.linearGradient}
      />
      <TextWrapper>
        <Heading font="m">{props.item.title}</Heading>
        <Heading font="s">Price: £{props.item.price}</Heading>
        <Heading font="xxs">Ending: {props.item.endTime}</Heading>
        <Heading font="xxs">Postage: £{props.item.postage}</Heading>
        <Heading font="xxs">Bids: {props.item.endTime}</Heading>
      </TextWrapper>
    </RelativeWrapper>
  </Wrapper>
)

FlatListItem.defaultProps = {
  height: 300,
}
