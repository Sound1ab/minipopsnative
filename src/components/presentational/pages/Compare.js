// @flow
import React from 'react'

import { CompareContainer } from '../../container'
import { Screen } from '../templates'
import { TabBarPlaceholder, Heading, ScrollViewWrapper } from '../atoms'
import { HorizontalSlider } from '../molecules'

type PropTypes = {
  navigator: {},
  artist: string,
  album: string,
  imageMediumUrl: string,
  discogsProducts: [],
}

export const Compare = ({ navigator, artist, album }): PropTypes => (
  <CompareContainer artist={artist} album={album}>
    {({ loading, products }) => (
      <Screen
        isModal
        noLoading
        navigator={navigator}
        loading={loading}
        heading={{
          value: 'Compare',
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
        <ScrollViewWrapper style={{ padding: 16 }}>
          <Heading color="black" size="xl">
            {artist}
          </Heading>
          <Heading color="black" size="l" marginBottom>
            {album}
          </Heading>
          <Heading color="black" size="m" marginBottom>
            Discogs
          </Heading>
          <HorizontalSlider products={products.discogs} loading={loading} />
          <Heading color="black" size="m" marginBottom>
            Juno
          </Heading>
          <HorizontalSlider products={products.juno} loading={loading} />
          <Heading color="black" size="m" marginBottom>
            Vinyl Tap
          </Heading>
          <HorizontalSlider products={products.vinylTap} loading={loading} />
          <TabBarPlaceholder />
        </ScrollViewWrapper>
      </Screen>
    )}
  </CompareContainer>
)

Compare.defaultProps = {
  navigator: {},
  artist: '',
  album: '',
  imageMediumUrl: '',
}
