import gql from 'graphql-tag'

export default gql`
  subscription {
    onCreateDrawboard {
      id
      title
      overlays {
        type
        fill
        stroke
        points {
          x
          y
        }
      }
      image {
        key
        bucket
      }
    }
  }
`
