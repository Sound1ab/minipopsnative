// @flow
import React from 'react'
import { Linking } from 'react-native'
import { Heading, Icon, ImageWrapper as Image } from '../../atoms'
import { View, Dimensions } from 'react-native'
import styled from 'styled-components'
import { colors } from '../../../../theme'

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

export const FlatListItemSearch = (props: Props) => (
  <View>
    <ImageWrapper index={props.index} height={Dimensions.get('window').width}>
      <Image source={props.item.imageUrl[0]} />
    </ImageWrapper>
    <ContentWrapper>
      <RelativeWrapper>
        <Heading size="m" color="black" marginBottom>
          {props.item.title}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Price: £{props.item.price}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Ending: {props.item.endTime}
        </Heading>
        <Heading size="xxs" color="black" marginBottom>
          Postage: £{props.item.postage}
        </Heading>
        <Heading size="xxs" color="black">
          Bids: {props.item.bids}
        </Heading>
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
            <Icon
              name="ios-arrow-dropright-circle"
              color={props.isOnline ? colors.primary : colors.gray}
            />
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
