// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compareMachine, products } from '../../machines/Compare'
import {
  discoveryMachine,
  favourites,
  watchList,
} from '../../machines/Discovery'

type PropTypes = {
  loading: Boolean,
  artist: string,
  album: string,
}

class Compare extends Component<PropTypes> {
  componentDidMount() {
    const { fetchProducts, artist, album } = this.props
    fetchProducts({ artist, album })
  }

  componentWillUnmount() {
    this.props.removeProducts()
  }

  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading && state.compare.state === 'fetchingProducts',
  watchListIds: watchList(state),
  favourites: favourites(state),
  products: products(state),
  id: state.login.cognitoUser.id,
})

const mapDispatchToProps = () => ({
  fetchProducts: payload => {
    compareMachine.dispatchAction('FETCH_PRODUCTS', payload)
  },
  removeProducts: payload => {
    compareMachine.dispatchAction('REMOVE_PRODUCTS', payload)
  },
  addToFavourites: payload => {
    discoveryMachine.dispatchAction('ADD_FAVOURITE', payload)
  },
  removeFromFavourites: payload => {
    discoveryMachine.dispatchAction('REMOVE_FAVOURITE', payload)
  },
  addToWatchList: payload => {
    discoveryMachine.dispatchAction('ADD_TO_WATCH_LIST', payload)
  },
  removeFromWatchList: payload => {
    discoveryMachine.dispatchAction('REMOVE_FROM_WATCH_LIST', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compare)
