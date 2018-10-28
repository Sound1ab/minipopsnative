// @flow
import React, { Component } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'
import { Navigation } from 'react-native-navigation'
import { Dimensions } from 'react-native'
import { Linking, Vibration } from 'react-native'
import { Heading } from '../atoms'
import { ifIphoneX } from '../../../helpers/iphoneXHelper'
import { BlurView } from 'react-native-blur'
const recordImage = require('../../../assets/2000px-Disque_Vinyl-1-60.png')

type PropTypes = {
  title: string,
  message: string,
  url: string,
}

type StateTypes = {
  size: number,
}

const BORDER_RADIUS = 12
const NOTIFICATION_HEADER = 'MINIPOPS'

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  padding: ${ifIphoneX ? '38px 8px 8px 8px' : '8px'};
  width: ${Dimensions.get('window').width};
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: black;
  shadow-offset: 1px 1px;
`)

const Notification = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: ${BORDER_RADIUS};
  padding: 8px;
`

const Blurred = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: ${BORDER_RADIUS};
`

const HorizontalWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

const Image = styled.Image`
  width: 30;
  height: 30;
`

export class LocalNotification extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    title: '',
    message: '',
    url: '',
  }
  constructor(props) {
    super(props)
    this.timeout = null
  }

  state = {
    size: 1,
  }

  componentDidMount = () => {
    this.timeout = setTimeout(() => {
      this.close()
    }, 4000)
  }

  onSwipeUp = () => {
    this.close()
  }

  close = () => {
    Navigation.dismissInAppNotification()
  }

  clearTimeout = () => {
    Vibration.vibrate()
    this.setState({
      size: 1.03,
    })
    setTimeout(() => {
      this.setState({
        size: 1,
      })
    }, 100)
    this.timeout && clearTimeout(this.timeout)
  }

  openUrl = url => {
    this.clearTimeout()
    if (url) {
      try {
        Linking.openURL(url)
      } catch (error) {
        __DEV__ && console.error(`error opening link: ${error}`)
      }
    }
  }

  render() {
    return (
      <Wrapper
        transition={['scaleX', 'scaleY']}
        style={{
          transform: [{ scaleX: this.state.size }, { scaleY: this.state.size }],
        }}
      >
        <GestureRecognizer onSwipeUp={state => this.onSwipeUp(state)}>
          <Notification
            activeOpacity={1}
            onPress={
              this.props.url ? this.openUrl.bind(null, this.props.url) : null
            }
            onLongPress={this.clearTimeout}
          >
            <Blurred blurType="light" blurAmount={10} />
            <HorizontalWrapper>
              <IconWrapper>
                <Image source={recordImage} />
              </IconWrapper>
              <Heading size="xs" weight="regular">
                {NOTIFICATION_HEADER}
              </Heading>
            </HorizontalWrapper>
            {this.props.title && (
              <Heading weight="semibold">{this.props.title}</Heading>
            )}
            {this.props.message && (
              <Heading numberOfLines={null} weight="regular">
                {this.props.message}
              </Heading>
            )}
          </Notification>
        </GestureRecognizer>
      </Wrapper>
    )
  }
}
