// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {
  data: Array<Object>,
  ListEmptyComponent: Function,
  renderItem: Function,
  onRefresh: Function,
  refreshing: boolean,
}

const FlatListStyled = styled.FlatList`
  flex: 1;
  background-color: pink;
`

export const FlatListWrapper = (props: Props) => (
  <FlatListStyled
    data={props.data}
    ListEmptyComponent={props.ListEmptyComponent}
    renderItem={props.renderItem}
    onRefresh={props.onRefresh}
    refreshing={props.refreshing}
  />
)

FlatListWrapper.defaultProps = {
  data: [],
  ListEmptyComponent: () => {},
  renderItem: () => {},
  onRefresh: () => {},
  refreshing: false,
}
