import { updateDrawboard } from '../..'

export const updateDrawboardBasicSample = {
  request: {
    query: updateDrawboard,
    variables: {
      id: '1',
      overlays: [{
        type: 'square',
        points: [
          { x: 1, y: 0.1 },
          { x: 1, y: 0.2 },
        ],
        stroke: 'black',
        fill: 'green',
      }],
    },
  },
  result: {
    data: {
      updateDrawboard: {
        id: '1',
        title: 'Karthik',
        overlays: [{
          type: 'square',
          points: [
            { x: 1, y: 0.1 },
            { x: 1, y: 0.2 },
          ],
          stroke: 'black',
          fill: 'green',
        }],
        image: {
          bucket: 'karthik',
          key: 'karthik',
        },
      },
    },
  },
}
