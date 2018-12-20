import gql from 'graphql-tag'

export default gql`
  mutation createDrawboard($title: String!, $image: ImageInput!) {
    createDrawboard(input: { title: $title, image: $image }) {
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
