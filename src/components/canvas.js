import React, { PureComponent } from 'react'

import shapes from '../services/shapes'
import classNames from '../utils/classNames'
import { RECORDING, READY } from '../constants/states'

import Styles from './styles/Canvas.module.scss'

export default class Canvas extends PureComponent {
  static defaultProps = {
    shapes: [],
  }

  state = {
    height: 400,
    width: 800,
    loading: true,
  }

  canvasRef = React.createRef()
  backgroundRef = React.createRef()

  componentDidMount () {
    this.drawShapes()

    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate () {
    this.drawShapes()
  }

  componentWillMount () {
    window.removeEventListener('resize', this.handleResize)
  }

  drawShapes = () => {
    if (!this.canvasRef.current) return

    const ctx = this.canvasRef.current.getContext('2d')

    ctx.beginPath()
    ctx.clearRect(0, 0, this.state.width, this.state.height)

    this.props.shapes.forEach((shape) => {
      ctx.beginPath()
      shapes[shape.type].draw(shape, ctx, this.state.width, this.state.height)
    })
  }

  handleResize = () => {
    const boundingClientRect = this.backgroundRef.current.getBoundingClientRect()

    this.setState({
      height: boundingClientRect.height,
      width: boundingClientRect.width,
      loading: false,
    })
  }

  render () {
    return (
      <div className={Styles.Container}>
        <img
          ref={this.backgroundRef}
          className={Styles.Background}
          src={`${process.env.REACT_APP_IMAGES_URL}/${this.props.background}`}
          alt='background'
          onLoad={this.handleResize}
        />
        {!this.state.loading && <canvas
          ref={this.canvasRef}
          width={this.state.width}
          height={this.state.height}
          onClick={this.props.onClick}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
          onMouseMove={this.props.onMouseMove}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          onDoubleClick={this.props.onDoubleClick}
          className={classNames(
            Styles.Canvas,
            this.props.state === RECORDING && Styles.Recording,
            this.props.state === READY && Styles.Ready
          )}
        />}
      </div>
    )
  }
}
