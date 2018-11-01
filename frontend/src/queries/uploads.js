import gql from 'graphql-tag';

export const ADD_UPLOAD = gql`
  mutation addUpload($file: Upload!) {
    addUpload(file: $file) {
      id
      filename
      encoding
      mimetype
    }
  }
`;

export const GET_UPLOADS = gql`
  query {
    uploads {
      id
      filename
    }
  }
`;
export const DELETE_UPLOAD = gql`
  mutation deleteUpload($id: ID!) {
    deleteUpload(id: $id) {
      id
    }
  }
`;

export const PROCESS_UPLOAD = gql`
  mutation processUpload($id: ID!) {
    processUpload(id: $id) {
      id
    }
  }
`;
