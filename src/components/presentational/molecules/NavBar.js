// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon, Heading } from '../atoms'
import { HeadingSkeleton } from '../zkeletons'
import { colors, shadow } from '../../../theme/index'

type Props = {
  handleBack: Function,
  loading: Boolean,
  state: ?Object,
  heading: Object,
}

const Wrapper = styled.View`
  flex: 0 0 auto;
  flex-direction: ${({ handleBack }) => (handleBack ? 'row' : 'column')};
  padding: 48px 16px 16px 16px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  z-index: 10;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

const TouchableWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

export const NavBar = ({
  handleBack,
  loading,
  state,
  heading,
  children,
}: Props) => (
  <Wrapper handleBack={handleBack}>
    {handleBack ? (
      <TouchableWrapper onPress={handleBack}>
        <IconWrapper>
          <Icon name="ios-arrow-back" top="-2" color={colors.primary} />
        </IconWrapper>
        {loading && state && state.currentState === state.loadingState ? (
          <HeadingSkeleton />
        ) : (
          <Heading
            color={heading.color}
            size={heading.size}
            marginBottom={heading.marginBottom}
          >
            {heading.value}
          </Heading>
        )}
      </TouchableWrapper>
    ) : (
      <Heading
        color={heading.color}
        size={heading.size}
        marginBottom={heading.marginBottom}
      >
        {heading.value}
      </Heading>
    )}
    {children}
  </Wrapper>
)

NavBar.defaultProps = {
  handleBack: null,
  loading: false,
  state: null,
  heading: {},
}
