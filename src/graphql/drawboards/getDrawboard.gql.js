import gql from 'graphql-tag'

export default gql`
  query getDrawboard($id: ID!) {
    getDrawboard(id: $id) {
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
