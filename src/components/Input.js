import React, { PureComponent } from 'react'

import Label from './Label'

export default class Input extends PureComponent {
  static defaultProps = {
    value: '',
  }

  handleChange = (event) => this.props.onChange(event.target.value, this.props.name)

  render () {
    const { onChange, label, ...inputProps } = this.props

    return (
      <Label text={label}>
        <input onChange={this.handleChange} {...inputProps} />
      </Label>
    )
  }
}
