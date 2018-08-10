// @flow
import React from 'react'
import { LocalNotificationManager, SearchField } from '../../container'
import { NavBar, Heading, Spinner } from '../atoms'
import { HeadingSkeleton } from '../zkeletons'

type PropTypes = {
  loading: Boolean,
  handleBack: ?Function,
  state: ?{
    currentState: string | Object,
    loadingState: string,
  },
  heading: {
    value: string,
    color: string,
    size: string,
    marginBottom: Boolean,
  },
  searchApi: ?string,
  children: Function,
}

export const Screen = ({
  loading,
  handleBack,
  state,
  heading,
  searchApi,
  children,
}: PropTypes) => (
  <React.Fragment>
    <NavBar handleBack={handleBack}>
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
      {searchApi && <SearchField api={searchApi} />}
    </NavBar>
    {children}
    <Spinner isVisible={loading} />
    <LocalNotificationManager />
  </React.Fragment>
)

Screen.defaultProps = {
  loading: false,
  handleBack: null,
  state: null,
  heading: {
    value: '',
    color: 'black',
    size: 'xl',
    marginBottom: false,
  },
  searchApi: null,
  children: () => {},
}

export default Screen
