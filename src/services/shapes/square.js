import update from 'immutability-helper'

import { READY, RECORDING, FINISH } from '../../constants/states'
import { MOUSEDOWN, MOUSEMOVE, MOUSEUP } from '../../constants/events'

export const draw = (data, canvasContext, scaleX, scaleY) => {
  canvasContext.fillStyle = data.fill
  canvasContext.strokeStyle = data.stroke
  canvasContext.rect(
    data.points[0].x * scaleX,
    data.points[0].y * scaleY,
    (data.points[1].x - data.points[0].x) * scaleX,
    (data.points[1].y - data.points[0].y) * scaleY,
  )
  canvasContext.fill()
  canvasContext.stroke()
}

export const transitions = {
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
