import update from 'immutability-helper'

import { READY, RECORDING, FINISH } from '../../constants/states'
import { MOUSEUP, MOUSEDOWN, MOUSEMOVE } from '../../constants/events'
import { LINE } from '../../constants/shapes'

export const draw = (data, canvasContext, scaleX, scaleY) => {
  canvasContext.strokeStyle = data.stroke || 'black'
  canvasContext.moveTo(data.points[0].x * scaleX, data.points[0].y * scaleY)
  canvasContext.lineTo(data.points[1].x * scaleX, data.points[1].y * scaleY)
  canvasContext.stroke()
}

const EMPTY_DATA = {
  type: LINE,
  points: [],
  stroke: null,
  fill: null,
  __typename: 'Overlay',
}

export const transitions = {
  [MOUSEDOWN]: {
    type: MOUSEDOWN,
    transitions: {
      [READY]: RECORDING,
    },
    reduce: (data = EMPTY_DATA, action) => update(data, {
      points: {
        $set: [
          action.payload,
          action.payload,
        ],
      },
    }),
  },
  [MOUSEMOVE]: {
    type: MOUSEMOVE,
    transitions: {
      [RECORDING]: RECORDING,
    },
    reduce: (data = EMPTY_DATA, action) => update(data, {
      points: {
        1: {
          $set: action.payload,
        },
      },
    }),
  },
  [MOUSEUP]: {
    type: MOUSEUP,
    transitions: {
      [RECORDING]: FINISH,
    },
    reduce: (data = EMPTY_DATA, action) => update(data, {
      points: {
        1: {
          $set: action.payload,
        },
      },
    }),
  },
}
