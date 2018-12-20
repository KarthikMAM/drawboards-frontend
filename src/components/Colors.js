import React, { PureComponent } from 'react'

import Styles from './styles/Colors.module.scss'

export default class Colors extends PureComponent {
  static defaultProps = {
    colors: [
      'violet',
      'indigo',
      'blue',
      'green',
      'yellow',
      'orange',
      'red',
      'black',
      'white',
      'transparent',
    ],
  }

  handleClick = (event) => this.props.onChange(event.target.value)

  renderColor (color) {
    return (
      <button
        className={Styles.Button}
        style={{ backgroundColor: color }}
        onClick={this.handleClick}
        value={color}
        key={color}
      />
    )
  }

  render () {
    return (
      <div className={Styles.Container}>
        {this.props.title && <p className={Styles.Title}>{this.props.title}</p>}
        {this.props.colors.map(color => this.renderColor(color))}
      </div>
    )
  }
}
