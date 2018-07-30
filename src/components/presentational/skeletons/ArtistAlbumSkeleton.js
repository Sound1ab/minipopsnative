// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'
import { GrowContainer } from '../atoms'

const Wrapper = styled.View`
  flex: 1;
  padding: 0 8px 8px 8px;
  width: ${Dimensions.get('window').width};
`

const ContentWrapper = styled.View`
  height: 60;
  width: ${Dimensions.get('window').width};
  padding: 16px;
`

const TrackWrapper = styled.View`
  height: 60;
  padding: 16px;
  width: 100%;
  margin: 0 0 8px 0;
`

type PropTypes = {
  index: number,
}

export const ArtistAlbumSkeleton = (props: PropTypes) => (
  <GrowContainer>
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
            width: 30,
          },
        }}
      />
    </ContentWrapper>
    <Wrapper>
      {Array(4)
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
  </GrowContainer>
)

ArtistAlbumSkeleton.defaultProps = {
  index: 0,
}

export default ArtistAlbumSkeleton
