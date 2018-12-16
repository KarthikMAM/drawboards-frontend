import React, { PureComponent } from 'react'
import Styles from './styles/canvas.module.scss'

export default class Canvas extends PureComponent {
  canvasRef = React.createRef()

  componentDidMount () {
    const ctx = this.canvasRef.current.getContext('2d')

    ctx.fillRect(25, 25, 100, 100)
    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)
  }

  render () {
    return (
      <div className={Styles.Container}>
        <canvas
          ref={this.canvasRef}
          className={Styles.Canvas}
        />
      </div>
    )
  }
}
