// @flow
import React from 'react'
import styled from 'styled-components'
import { SkeletonSvgGradient } from '../molecules'
import { Circle, Rect } from 'react-native-svg'
import { colors } from '../../../theme/colors'

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
      if (prop.hasOwnProperty('borderRadius')) {
        const borderRadius = prop.borderRadius
        delete prop.borderRadius
        prop.rx = borderRadius
        prop.ry = borderRadius
      }
      return <Component {...prop} />
    })}
  </SkeletonSvgGradient>
)

Skeleton.defaultProps = {
  primaryColor: colors.primary,
  secondaryColor: colors.secondary,
  height: 50,
  layout: {},
}
