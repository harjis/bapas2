import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      name
    }
  }
`;
export const USER_MUTATION = gql`
  mutation updateUser($name: String!) {
    updateUser(name: $name) {
      name
    }
  }
`;
