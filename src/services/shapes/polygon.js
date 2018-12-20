import update from 'immutability-helper'

import { READY, RECORDING, FINISH } from '../../constants/states'
import { CLICK, MOUSEMOVE, DOUBLECLICK } from '../../constants/events'

export const draw = (data, canvasContext, scaleX, scaleY) => {
  canvasContext.fillStyle = data.fill
  canvasContext.strokeStyle = data.stroke
  data.points.forEach((point, index) => {
    if (index === 0) {
      canvasContext.moveTo(point.x * scaleX, point.y * scaleY)
    }

    canvasContext.lineTo(point.x * scaleX, point.y * scaleY)
  })
  canvasContext.closePath()
  canvasContext.fill()
  canvasContext.stroke()
}

export const transitions = {
  [CLICK]: {
    type: CLICK,
    transitions: {
      [READY]: RECORDING,
      [RECORDING]: RECORDING,
    },
    reduce: (data, action) => update(data, {
      points: {
        $splice: [[data.points.length - 1, 1]],
        $push: [
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
        $splice: [[data.points.length - 1, 1]],
        $push: [action.payload],
      },
    }),
  },
  [DOUBLECLICK]: {
    type: DOUBLECLICK,
    transitions: {
      [RECORDING]: FINISH,
    },
    reduce: (data, action) => update(data, {
      points: {
        $splice: [[data.points.length - 2, 2]],
      },
    }),
  },
}
