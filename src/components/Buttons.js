import React, { PureComponent } from 'react'

import classNames from '../utils/classNames'

import Styles from './styles/Buttons.module.scss'

export default class Buttons extends PureComponent {
  static defaultProps = {
    data: [],
  }

  renderButton (button) {
    return (
      <button
        className={classNames(Styles.Button, button.className)}
        onClick={button.onClick}
        value={button.value}
        key={button.value}>
        {button.value}
      </button>
    )
  }

  render () {
    return (
      <div className={Styles.Container}>
        {this.props.title && <p className={Styles.Title}>{this.props.title}</p>}
        {this.props.buttons.map(button => this.renderButton(button))}
      </div>
    )
  }
}
