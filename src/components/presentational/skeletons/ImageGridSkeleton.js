// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'
import { GrowContainer } from '../atoms'

const Wrapper = styled.View`
  flex: 0;
  flex-direction: row;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width / 3};
  background-color: ${colors.lightGray};
  padding: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
`

const AlbumWrapper = styled.View`
  flex: 1;
  height: 100%;
  padding: ${({ index, length }) =>
    parseInt(index) === parseInt(0)
      ? '0 4px 0 0'
      : index === length - 1
        ? '0 0 0 4px'
        : '0 4px'};
`

type PropTypes = {
  index: number,
}

export const ImageGridSkeleton = (props: PropTypes) => (
  <GrowContainer>
    {Array(7)
      .fill(1, 0)
      .map((v, i) => (
        <Wrapper key={`${v}-${i}`} index={i}>
          {Array(3)
            .fill(1, 0)
            .map((v2, i2, a2) => (
              <AlbumWrapper key={`${v2}-${i2}`} index={i2} length={a2.length}>
                <Skeleton
                  height={'100%'}
                  width={'100%'}
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
              </AlbumWrapper>
            ))}
        </Wrapper>
      ))}
  </GrowContainer>
)

ImageGridSkeleton.defaultProps = {
  index: 0,
}

export default ImageGridSkeleton
