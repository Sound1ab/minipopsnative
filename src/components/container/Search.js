// @flow
import React, { Component } from 'react'
import { Request } from '../../services'
import { connect } from 'react-redux'
import {
  searchValue,
  searchResults,
} from '../../machines/SearchField/selectors'
import { searchMachine } from '../../machines/SearchField'
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
    // const { state } = this.props
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
  state: state.search.state,
  loading: state.app.loading,
  searchValue: searchValue(state),
  searchResults: searchResults(state),
  isOnline: state.app.isOnline,
})

const mapDispatchToProps = () => ({
  searchInput: payload => {
    searchMachine.dispatchAction('TEXT_INPUT', payload)
  },
  searchEmpty: () => {
    searchMachine.dispatchAction('TEXT_INPUT_EMPTY', { value: null })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
