// @flow
import React from 'react'
import { Linking } from 'react-native'
import { Heading, Icon, ImageWrapper as Image } from '../../atoms'
import { View, Dimensions } from 'react-native'
import styled from 'styled-components'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
  isOnline: Boolean,
}

const ImageWrapper = styled.View`
  height: ${({ height }) => height};
  width: 100%;
`

const ContentWrapper = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`

const RelativeWrapper = styled.View`
  width: 100%;
`

const AbsoluteWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`

const Button = styled.TouchableOpacity`
  height: 28px;
`

const Text = styled.Text`
  color: ${({ theme }) => theme.text};
`

export const FlatListItemSearch = (props: Props) => (
  <View>
    <ImageWrapper index={props.index} height={Dimensions.get('window').width}>
      <Image source={props.item.imageUrl[0]} />
    </ImageWrapper>
    <ContentWrapper>
      <RelativeWrapper>
        <Heading size="l" marginBottom>
          {props.item.title}
        </Heading>
        <Text size="s" color="black" marginBottom>
          Price: £{props.item.price}
        </Text>
        <Text size="xxs" color="black" marginBottom>
          Ending: {props.item.endTime}
        </Text>
        <Text size="xxs" color="black" marginBottom>
          Postage: £{props.item.postage}
        </Text>
        <Text size="xxs" color="black">
          Bids: {props.item.bids}
        </Text>
        <AbsoluteWrapper>
          <Button
            onPress={() => {
              try {
                props.isOnline && Linking.openURL(props.item.itemUrl)
              } catch (error) {
                __DEV__ && console.warn(error)
              }
            }}
          >
            <Icon name="ios-arrow-dropright-circle" />
          </Button>
        </AbsoluteWrapper>
      </RelativeWrapper>
    </ContentWrapper>
  </View>
)

FlatListItemSearch.defaultProps = {
  height: 300,
  isOnline: true,
}
