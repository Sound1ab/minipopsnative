// @flow
import React, { Component } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'
import { Linking, Vibration } from 'react-native'
import { Heading } from '../atoms'
import { ifIphoneX } from '../../../helpers/iphoneXHelper'
import { BlurView } from 'react-native-blur'
const recordImage = require('../../../assets/2000px-Disque_Vinyl-1-60.png')

type PropTypes = {}

type StateTypes = {}

const BORDER_RADIUS = 12
const NOTIFICATION_HEADER = 'MINIPOPS'

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  padding: ${ifIphoneX ? '38px 8px 8px 8px' : '8px'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: black;
  shadow-offset: 1px 1px;
  opacity: ${({ opacityStyled }) => opacityStyled};
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
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

const Image = styled.Image`
  width: 30;
  height: 30;
`

export class LocalNotification extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.timeout = null
  }

  initialState = (opacity = 0) => ({
    moveTo: -500,
    size: 1,
    opacity,
    title: '',
    message: '',
    url: '',
    id: '',
  })

  state = this.initialState()

  open = ({ title = '', message = '', id = '', url = '' }) => {
    this.setState({
      moveTo: 0,
      opacity: 1,
      title,
      message,
      url,
      id,
    })
    this.timeout = setTimeout(() => {
      this.close()
    }, 5000)
  }

  onSwipeUp = () => {
    this.close()
  }

  close = () => {
    const id = this.state.id
    this.setState(this.initialState(1))
    setTimeout(() => {
      this.props.notificationClosed(id)
    }, 1000)
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
        console.error(`error opening link: ${error}`)
      }
    }
  }

  render() {
    return (
      <Wrapper
        transition={['translateY', 'scaleX', 'scaleY']}
        opacityStyled={this.state.opacity}
        style={{
          transform: [
            { translateY: this.state.moveTo },
            { scaleX: this.state.size },
            { scaleY: this.state.size },
          ],
        }}
      >
        <GestureRecognizer onSwipeUp={state => this.onSwipeUp(state)}>
          <Notification
            activeOpacity={1}
            onPress={this.openUrl.bind(null, this.state.url)}
            onLongPress={this.clearTimeout}
          >
            <Blurred blurType="light" blurAmount={10} />
            <HorizontalWrapper>
              <IconWrapper>
                <Image source={recordImage} />
              </IconWrapper>
              <Heading size="xs" weight="regular" color="#434348">
                {NOTIFICATION_HEADER}
              </Heading>
            </HorizontalWrapper>
            <Heading color="black" weight="semibold">
              {this.state.title}
            </Heading>
            <Heading color="black" numberOfLines={null} weight="regular">
              {this.state.message}
            </Heading>
          </Notification>
        </GestureRecognizer>
      </Wrapper>
    )
  }
}
