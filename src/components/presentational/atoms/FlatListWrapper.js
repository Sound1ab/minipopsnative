// @flow
import React from 'react'
import styled from 'styled-components'
import { FlatListEmpty } from '../molecules'
import { TabBarPlaceholder } from '../atoms'

type Props = {
  data: Array<Object>,
  ListHeaderComponent: Function,
  ListEmptyComponent: Function,
  renderItem: Function,
  onRefresh: Function,
  refreshing: boolean,
  keyExtractor: Function,
  onEndReached: Function,
  onEndReachedThreshold: number,
  removeClippedSubviews: Boolean,
  onScrollBeginDrag: ?Function,
  onScrollEndDrag: ?Function,
  onScroll: ?Function,
  isTabHidden: Boolean,
  ListEmptyComponent: Function,
}

const FlatListStyled = styled.FlatList`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

export const FlatListWrapper = (props: Props) => (
  <FlatListStyled
    data={props.data}
    ListHeaderComponent={props.ListHeaderComponent}
    ListEmptyComponent={props.ListEmptyComponent}
    renderItem={props.renderItem}
    onRefresh={props.onRefresh}
    refreshing={props.refreshing}
    keyExtractor={props.keyExtractor}
    onEndReached={props.onEndReached}
    onEndReachedThreshold={props.onEndReachedThreshold}
    removeClippedSubviews={props.removeClippedSubviews}
    onScrollBeginDrag={props.onScrollBeginDrag}
    onScrollEndDrag={props.onScrollEndDrag}
    onScroll={props.onScroll}
    ListFooterComponent={props.isTabHidden ? TabBarPlaceholder : null}
  />
)

FlatListWrapper.defaultProps = {
  data: [],
  renderItem: () => {},
  onRefresh: null,
  refreshing: false,
  onEndReached: () => {},
  onEndReachedThreshold: 0,
  removeClippedSubviews: false,
  onScrollBeginDrag: null,
  onScrollEndDrag: null,
  onScroll: null,
  isTabHidden: false,
  ListEmptyComponent: FlatListEmpty,
}
