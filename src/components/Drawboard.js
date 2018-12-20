import React, { PureComponent } from 'react'

import shapes from '../services/shapes'
import { CLICK, MOUSEUP, MOUSEDOWN, MOUSEMOVE, MOUSEENTER, MOUSELEAVE, DOUBLECLICK } from '../constants/events'
import { RECORDING, FINISH, READY } from '../constants/states'
import { LINE, FREEHAND, POLYGON, SQUARE } from '../constants/shapes'

import Canvas from './Canvas'
import Styles from './styles/Drawboard.module.scss'
import Colors from './Colors'
import Buttons from './Buttons'

export default class Drawboard extends PureComponent {
  state = {
    currentShape: null,
    currentState: null,
    stroke: 'black',
    fill: 'black',
  }

  initShape = (shape) => this.setState((state) => ({
    currentState: READY,
    currentShape: {
      type: shape,
      points: [],
      stroke: state.stroke,
      fill: state.fill,
      __typename: 'Overlay',
    },
  }))

  shapeButtons = [LINE, FREEHAND, POLYGON, SQUARE].map(shape => ({
    value: shape,
    onClick: () => this.initShape(shape),
  }))

  componentDidUpdate (prevProps, prevState) {
    if (this.state.currentState !== prevState.currentState && this.state.currentState === FINISH) {
      this.props.onChange([...this.props.shapes, this.state.currentShape])

      return this.initShape(this.state.currentShape.type)
    }
  }

  recordEventFunc = (eventType) => (event) => {
    const clientX = event.clientX
    const clientY = event.clientY

    const clientRect = event.target.getBoundingClientRect()

    return this.setState((state) => {
      if (!this.state.currentShape) return

      const transitionData = shapes[state.currentShape.type].transitions[eventType]

      if (!transitionData) return
      if (!transitionData.transitions[state.currentState]) return

      return {
        currentState: transitionData.transitions[state.currentState],
        currentShape: transitionData.reduce(state.currentShape, {
          type: eventType,
          payload: {
            x: (clientX - clientRect.x) / clientRect.width,
            y: (clientY - clientRect.y) / clientRect.height,
            __typename: 'Point',
          },
        }),
      }
    })
  }

  canvasHandlers = {
    onClick: this.recordEventFunc(CLICK),
    onMouseUp: this.recordEventFunc(MOUSEUP),
    onMouseDown: this.recordEventFunc(MOUSEDOWN),
    onMouseMove: this.recordEventFunc(MOUSEMOVE),
    onMouseEnter: this.recordEventFunc(MOUSEENTER),
    onMouseLeave: this.recordEventFunc(MOUSELEAVE),
    onDoubleClick: this.recordEventFunc(DOUBLECLICK),
  }

  handleFillChange = (value) => this.setState(({ currentShape }) => ({
    fill: value,
    currentShape: currentShape && {
      ...currentShape,
      fill: value,
    },
  }))
  handleStrokeChange = (value) => this.setState(({ currentShape }) => ({
    stroke: value,
    currentShape: currentShape && {
      ...currentShape,
      stroke: value,
    },
  }))

  render () {
    return (
      <div className={Styles.Container}>
        <p className={Styles.Title}>{this.props.title}</p>
        <Canvas
          background={this.props.background}
          state={this.state.currentState}
          shapes={this.state.currentState === RECORDING ? [...this.props.shapes, this.state.currentShape] : this.props.shapes}
          {...this.canvasHandlers}
        />
        <div className='row'>
          <div className='col-s12 col-m4'>
            <Buttons
              title='Click to begin drawing a shape'
              buttons={this.shapeButtons}
              renderButton={this.renderShapeButton}
            />
          </div>
          <div className='col-s12 col-m4'><Colors title='fill' onChange={this.handleFillChange} /></div>
          <div className='col-s12 col-m4'><Colors title='stroke' onChange={this.handleStrokeChange} /></div>
        </div>
      </div>
    )
  }
}
