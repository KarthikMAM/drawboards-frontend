import update from 'immutability-helper'

import { READY, CREATE, RECORDING, FINISH } from '../../constants/states'
import { INIT, MOUSEMOVE, MOUSEDOWN, MOUSEUP, MOUSELEAVE } from '../../constants/events'

export const draw = (data, canvasContext, width, height) => {
  canvasContext.strokeStyle = data.stroke || 'black'
  data.points.forEach((point, index) => {
    if (index === 0) {
      canvasContext.moveTo(point.x * width, point.y * height)
    }

    canvasContext.lineTo(point.x * width, point.y * height)
  })
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
  [MOUSEMOVE]: {
    type: MOUSEMOVE,
    transitions: {
      [RECORDING]: RECORDING,
    },
    reduce: (data, action) => update(data, {
      points: {
        $push: [action.payload],
      },
    }),
  },
  [MOUSEDOWN]: {
    type: MOUSEDOWN,
    transitions: {
      [READY]: RECORDING,
    },
    reduce: (data, action) => update(data, {
      points: {
        $push: [action.payload],
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
        $push: [action.payload],
      },
    }),
  },
  [MOUSELEAVE]: {
    type: MOUSELEAVE,
    transitions: {
      [RECORDING]: FINISH,
    },
    reduce: (data, action) => update(data, {
      points: {
        $push: [action.payload],
      },
    }),
  },

}
