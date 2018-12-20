import React, { PureComponent } from 'react'

import Input from './Input'
import File from './FileInput'
import Styles from './styles/DrawboardForm.module.scss'

export default class DrawboardForm extends PureComponent {
  render () {
    return (
      <form className={Styles.Form} onSubmit={this.props.onSubmit}>
        <Input
          required
          type='text'
          label='Title'
          name='title'
          value={this.props.value.title}
          onChange={this.props.onChange} />
        <File
          required
          value={this.props.value.image}
          name='image'
          label='Background'
          accept='image/jpeg,image/jpg'
          onChange={this.props.onChange} />
        <Input required type='submit' value="Submit" />
      </form>
    )
  }
}
