// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Heading, Icon } from '../atoms'
import { colors, shadow } from '../../../theme'

const Wrapper = styled.TouchableOpacity`
  height: 60;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
  ${({ marginStyle }) =>
    css`
      margin: ${marginStyle};
    `};
`

const IconWrapper = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

type PropTypes = {
  handleOnPress: Function,
  heading: string,
  icon: string,
  margin: string,
}

export const Row = ({ handleOnPress, heading, icon, margin }: PropTypes) => (
  <Wrapper onPress={handleOnPress} marginStyle={margin}>
    <IconWrapper>
      <Icon name={icon} color={colors.primary} />
    </IconWrapper>
    <Heading size="l" color="black">
      {heading}
    </Heading>
  </Wrapper>
)

Row.defaultProps = {
  handleOnPress: () => {},
  heading: '',
  icon: '',
  margin: '0 8px 8px 8px',
}
