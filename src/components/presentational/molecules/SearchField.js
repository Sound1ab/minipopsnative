// @flow
import React from 'react'
import styled from 'styled-components'
import { Icon, InputWrapper, Spinner } from '../atoms'
import { colors } from '../../../theme'

const Wrapper = styled.View`
  width: 100%;
  padding: 16px;
`

const RelativeWrapper = styled.View``

type PropTypes = {
  loading: boolean,
  searchInput: Function,
  searchEmpty: Function,
  api: string,
  isOnline: Boolean,
  searchValue: string,
}

export function SearchField(props: PropTypes) {
  return (
    <Wrapper>
      <RelativeWrapper>
        {props.loading ? (
          <Spinner
            style={{
              position: 'absolute',
              top: 5,
              left: 13,
              zIndex: 1,
            }}
            iterationCount="infinite"
            isVisible={true}
            size={20}
          />
        ) : (
          <Icon
            name="ios-search"
            position="absolute"
            top="5px"
            left="16px"
            size={20}
            color={props.isOnline ? colors.primary : colors.gray}
          />
        )}
        <InputWrapper
          search
          value={props.searchValue}
          handleChange={value => props.searchInput({ value, api: props.api })}
          placeholder="The Cure"
          disabled={!props.isOnline}
        />
      </RelativeWrapper>
    </Wrapper>
  )
}

SearchField.defaultProps = {
  loading: false,
  searchInput: () => {},
  searchEmpty: () => {},
  api: 'current-items',
  isOnline: true,
  searchValue: '',
}
