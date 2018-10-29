// @flow
import React from 'react'
import { Dimensions, View } from 'react-native'
import styled, { css } from 'styled-components'
import { Heading, ScrollViewWrapper, ImageWrapper } from '../atoms'
import { SliderSkeleton } from '../zkeletons'

export const IMAGE_WIDTH = Dimensions.get('window').width / 2.5

const Wrapper = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`

const ImageOuterWrapper = styled.View``

const AlbumWrapper = styled.TouchableOpacity`
  width: ${parseInt(IMAGE_WIDTH)};
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 16px;
  ${({ isFirst }) =>
    isFirst &&
    css`
      margin-left: 16px;
    `} ${({ isLast }) =>
    isLast &&
    css`
      margin-right: 16px;
    `};
`

const ProductHeadingWrapper = styled.View`
  margin: 0 16px;
`

const HeadingWrapper = styled.View`
  padding: 16px;
  justify-content: center;
  align-items: center;
`

type PropTypes = {
  heading: string,
  products: Array<{}>,
  IMAGE_WIDTH: number,
  loading: boolean,
  openUrl: Function,
}

export const HorizontalSlider = ({
  heading,
  products,
  loading,
  openUrl,
}: PropTypes) => (
  <View>
    <ProductHeadingWrapper>
      <Heading size="m" marginBottom>
        {heading}
      </Heading>
    </ProductHeadingWrapper>
    <Wrapper>
      <ScrollViewWrapper overflowHidden horizontal>
        {products.map((product, index) => (
          <AlbumWrapper
            activeOpacity={1}
            onPress={openUrl.bind(null, product.link)}
            key={`${product.title}-${index}`}
            isFirst={index === 0}
            isLast={index === products.length - 1}
          >
            <ImageOuterWrapper>
              <ImageWrapper
                fixedWidth
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH}
                source={product.image}
              />
            </ImageOuterWrapper>
            <HeadingWrapper>
              <Heading size="xxs" numberOfLines={10} marginBottom>
                {product.title}
              </Heading>
              <Heading size="xxs" weight="bold">
                {product.price}
              </Heading>
            </HeadingWrapper>
          </AlbumWrapper>
        ))}
        {products.length === 0 && <SliderSkeleton loading={loading} />}
      </ScrollViewWrapper>
    </Wrapper>
  </View>
)

HorizontalSlider.defaultProps = {
  heading: '',
  products: [],
  IMAGE_WIDTH: 0,
  loading: false,
  openUrl: () => {},
}
