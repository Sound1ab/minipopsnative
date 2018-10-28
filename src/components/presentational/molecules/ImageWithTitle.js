// @flow
import React from 'react'
import { ImageWrapper, Heading } from '../atoms'
import styled, { css } from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet } from 'react-native'

const Wrapper = styled.TouchableOpacity`
  height: ${({ height }) => height};
  width: 100%;
`

const TextWrapper = styled.View`
  position: absolute;
  left: 0;
  margin: 16px;
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

type PropTypes = {
  index: number,
  handleOnPress: Function,
  source: string,
  title: string,
  height: number,
}

export const ImageWithTitle = ({
  index,
  handleOnPress,
  source,
  title,
  height,
}: PropTypes) => (
  <Wrapper
    activeOpacity={1}
    index={index}
    height={height}
    onPress={handleOnPress}
  >
    <RelativeWrapper>
      <ImageWrapper source={source} />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0, 0, 0,0)']}
        style={styles.linearGradient}
      />
      <TextWrapper position={{ top: 0 }}>
        <Heading size="m">{title}</Heading>
      </TextWrapper>
    </RelativeWrapper>
  </Wrapper>
)

ImageWithTitle.defaultProps = {
  index: 0,
  handleOnPress: () => {},
  source: '',
  title: '',
  height: 300,
}
