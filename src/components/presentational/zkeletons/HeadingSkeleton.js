// @flow
import React from 'react'
import { Skeleton } from '../molecules'

export const HeadingSkeleton = () => (
  <Skeleton
    height={27}
    width={150}
    layout={{
      heading: {
        type: 'rect',
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
      },
    }}
  />
)
