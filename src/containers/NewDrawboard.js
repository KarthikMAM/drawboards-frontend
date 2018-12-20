import React, { PureComponent } from 'react'
import update from 'immutability-helper'
import { withApollo, compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { post } from 'axios'

import DrawboardForm from '../components/DrawboardForm'
import { createDrawboard } from '../graphql/drawboards'

const s3UploadPolicy = gql`
  query getS3UploadPolicy {
    getS3UploadPolicy
  }
`

export class NewDrawboardContainer extends PureComponent {
  state = {
    value: {},
  }

  handleChange = (value, name) => this.setState((state) => update(state, {
    value: {
      [name]: {
        $set: value,
      },
    },
  }))

  uploadImage = () => {
    const formData = new FormData()
    const queryOptions = {
      query: s3UploadPolicy,
      fetchPolicy: 'network-only',
    }

    return this.props.client.query(queryOptions).then(
      async ({ data: { getS3UploadPolicy } }) => {
        const policy = JSON.parse(getS3UploadPolicy)

        Object.keys(policy.fields).forEach((field) => {
          formData.append(field, policy.fields[field])
        })
        formData.append('file', this.state.value.image.file)

        await post(policy.url, formData)

        return {
          bucket: policy.fields.bucket,
          key: policy.fields.Key,
        }
      }
    )
  }

  handleSubmit = (event) => {
    this.uploadImage().then((image) => {
      this.props.createDrawboard({
        variables: {
          title: this.state.value.title,
          image: image,
        },
      })
      this.setState({
        value: {},
      })
    })

    event.preventDefault()
  }

  render () {
    return (
      <DrawboardForm onSubmit={this.handleSubmit} onChange={this.handleChange} value={this.state.value} />
    )
  }
}

export default compose(
  withApollo,
  graphql(createDrawboard, { name: 'createDrawboard' })
)(NewDrawboardContainer)
