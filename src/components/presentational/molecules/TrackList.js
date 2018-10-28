// @flow
import React, { Component, Fragment } from 'react'
import { TouchableOpacity, LayoutAnimation } from 'react-native'
import { TrackRow, Icon } from '../atoms'

type PropTypes = {
  tracks: Array<Object>,
}

type StateTypes = {
  isListAll: boolean,
}

export class TrackList extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    tracks: [],
  }

  constructor(props: PropTypes) {
    super(props)
  }

  state = {
    isListAll: false,
  }

  updateTracklist = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ isListAll: !this.state.isListAll })
  }

  render() {
    return (
      <Fragment>
        {this.props.tracks
          .filter((track, index) => {
            return this.state.isListAll
              ? index < this.props.tracks.length - 1
              : index < 1
          })
          .map((track, index) => (
            <TrackRow key={track} index={index}>
              {`${index + 1}. `}
              {track}
            </TrackRow>
          ))}
        <TouchableOpacity
          onPress={this.updateTracklist}
          style={{ paddingLeft: 16 }}
        >
          <Icon name="ios-more" />
        </TouchableOpacity>
      </Fragment>
    )
  }
}
