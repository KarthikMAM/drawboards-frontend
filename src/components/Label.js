import React, { PureComponent } from 'react'

import Styles from './styles/Label.module.scss'

export default class Label extends PureComponent {
  render () {
    return !this.props.text ? this.props.children : (
      <label className={Styles.Label}>
        {this.props.text}
        {this.props.children}
      </label>
    )
  }
}
