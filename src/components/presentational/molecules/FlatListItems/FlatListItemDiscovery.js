// @flow
import React from 'react'
import { ImageWrapper, Heading } from '../../atoms/index'
import styled, { css } from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
  handlePushArtistReleases: Function,
}

const Wrapper = styled.TouchableOpacity`
  height: ${({ height }) => height};
  width: 100%;
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
  },
})

export const FlatListItemDiscovery = ({
  item,
  index,
  handlePushArtistReleases,
  navigator,
}: Props) => (
  <Wrapper
    activeOpacity={1}
    index={index}
    height={300}
    onPress={handlePushArtistReleases.bind(null, {
      spotifyId: item.spotifyId,
      title: item.title,
      navigator,
    })}
  >
    <RelativeWrapper>
      <ImageWrapper source={item.imageUrl} />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0, 0, 0,0)']}
        style={styles.linearGradient}
      />
      <TextWrapper position={{ top: 0 }}>
        <Heading size="m">{item.title}</Heading>
      </TextWrapper>
    </RelativeWrapper>
  </Wrapper>
)

FlatListItemDiscovery.defaultProps = {
  height: 300,
  handlePushArtistReleases: () => {},
}
