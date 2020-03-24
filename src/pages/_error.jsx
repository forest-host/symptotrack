import React from 'react';
import { Box } from '../components/styles';

const Error = ({ statusCode }) => {
  return <Box py={[30, 60]}>{statusCode}</Box>;
};

Error.getInitialProps = async () => ({
  namespacesRequired: ['common', 'socials'],
});

export default Error;
