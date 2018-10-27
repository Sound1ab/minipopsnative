// @flow
import React, { Component } from 'react'
import { Request } from '../../services'
import { connect } from 'react-redux'
import { READ_EBAY_BY_KEYWORDS } from '../../graphQL'

type PropTypes = {
  state: string | Object,
  loading: boolean,
  searchValue: string,
  searchResults: Array<Object>,
}

class Search extends Component<PropTypes> {
  timeout

  state = {
    searchValue: '',
    items: [],
    loading: false,
  }

  search = async () => {
    const variables = {
      keywords: this.state.searchValue,
    }

    const items = await Request.query(READ_EBAY_BY_KEYWORDS.query, variables)
    this.setState({
      items: items[READ_EBAY_BY_KEYWORDS.definition],
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

const mapStateToProps = state => ({
  loading: state.app.loading,
  isOnline: state.app.isOnline,
})

export default connect(mapStateToProps)(Search)
