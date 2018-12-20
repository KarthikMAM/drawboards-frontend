import gql from 'graphql-tag'

export default gql`
  subscription onUpdateDrawboard {
    onUpdateDrawboard {
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
