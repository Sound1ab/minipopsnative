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
  width: Number,
  layout: Object,
}

export const Skeleton = (props: PropTypes) => (
  <SkeletonSvgGradient
    primaryColor={props.primaryColor}
    height={props.height}
    width={props.width}
  >
    {Object.values(props.layout).map((value, index) => {
      const { type, ...props } = value
      const Component =
        (type === 'rect' && Rect) || (type === 'circle' && Circle)
      if (props.hasOwnProperty('borderRadius')) {
        const borderRadius = props.borderRadius
        delete props.borderRadius
        props.rx = borderRadius
        props.ry = borderRadius
      }
      return <Component key={`${type}-${index}`} {...props} />
    })}
  </SkeletonSvgGradient>
)

Skeleton.defaultProps = {
  primaryColor: colors.gray,
  secondaryColor: colors.secondary,
  height: 50,
  width: 50,
  layout: {},
}
