// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { GrowContainer } from '../atoms'

const Wrapper = styled.View`
  ${({ index }) =>
    index === 0 &&
    css`
      margin-top: 64px;
    `};
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width + 104};
  background-color: ${({ theme }) => theme.lightGray};
`

const ContentWrapper = styled.View`
  width: ${Dimensions.get('window').width};
  flex: 1;
  padding: 16px;
`

export const SearchListSkeleton = () => (
  <GrowContainer>
    {Array(2)
      .fill(1, 0)
      .map((v, i) => (
        <Wrapper key={`${v}-${i}`} index={i}>
          <Skeleton
            height={Dimensions.get('window').width}
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
          <ContentWrapper>
            <Skeleton
              height={'100%'}
              width={'100%'}
              layout={{
                heading: {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  height: 30,
                  width: 150,
                },
                subheading1: {
                  type: 'rect',
                  x: 0,
                  y: 34,
                  height: 10,
                  width: 100,
                },
                subheading2: {
                  type: 'rect',
                  x: 0,
                  y: 48,
                  height: 10,
                  width: 100,
                },
                subheading3: {
                  type: 'rect',
                  x: 0,
                  y: 62,
                  height: 10,
                  width: 100,
                },
              }}
            />
          </ContentWrapper>
        </Wrapper>
      ))}
  </GrowContainer>
)
