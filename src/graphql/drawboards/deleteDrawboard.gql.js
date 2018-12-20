import gql from 'graphql-tag'

export default gql`
  mutation deleteDrawboard($id: ID!) {
    deleteDrawboard(input: { id: $id }) {
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
