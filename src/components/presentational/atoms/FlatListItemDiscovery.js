// @flow
import React from 'react'
import { ImageWrapper, Heading } from '../atoms'
import styled, { css } from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
}

const Wrapper = styled.View`
  padding: ${({ index }) =>
    index > 0 ? '0 16px 16px 16px' : '16px 16px 16px 16px'};
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
  left: 0;
  margin: 8px;
  ${({ position }) =>
    css`
      ${position};
    `};
`

const RelativeWrapper = styled.View`
  flex: 1;
`

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 5,
  },
})

export const FlatListItemDiscovery = (props: Props) => (
  <Wrapper index={props.index} height={300}>
    <RelativeWrapper>
      <ImageWrapper source={{ uri: `${props.item.imageUrl}` }} />
      <LinearGradient
        colors={[
          'rgba(79,50,74,0.8)',
          'rgba(114, 110, 248,0.3)',
          'rgba(156, 68, 249,0)',
        ]}
        style={styles.linearGradient}
      />
      <TextWrapper position={{ top: 0 }}>
        <Heading font="m">{props.item.title}</Heading>
      </TextWrapper>
    </RelativeWrapper>
  </Wrapper>
)

FlatListItemDiscovery.defaultProps = {
  height: 300,
}
