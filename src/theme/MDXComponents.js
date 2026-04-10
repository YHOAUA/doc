import React from 'react';
import PoemList from '@site/src/components/PoemList';

function ArticleLink(props) {
  const { href = '', target, rel, ...restProps } = props;
  const isHashLink = href.startsWith('#');

  if (isHashLink) {
    return <a href={href} target={target} rel={rel} {...restProps} />;
  }

  return (
    <a
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'noopener noreferrer'}
      {...restProps}
    />
  );
}

export default {
  a: ArticleLink,
  PoemList,
};
