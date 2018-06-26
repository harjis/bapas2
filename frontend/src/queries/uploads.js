import gql from 'graphql-tag';

const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`;

const GET_UPLOADS = gql`
  query {
    uploads {
      id
      filename
    }
  }
`;
const DELETE_UPLOAD = gql`
  mutation deleteUpload($id: ID!) {
    deleteUpload(id: $id)
  }
`;

export { SINGLE_UPLOAD, GET_UPLOADS, DELETE_UPLOAD };
