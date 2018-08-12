// @flow
import React from 'react'
import styled from 'styled-components'
import { FlatListEmpty } from '../molecules'

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
}

const FlatListStyled = styled.FlatList`
  flex: 1;
`

const TextStyled = styled.Text`
  color: black;
`

export const FlatListWrapper = (props: Props) => (
  <FlatListStyled
    data={props.data}
    ListHeaderComponent={props.ListHeaderComponent}
    ListEmptyComponent={
      props.ListEmptyComponent ? props.ListEmptyComponent : FlatListEmpty
    }
    renderItem={props.renderItem}
    onRefresh={props.onRefresh}
    refreshing={props.refreshing}
    keyExtractor={props.keyExtractor}
    onEndReached={props.onEndReached}
    onEndReachedThreshold={props.onEndReachedThreshold}
    removeClippedSubviews={props.removeClippedSubviews}
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
}
