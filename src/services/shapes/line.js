import update from 'immutability-helper'

import { READY, CREATE, RECORDING, FINISH } from '../../constants/states'
import { INIT, MOUSEUP, MOUSEDOWN, MOUSEMOVE } from '../../constants/events'

export const draw = (data, canvasContext, scaleX, scaleY) => {
  canvasContext.strokeStyle = data.stroke || 'black'
  canvasContext.moveTo(data.points[0].x * scaleX, data.points[0].y * scaleY)
  canvasContext.lineTo(data.points[1].x * scaleX, data.points[1].y * scaleY)
  canvasContext.stroke()
}

export const transitions = {
  [INIT]: {
    type: INIT,
    transitions: {
      [CREATE]: READY,
    },
    reduce: (data, action) => data,
  },
  [MOUSEDOWN]: {
    type: MOUSEDOWN,
    transitions: {
      [READY]: RECORDING,
    },
    reduce: (data, action) => update(data, {
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
    reduce: (data, action) => update(data, {
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
    reduce: (data, action) => update(data, {
      points: {
        1: {
          $set: action.payload,
        },
      },
    }),
  },
}
