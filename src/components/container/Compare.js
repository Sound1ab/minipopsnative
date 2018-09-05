// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compareMachine, products } from '../../machines/Compare'

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
  loading: state.app.loading,
  products: products(state),
})

const mapDispatchToProps = () => ({
  fetchProducts: payload => {
    compareMachine.dispatchAction('FETCH_PRODUCTS', payload)
  },
  removeProducts: payload => {
    compareMachine.dispatchAction('REMOVE_PRODUCTS', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compare)
