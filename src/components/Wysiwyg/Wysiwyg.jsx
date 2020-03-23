import React, { Component } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import uuid from 'uuid';
import GravityForm from '../GravityForm';
import Wysiwyg from './style';
import config from '../../theme.config';
import { Button } from '../styles';

class WYSIWYG extends Component {
  renderChildren = (node) => {
    if (node.children && !node.children.length) return false;
    return node.children.map((el) => this.renderChild(el));
  };

  renderChild = (node) => {
    if (node.type === 'tag') {
      const TagName = node.name;
      if (TagName === 'img') {
        return <img {...node.attribs} />;
      }
      return <TagName key={uuid()}>{node.data ? node.data : this.renderChildren(node)}</TagName>;
    }
    return node.data;
  };

  render() {
    const { content, color, fontSize, className, ...props } = this.props;
    const parsedContent = parse(content, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'a') {
          // check if link is path to file or link host is different than current one
          if (domNode.attribs?.class) {
            domNode.attribs.className = domNode.attribs.class;
            delete domNode.attribs.class;
          }
          if (
            !domNode.attribs ||
            domNode.attribs?.href
              ?.split('/')
              .pop()
              .indexOf('.') > -1 ||
            domNode.attribs.href.indexOf(config.wordpress.url.frontend) === -1
          ) {
            return <a {...domNode.attribs}>{this.renderChildren(domNode)}</a>;
          }
          if (domNode.attribs.href) {
            const linkAttrs = { ...domNode?.attribs };
            if (linkAttrs?.['data-type'] && linkAttrs?.['data-uri']) {
              delete linkAttrs['data-type'];
              delete linkAttrs['data-uri'];
            }
            const styles = {};
            if (domNode?.attribs?.style) {
              const attributes = domNode.attribs.style.split(';');
              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i]) {
                  const entry = attributes[i].split(':');
                  styles[entry.splice(0, 1)[0]] = entry.join(':');
                }
              }
              delete domNode.attribs.style;
            }
            return (
              <Link
                href={
                  domNode.attribs['data-uri']
                    ? `/${domNode.attribs['data-type']}?uri=${domNode.attribs['data-uri']}`
                    : domNode.attribs.href
                }
                as={domNode.attribs.href}
              >
                <a {...linkAttrs} href={domNode.attribs.href} style={styles}>
                  {this.renderChildren(domNode)}
                </a>
              </Link>
            );
          }
        } else if (domNode.type === 'tag' && domNode.name === 'gravityform') {
          return <GravityForm key={uuid()} formID={domNode.attribs.id} />;
        } else if (domNode.type === 'tag' && domNode.name === 'button') {
          const href =
            domNode.attribs.slug && domNode.attribs.type
              ? `/${domNode.attribs.type}?slug=${domNode.attribs.slug}`
              : domNode.attribs.link;

          const isExternal = domNode.attribs.external && domNode.attribs.external === 'true';
          return (
            <Link href={href} as={domNode.attribs.link} passHref>
              <Button
                target={isExternal ? '_blank' : undefined}
                as="a"
                mr={16}
                mb={10}
                {...domNode.attribs}
              >
                {this.renderChildren(domNode)}
              </Button>
            </Link>
          );
        }
      },
    });
    return (
      <Wysiwyg className={className} color={color} fontSize={fontSize} {...props}>
        {parsedContent}
      </Wysiwyg>
    );
  }
}

export default WYSIWYG;
