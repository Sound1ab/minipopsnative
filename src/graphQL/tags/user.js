import gql from 'graphql-tag'

export const READ_USER = {
  definition: 'readUser',
  query: gql`
    query ReadUser($id: ID!) {
      readUser(id: $id) {
        id
      }
    }
  `,
}

export const CREATE_USER = {
  definition: 'createUser',
  mutation: gql`
    mutation CreateUser($id: ID!) {
      createUser(id: $id) {
        id
      }
    }
  `,
}

export const UPDATE_USER = {
  definition: 'updateUser',
  mutation: gql`
    mutation UpdateUser($id: ID!, $deviceToken: String!) {
      updateUser(id: $id, deviceToken: $deviceToken) {
        id
        deviceToken
      }
    }
  `,
}

export const CREATE_USER_LOCAL = {
  definition: 'createUserLocal',
  mutation: gql`
    mutation CreateUserLocal($user: User) {
      createUserLocal(user: $user) @client
    }
  `,
}
