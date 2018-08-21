// @flow
import React from 'react'
import { Skeleton } from '../molecules'
import { Fade } from '../zanimations'

type PropTypes = {
  isVisible: boolean,
}

export const HeadingSkeleton = ({ isVisible }: PropTypes) => (
  <Fade isVisible={isVisible}>
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
  </Fade>
)

HeadingSkeleton.defaultProps = {
  isVisible: false,
}
