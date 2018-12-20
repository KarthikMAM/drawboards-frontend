import gql from 'graphql-tag'

export default gql`
  query listDrawboards($nextToken: String) {
    listDrawboards(nextToken: $nextToken) {
      items {
        id
        title
        image {
          key
          bucket
        }
        overlays {
          type
          fill
          stroke
          points {
            x
            y
          }
        }
      }
      nextToken
    }
  }
`
