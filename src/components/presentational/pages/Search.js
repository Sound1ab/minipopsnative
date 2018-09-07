// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Screen } from '../templates'
import { SearchContainer } from '../../container'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch, SearchField } from '../molecules'
import { hideTabsOnScroll } from '../../../navigation'
import { SearchListSkeleton } from '../zkeletons'
import { Fade } from '../zanimations'

const hideTabs = hideTabsOnScroll()

const TextStyled = styled.Text`
  margin: 0 16px 16px 16px;
  color: black;
`

const emptyText = 'Search for your favourite albums on eBay ✌️'

export const Search = ({ navigator }) => (
  <SearchContainer navigator={navigator}>
    {({
      state,
      loading,
      searchValue,
      searchResults,
      searchInput,
      searchEmpty,
      isOnline,
    }) => (
      <Screen navigator={navigator}>
        {() => (
          <Fragment>
            <FlatListWrapper
              data={searchResults}
              ListEmptyComponent={() => <TextStyled>{emptyText}</TextStyled>}
              ListHeaderComponent={React.createElement(SearchField, {
                searchInput,
                searchEmpty,
                searchValue,
                loading: state === 'fetchingSearch',
                api: 'current-items',
              })}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              renderItem={props => (
                <FlatListItemSearch {...props} isOnline={isOnline} />
              )}
              onScroll={
                searchResults.length > 0 && hideTabs.bind(null, navigator)
              }
              isTabHidden
            />
            <Fade isVisible={loading} fadeIn fadeOut>
              <SearchListSkeleton />
            </Fade>
          </Fragment>
        )}
      </Screen>
    )}
  </SearchContainer>
)
