import { Machine } from 'xstate'

const id = 'localNotifications'

export const machine = Machine({
  id,
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        ADD_NOTIFICATION: 'addingNotification',
        REMOVE_NOTIFICATION: 'removingNotification',
      },
    },
    addingNotification: {
      onEntry: ['ADD_NOTIFICATION'],
      on: {
        NOTIFICATION_ADDED: 'idle',
      },
    },
    removingNotification: {
      onEntry: ['REMOVE_NOTIFICATION'],
      on: {
        NOTIFICATION_REMOVED: 'idle',
      },
    },
  },
})
