// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LocalNotification } from '../presentational/molecules'
import { NOTIFICATION_MACHINE_ACTIONS } from '../../machines/LocalNotification/actions'

type PropTypes = {}

type StateTypes = {}

class LocalNotificationManager extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
    this.queue = []
    this.isNotifying = false
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.notifications !== prevProps.notifications &&
      !this.isNotifying
    ) {
      this.runQueue()
    }
  }

  runQueue = () => {
    if (this.props.notifications.length === 0) {
      this.isNotifying = false
      return
    }
    this.isNotifying = true
    const [notification] = this.props.notifications
    this.notificationRef.open(notification)
  }

  removeSelfFromQueue = id => {
    this.props.removeNotification(id)
    this.runQueue()
  }

  render() {
    return (
      <LocalNotification
        ref={ref => (this.notificationRef = ref)}
        notificationClosed={this.removeSelfFromQueue}
      />
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.localNotifications.notifications,
})

const mapDispatchToProps = dispatch => ({
  removeNotification: id => {
    dispatch(NOTIFICATION_MACHINE_ACTIONS.REMOVE_NOTIFICATION({ id }))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocalNotificationManager)
