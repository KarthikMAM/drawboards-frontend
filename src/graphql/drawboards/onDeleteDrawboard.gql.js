import gql from 'graphql-tag'

export default gql`
  subscription onDeleteDrawboard {
    onDeleteDrawboard {
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
  }
`
