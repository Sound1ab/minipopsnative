// @flow
import React from 'react'
import styled from 'styled-components'
import { FlatListEmpty } from '../atoms'

type Props = {
  data: Array<Object>,
  ListHeaderComponent: Function,
  ListEmptyComponent: Function,
  renderItem: Function,
  onRefresh: Function,
  refreshing: boolean,
  keyExtractor: Function,
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
  />
)

FlatListWrapper.defaultProps = {
  data: [],
  renderItem: () => {},
  onRefresh: () => {},
  refreshing: false,
}
