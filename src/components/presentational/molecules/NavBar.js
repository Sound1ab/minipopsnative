// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Icon, Heading } from '../atoms'
import { HeadingSkeleton } from '../zkeletons'
import { colors, shadow } from '../../../theme'

type Props = {
  handleBack: Function,
  loading: Boolean,
  state: ?Object,
  heading: Object,
}

const Wrapper = styled.View`
  flex: 0 0 auto;
  flex-direction: column;
  padding: 48px 16px 16px 16px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

const TouchableWrapper = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
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
    <TouchableWrapper onPress={handleBack}>
      {handleBack ? (
        <React.Fragment>
          <IconWrapper>
            <Icon name="ios-arrow-back" color={colors.primary} />
          </IconWrapper>
          <Heading
            color={heading.color}
            size={heading.size}
            marginBottom={heading.marginBottom}
          >
            {heading.value}
          </Heading>
          {loading &&
            state &&
            state.currentState === state.loadingState && <HeadingSkeleton />}
        </React.Fragment>
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
    {children}
  </Wrapper>
)

NavBar.defaultProps = {
  handleBack: null,
  loading: false,
  state: null,
  heading: {},
}
