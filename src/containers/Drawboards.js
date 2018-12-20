import React, { PureComponent } from 'react'
import { buildSubscription } from 'aws-appsync'
import { compose, graphql } from 'react-apollo'

import Drawboards from '../components/Drawboards'
import {
  listDrawboards,
  onUpdateDrawboard,
  onCreateDrawboard,
  onDeleteDrawboard,
} from '../graphql/drawboards'

class DrawboardsContainer extends PureComponent {
  componentDidMount () {
    this.props.data.subscribeToMore(buildSubscription(onCreateDrawboard, listDrawboards))
    this.props.data.subscribeToMore(buildSubscription(onDeleteDrawboard, listDrawboards))
    this.props.data.subscribeToMore(buildSubscription(onUpdateDrawboard, listDrawboards))
  }

  fetchMore = () => {
    const { listDrawboards, fetchMore } = this.props.data

    return fetchMore({
      variables: {
        nextToken: listDrawboards.nextToken,
      },
      updateQuery: ({ listDrawboards }, { fetchMoreResult }) => {
        const existingIds = new Set(listDrawboards.items.map(i => i.id))

        return {
          listDrawboards: {
            items: [
              ...listDrawboards.items,
              ...fetchMoreResult.listDrawboards.items.filter(i => !existingIds.has(i.id)),
            ],
            nextToken: fetchMoreResult.listDrawboards.nextToken,
            __typename: fetchMoreResult.listDrawboards.__typename,
          },
        }
      },
    })
  }

  render () {
    const { listDrawboards, loading } = this.props.data

    if (loading) return 'loading'

    return (
      <Drawboards
        drawboards={listDrawboards.items}
        fetchMore={listDrawboards.nextToken && this.fetchMore}
        onSelectionChanged={this.props.onSelectionChanged}
      />
    )
  }
}

export default compose(graphql(listDrawboards))(DrawboardsContainer)
