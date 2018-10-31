import * as React from 'react';

import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { CURRENT_USER } from 'src/queries/user_queries';
import { getToken } from "../../utils/auth";

class CurrentUser extends React.Component {
  render() {
    if (!getToken()) return this.props.children(null);
    return (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error || !(data && data.currentUser)) {
            return this.props.children(null);
          } else {
            return this.props.children(data.currentUser);
          }
        }}
      </Query>
    );
  }
}
export default withApollo(CurrentUser);
