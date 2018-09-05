// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Icon, Heading } from '../atoms'
import { HeadingSkeleton } from '../zkeletons'
import { colors, shadow } from '../../../theme'
import { Fade } from '../zanimations'
import { dismissModal } from '../../../navigation'

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

type PropTypes = {
  isModal: Boolean,
  noLoading: Boolean,
  handleBack: Function,
  loading: Boolean,
  state: ?Object,
  heading: Object,
}

export const NavBar = ({
  isModal,
  noLoading,
  handleBack,
  loading,
  heading,
  children,
}: PropTypes) => (
  <Wrapper handleBack={handleBack}>
    <TouchableWrapper onPress={isModal ? dismissModal : handleBack}>
      {handleBack || isModal ? (
        <React.Fragment>
          <IconWrapper>
            {isModal ? (
              <Icon name="ios-arrow-down" color={colors.primary} />
            ) : (
              <Icon name="ios-arrow-back" color={colors.primary} />
            )}
          </IconWrapper>
          <Heading
            color={heading.color}
            size={heading.size}
            marginBottom={heading.marginBottom}
          >
            {heading.value}
          </Heading>
          {!noLoading && (
            <Fade isVisible={loading} fadeOut>
              <HeadingSkeleton />
            </Fade>
          )}
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
  isModal: false,
  noLoading: false,
  handleBack: null,
  loading: false,
  state: null,
  heading: {},
}
