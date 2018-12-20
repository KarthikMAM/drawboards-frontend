import React, { PureComponent } from 'react'

export default class Layout extends PureComponent {
  render () {
    return (
      <div className='row'>
        <div className='col-m12 col-l8'>
          {this.props.left}
        </div>
        <div className='col-m12 col-l4'>
          {this.props.right}
        </div>
      </div>
    )
  }
}
