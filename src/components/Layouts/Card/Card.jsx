import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { i18n } from '../../../i18n';
import { formatTags } from '../../../utils';

// Components
import Copy from '../../General/Copy';

// Styling
import { Box, Flex, Row, Heading, Text, InfoSection } from '../../styles';

const Card = ({ title, content, shapePosition, includeLink }) => (
  <Row mb={[30, 70]} mx={[-15, 0]} smallFullWidth>
    <InfoSection
      width={[1, 8 / 12]}
      py={30}
      pl={[15, 90]}
      pr={[15, 40]}
      bg="lightGreen"
      shape={shapePosition}
    >
      <Flex flexDirection={['column', 'row']} alignItems={['initial', 'flex-end']}>
        {title && (
          <Box css={{ minWidth: 200 }}>
            <Heading.H2>{title}</Heading.H2>
          </Box>
        )}
        {content && (
          <Box>
            <Text as="p" mb={0} ml={[0, 40]} fontSize={16}>
              {formatTags(content)}
            </Text>
          </Box>
        )}
      </Flex>
      {includeLink && (
        <Box mt={20} width={[1, 1 / 2]}>
          <Copy value="https://symptotrack.org?edit=" />
          <Text as="span">{i18n.t('copyLink')}</Text>
        </Box>
      )}
    </InfoSection>
  </Row>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  includeLink: PropTypes.bool,
  shapePosition: PropTypes.string,
};

Card.defaultProps = {
  content: null,
  includeLink: false,
  shapePosition: 'topLeft',
};

export default Card;
