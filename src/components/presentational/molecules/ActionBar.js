// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'
import { colors, shadow } from '../../../theme'

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  padding: 16px;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

const IconWrapper = styled.View`
  margin-left: 16px;
`

type PropTypes = {
  handleAddToFavourites: Function,
  handleRemoveFromFavourites: Function,
  isFavourite: Boolean,
  isWatched: boolean,
}

export class ActionBar extends Component<PropTypes> {
  static defaultProps = {
    handleAddToFavourites: () => {},
    handleRemoveFromFavourites: () => {},
    handleRemoveFromWatchList: () => {},
    handleAddToWatchList: () => {},
    isFavourite: false,
    isWatched: false,
  }
  state = {
    isHeartPressed: false,
    isWatchPressed: false,
  }

  componentDidMount() {
    this.props.isFavourite && this.setState({ isHeartPressed: true })
    this.props.isWatched && this.setState({ isWatchPressed: true })
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isFavourite !== this.props.isFavourite) {
      this.setState({ isHeartPressed: this.props.isFavourite })
    }
  }

  handlePress = () => {
    this.props.isFavourite
      ? this.props.handleRemoveFromFavourites()
      : this.props.handleAddToFavourites()
    this.setState({ isHeartPressed: !this.state.isHeartPressed })
  }

  handleWatchPress = () => {
    this.props.isWatched
      ? this.props.handleRemoveFromWatchList()
      : this.props.handleAddToWatchList()
    this.setState({ isWatchPressed: !this.state.isWatchPressed })
  }

  render() {
    return (
      <Wrapper>
        <TouchableOpacity onPress={this.handlePress}>
          {this.state.isHeartPressed ? (
            <Icon name="ios-heart" color={colors.primary} />
          ) : (
            <Icon name="ios-heart-outline" color={colors.primary} />
          )}
        </TouchableOpacity>

        {this.props.isFavourite && (
          <TouchableOpacity onPress={this.handleWatchPress}>
            <IconWrapper>
              {this.state.isWatchPressed ? (
                <Icon name="ios-megaphone" color={colors.primary} />
              ) : (
                <Icon name="ios-megaphone-outline" color={colors.primary} />
              )}
            </IconWrapper>
          </TouchableOpacity>
        )}
      </Wrapper>
    )
  }
}
