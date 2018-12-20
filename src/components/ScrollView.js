import React, { PureComponent } from 'react'

import classNames from '../utils/classNames'

import Styles from './styles/ScrollView.module.scss'

export default class ScrollView extends PureComponent {
  render () {
    return (
      <div className={classNames(Styles.Container, this.props.className)}>
        <div className={Styles.ScrollView}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
