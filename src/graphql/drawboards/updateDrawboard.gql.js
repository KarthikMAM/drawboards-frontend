import gql from 'graphql-tag'

export default gql`
  mutation updateDrawboard($id: ID!, $overlays: [OverlayInput]) {
    updateDrawboard(input: { id: $id, overlays: $overlays }) {
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
