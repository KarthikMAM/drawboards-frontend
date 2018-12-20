
import React, { PureComponent } from 'react'

import NewDrawboard from './NewDrawboard'
import Drawboards from './Drawboards'
import DrawboardEditor from './DrawboardEditor'

export default class DrawboardsPage extends PureComponent {
  state = {
    selected: null,
  }

  handleSelectionChange = ({ id }) => this.setState({ selected: id })

  render () {
    return (
      <div className='row'>
        <div className='col-s12 col-l8'>
          <div style={{ position: 'sticky', top: 0 }}>
            {this.state.selected ? <DrawboardEditor id={this.state.selected} /> : 'Please create or select'}
          </div>
        </div>
        <div className='col-s12 col-l4'>
          <NewDrawboard />
          <Drawboards onSelectionChanged={this.handleSelectionChange} />
        </div>
      </div>
    )
  }
}
