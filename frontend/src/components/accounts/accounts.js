import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Accounts = props => {
  if (props.data.loading) return 'Loading';

  return (
    <div>
      <div>Accounts</div>
      <div>{props.data.feed.map(post => post.text)}</div>
    </div>
  );
};

export default graphql(gql`
  query AllPosts {
    feed {
      id
      text
    }
  }
`)(Accounts);
