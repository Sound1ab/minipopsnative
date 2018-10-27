// @flow
import React, { Component } from 'react'
import { READ_RELATED_ARTISTS } from '../../graphQL'
import { Request } from '../../services'

type PropTypes = {
  loading: Boolean,
  discoveryResults: Array<Object>,
}

class Discovery extends Component<PropTypes> {
  timeout

  state = {
    searchValue: '',
    items: [],
    loading: false,
  }

  search = async () => {
    const variables = {
      artist: this.state.searchValue,
    }

    const items = await Request.query(READ_RELATED_ARTISTS.query, variables)
    this.setState({
      items: items[READ_RELATED_ARTISTS.definition],
    })
  }

  debouncer = () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(async () => {
      if (this.state.searchValue) {
        this.setState({ loading: true })
        await this.search()
        this.setState({ loading: false })
      }
    }, 500)
  }

  searchInput() {
    return payload => {
      this.setState(
        {
          searchValue: payload.value,
        },
        () => {
          this.debouncer()
        },
      )
    }
  }

  render() {
    return this.props.children({
      ...this.props,
      loading: this.state.loading,
      searchInput: this.searchInput(),
      searchValue: this.state.value,
      searchResults: this.state.items,
    })
  }
}

export default Discovery
