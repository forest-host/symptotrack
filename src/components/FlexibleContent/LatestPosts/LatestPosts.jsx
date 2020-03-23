import React from 'react';
import { Query } from 'react-apollo';
import uuid from 'uuid';
import { Flex, Text } from '../../styles';
import { GetLatestPosts } from '../../../lib/queries';

const LatestPosts = () => (
  <Query query={GetLatestPosts}>
    {({ error, data }) => {
      if (error) return <p>Error loading latest posts</p>;
      const { posts: { edges: posts } = {} } = data || {};
      return (
        <Flex>
          {posts?.map((item) => (
            <Text key={uuid()}>{item.node.title}</Text>
          ))}
        </Flex>
      );
    }}
  </Query>
);

export default LatestPosts;
