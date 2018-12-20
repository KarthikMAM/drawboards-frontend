import { createDrawboard } from '../..'

export const createDrawboardSample1 = {
  request: {
    query: createDrawboard,
    variables: {
      title: 'Karthik',
      image: {
        bucket: 'karthik',
        key: 'hello',
      },
    },
  },
  result: {
    createDrawboard: {
      createDrawboard: {
        id: 'hello',
        title: 'welcome',
        image: {
          bucket: 'welcome',
          key: 'hi',
        },
      },
    },
  },
}
