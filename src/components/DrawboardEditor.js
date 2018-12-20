import React, { PureComponent } from 'react'

import Drawboard from './Drawboard'

export default class DrawboardEditor extends PureComponent {
  render () {
    if (this.props.loading) return 'loading'

    return (
      <Drawboard
        title={this.props.drawboard.title}
        overlays={this.props.drawboard.overlays}
        background={this.props.drawboard.image.key}
        onChange={this.props.onChange}
      />
    )
  }
}
