// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms'
import { colors, shadow } from '../../../theme'

type PropTypes = {
  handleAddToFavourites: Function,
  handleRemoveFromFavourites: Function,
  isFavourite: Boolean,
}

const Wrapper = styled.View`
  flex: 1;
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

export class ActionBar extends Component<PropTypes> {
  static defaultProps = {
    handleAddToFavourites: () => {},
    handleRemoveFromFavourites: () => {},
    isFavourite: false,
  }
  state = {
    isHeartPressed: false,
  }

  componentDidMount() {
    this.props.isFavourite && this.setState({ isHeartPressed: true })
  }

  handlePress = () => {
    this.props.isFavourite
      ? this.props.handleRemoveFromFavourites()
      : this.props.handleAddToFavourites()
    this.setState({ isHeartPressed: !this.state.isHeartPressed })
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
      </Wrapper>
    )
  }
}
