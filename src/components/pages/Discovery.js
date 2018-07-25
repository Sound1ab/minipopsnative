// @flow
import React from 'react'
import { connect } from 'react-redux'
import SearchField from '../../components/container/SearchField'
import { pushScreen } from '../../navigation'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemDiscovery,
  Heading,
  NavBar,
} from '../presentational/atoms'

type PropTypes = {
  discoveryResults: Array<Object>,
}

const MOCK_ITEM = {
  imageUrl:
    'https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg',
  title: 'Test realu kldajsnm asdj flkasjd flkasjd fklasjd flkasdj fks',
}

const Discovery = (props: PropTypes) => (
  <GrowContainer>
    <NavBar>
      <Heading color="black" font="xl">
        Discovery
      </Heading>
      <SearchField api="related-artists" />
    </NavBar>
    {/*<FlatListItemDiscovery*/}
    {/*{...props}*/}
    {/*item={MOCK_ITEM}*/}
    {/*/>*/}
    {/*<FlatListItemDiscovery*/}
    {/*{...props}*/}
    {/*item={MOCK_ITEM}*/}
    {/*/>*/}
    <FlatListWrapper
      data={props.discoveryResults}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      renderItem={renderProps => (
        <FlatListItemDiscovery
          {...renderProps}
          handlePress={spotifyId => {
            pushScreen({
              navigator: props.navigator,
              screen: 'RelatedArtist',
              passProps: {
                spotifyId,
              },
            })
          }}
        />
      )}
    />
  </GrowContainer>
)

const mapStateToProps = state => ({
  discoveryResults: state.search.discoveryResults,
})

export default connect(mapStateToProps)(Discovery)
