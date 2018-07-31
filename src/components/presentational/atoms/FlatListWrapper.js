// @flow
import React from 'react'
import styled from 'styled-components'
import { FlatListEmpty } from '../atoms'
import { LazyDrip } from '../molecules'

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
}

const FlatListStyled = styled.FlatList`
  flex: 1;
`

const TextStyled = styled.Text`
  color: black;
`

export const FlatListWrapper = (props: Props) => (
  <LazyDrip data={props.data}>
    {({ requestMore, data }) => (
      <FlatListStyled
        data={data}
        ListHeaderComponent={props.ListHeaderComponent}
        ListEmptyComponent={
          props.ListEmptyComponent ? props.ListEmptyComponent : FlatListEmpty
        }
        renderItem={props.renderItem}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        keyExtractor={props.keyExtractor}
        onEndReached={requestMore}
        onEndReachedThreshold={props.onEndReachedThreshold}
      />
    )}
  </LazyDrip>
)

FlatListWrapper.defaultProps = {
  data: [],
  renderItem: () => {},
  onRefresh: () => {},
  refreshing: false,
  onEndReached: () => {},
  onEndReachedThreshold: 0,
}
