import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'

import { getDrawboard, updateDrawboard } from '../graphql/drawboards'
import Drawboard from '../components/Drawboard'

export class DrawboardEditorContainer extends PureComponent {
  handleChange = (overlays) => this.props.updateDrawboard({
    variables: JSON.parse(JSON.stringify({
      id: this.props.data.getDrawboard.id,
      overlays: overlays,
    }, (key, value) => key === '__typename' ? undefined : value)),
    optimisticResponse: {
      __typename: 'Mutation',
      updateDrawboard: {
        ...this.props.data.getDrawboard,
        overlays: overlays,
        __typename: 'Drawboard',
      },
    },
  })

  render () {
    const { loading, getDrawboard } = this.props.data

    if (loading) return 'loading'

    return (
      <Drawboard
        title={getDrawboard.title}
        shapes={getDrawboard.overlays || []}
        background={getDrawboard.image.key}
        onChange={this.handleChange}
      />
    )
  }
}

export default compose(
  graphql(getDrawboard),
  graphql(updateDrawboard, { name: 'updateDrawboard' }),
)(DrawboardEditorContainer)
