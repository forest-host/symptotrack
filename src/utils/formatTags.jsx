import React from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';
import uuid from 'uuid';

const formatTags = (content) => {
  const renderChildren = (node) => {
    if (node.children && !node.children.length) return false;
    return node.children.map((el) => renderChild(el));
  };

  const renderChild = (node) => {
    if (node.type === 'tag') {
      const TagName = node.name;
      return <TagName key={uuid()}>{node.data ? node.data : renderChildren(node)}</TagName>;
    }
    return node.data;
  };

  const parsedContent = parse(content, {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'a') {
        if (domNode.attribs?.href && domNode.attribs?.as) {
          return (
            <Link {...domNode.attribs} passHref>
              <a href>{renderChildren(domNode)}</a>
            </Link>
          );
        }

        return <a {...domNode.attribs}>{renderChildren(domNode)}</a>;
      }
    },
  });

  return parsedContent;
};

export default formatTags;
