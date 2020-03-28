import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatTags } from '../../../utils';

// Components
import Icon from '../../Icon';

// Styling
import SShare from './styles';
import { Box, Flex, Row, Heading, Text } from '../../styles';

const Share = ({ title, content, shareUrl, shareTitle }) => (
  <Row mb={70}>
    <Box width={[1, 8 / 12]}>
      {title && <Heading.H3>{title}</Heading.H3>}
      {content && (
        <Text as="p" mb={40}>
          {formatTags(content)}
        </Text>
      )}
    </Box>
    <Flex mx={-12} mb={30}>
      <SShare
        as="a"
        href={`http://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareTitle}"`}
        aria-label="Facebook"
        target="_blank"
        mx={12}
        bg="blue"
      >
        <Icon icon="FACEBOOK" color="lightGreen" viewBox="0 0 496 493" size={22} />
      </SShare>
      {/*
      <SShare as="a" href="" aria-label="Instagram" target="_blank" mx={12} bg="blue">
        <Icon icon="INSTAGRAM" color="lightGreen" viewBox="0 0 450 449" size={22} />
      </SShare>
      */}
      <SShare
        as="a"
        href={`http://www.twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        aria-label="Twitter"
        target="_blank"
        mx={12}
        bg="blue"
      >
        <Icon icon="TWITTER" color="lightGreen" viewBox="0 0 512 416" size={22} />
      </SShare>
      <SShare
        as="a"
        href={`https://api.whatsapp.com/send?text=${shareTitle}-${shareUrl}`}
        data-action="share/whatsapp/share"
        aria-label="Whatsapp"
        target="_blank"
        mx={12}
        bg="blue"
      >
        <Icon icon="WHATSAPP" color="lightGreen" viewBox="0 0 448 512" size={22} />
      </SShare>
    </Flex>
    <Flex mx={-12} mb={30}>
      <SShare
        as="a"
        href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
        aria-label="Mail"
        target="_blank"
        mx={12}
        bg="blue"
      >
        <Icon icon="MAIL" color="lightGreen" viewBox="0 0 512 512" size={22} />
      </SShare>
      <SShare
        as="a"
        href={`sms:?body=${shareUrl}`}
        aria-label="SMS"
        target="_blank"
        mx={12}
        bg="blue"
      >
        <Icon icon="SMS" color="lightGreen" viewBox="0 0 24 22" size={22} />
      </SShare>
    </Flex>
  </Row>
);

Share.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  shareUrl: PropTypes.string,
  shareTitle: PropTypes.string,
};

Share.defaultProps = {
  title: null,
  content: null,
  shareUrl: null,
  shareTitle: null,
};

export default Share;
