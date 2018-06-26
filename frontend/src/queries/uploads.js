import gql from 'graphql-tag';

const ADD_UPLOAD = gql`
  mutation addUpload($file: Upload!) {
    addUpload(file: $file) {
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

const PROCESS_UPLOAD = gql`
  mutation processUpload($id: ID!) {
    processUpload(id: $id)
  }
`;

export { ADD_UPLOAD, GET_UPLOADS, DELETE_UPLOAD };
