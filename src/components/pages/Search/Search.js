// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SearchField } from '../../presentational/molecules'
import { FlatListWrapper, GrowContainer } from '../../presentational/atoms'
import { connect } from 'react-redux'
import { SEARCH_MACHINE } from './actions'

type PropTypes = {
  textInput: Function,
}

export class Search extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    textInput: () => {},
  }
  constructor(props: PropTypes) {
    super(props)
  }

  handleChange = value => {
    console.log(this)
    this.props.textInput(value)
  }

  render() {
    return (
      <GrowContainer>
        <SearchField
          handleChange={this.handleChange}
          value={this.props.searchValue}
        />
        <FlatListWrapper
          data={[{ prop: 'hello', key: '1' }, { prop: 'hello', key: '2' }]}
          renderItem={({ item }) => (
            <View>
              <Text>{item.prop}</Text>
            </View>
          )}
        />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  searchValue: state.search.value,
})

const mapDispatchToProps = dispatch => ({
  textInput: value => {
    dispatch(SEARCH_MACHINE.TEXT_INPUT(value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
