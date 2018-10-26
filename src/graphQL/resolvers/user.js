import gql from 'graphql-tag'

export const Mutations = {
  dummy: (_, variables, { cache, getCacheKey }) => {
    // const id = getCacheKey({ __typename: 'User', id: 'id' })
    // console.log('id', id)
    const query = gql`
      query ReadUser {
        user @client {
          id
          keyOne
          keyTwo
        }
      }
    `
    const previous = cache.readQuery({ query })

    const newData = {
      user: {
        ...previous.user,
        keyTwo: 'two2',
      },
    }
    console.warn('user', previous)
    // cache.writeQuery({ query, data: newData })
    cache.writeData({ id: 'User:test', data: newData })

    const previousTwo = cache.readQuery({ query })
    console.warn('user', previousTwo)
    return null
  },
  createUserLocal: (_, { user }, { cache }) => {
    console.log('user', user)
    const data = { __typename: 'User', id: 'test', user }

    cache.writeData({ id: 'User:test', data })
    // console.log('cache', cache.data.data)

    const query = gql`
      query ReadUser {
        session @client {
          user {
            id
          }
        }
      }
    `
    const previousTwo = cache.readQuery({ query })
    console.warn('user', previousTwo)
    return data
  },
}
