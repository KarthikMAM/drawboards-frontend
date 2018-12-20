import React, { PureComponent } from 'react'

import Label from './Label'

export default class FileInput extends PureComponent {
  handleChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      this.props.onChange({
        file: file,
        dataURL: event.target.result,
      }, this.props.name)
    }

    reader.readAsDataURL(file)
  }

  render () {
    const { onChange, label, required, value, ...inputProps } = this.props

    return (
      <Label text={label}>
        <input type='file' onChange={this.handleChange} required={required && !value} {...inputProps} />
        {value && <img src={value.dataURL} alt='uploaded' width='300' />}
      </Label>
    )
  }
}
