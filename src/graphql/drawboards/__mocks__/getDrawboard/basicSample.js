import { getDrawboard } from '../..'

export const getDrawboardBasicSample = {
  request: {
    query: getDrawboard,
    variables: {
      id: '1',
    },
  },
  result: {
    data: {
      getDrawboard: {
        id: '1',
        title: 'karthik',
        overlays: null,
        image: {
          bucket: 'karthik',
          key: 'karthik',
        },
      },
    },
  },
}
