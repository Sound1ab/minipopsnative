import { Mutations as userMutations } from './user'

export const resolvers = {
  Mutation: {
    ...userMutations,
  },
}
