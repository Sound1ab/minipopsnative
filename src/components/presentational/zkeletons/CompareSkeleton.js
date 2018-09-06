// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'

const OuterWrapper = styled.View`
  z-index: 999;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
`

const Wrapper = styled.View`
  width: ${Dimensions.get('window').width};
  background-color: white;
`

const ContentWrapper = styled.View`
  height: 60;
  width: ${Dimensions.get('window').width};
  padding: 16px 8px;
`

const TrackWrapper = styled.View`
  height: 60;
  padding: 8px;
  width: 100%;
  margin: 0 0 8px 0;
`

const ProductWrapper = styled.View`
  margin-left: 8px;
`

export const ArtistAlbumSkeleton = () => (
  <OuterWrapper pointerEvents="none">
    <Skeleton
      height={Dimensions.get('window').width}
      width={Dimensions.get('window').width}
      layout={{
        image: {
          type: 'rect',
          x: 0,
          y: 0,
          height: '100%',
          width: '100%',
        },
      }}
    />
    <ContentWrapper>
      <Skeleton
        height={'100%'}
        width={'100%'}
        layout={{
          heart: {
            type: 'rect',
            x: 0,
            y: 0,
            height: 30,
            width: 80,
          },
        }}
      />
    </ContentWrapper>
    <Wrapper>
      {Array(1)
        .fill(1, 0)
        .map((v, i) => (
          <TrackWrapper key={`${v}-${i}`}>
            <Skeleton
              height={'100%'}
              width={'100%'}
              layout={{
                heading: {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  height: 25,
                  width: 150,
                },
              }}
            />
          </TrackWrapper>
        ))}
    </Wrapper>
    <ProductWrapper>
      <Skeleton
        height={'100%'}
        width={'100%'}
        layout={{
          heading: {
            type: 'rect',
            x: 0,
            y: 0,
            width: Dimensions.get('window').width / 2.5,
            height: Dimensions.get('window').width / 2.5,
          },
        }}
      />
    </ProductWrapper>
  </OuterWrapper>
)
