// @flow
import React from 'react'
import styled from 'styled-components'
import { SkeletonSvgGradient } from '../molecules'
import { Circle, Rect } from 'react-native-svg'
import { colors } from '../../../Theme/Colors'

type PropTypes = {
  primaryColor: String,
  secondaryColor: String,
  height: Number,
  layout: Object,
}

export const Skeleton = (props: PropTypes) => (
  <SkeletonSvgGradient
    primaryColor={props.primaryColor}
    secondaryColor={props.secondaryColor}
    height={props.height}
  >
    {Object.entries(props.layout).map(item => {
      const [key, prop] = item
      const Component = key === 'rect' ? Rect : Circle
      return <Component {...prop} />
    })}
  </SkeletonSvgGradient>
)

Skeleton.defaultProps = {
  primaryColor: colors.primary,
  secondaryColor: colors.secondary,
  height: 100,
  layout: {},
}
