import React from 'react';
import PropTypes from 'prop-types';

const Document = ({ html, tags }) => (
  <html lang="en">
    <head>
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {tags.css}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
      {tags.js}
    </body>
  </html>
);

Document.propTypes = {
  html: PropTypes.string.isRequired,
  tags: PropTypes.shape({
    css: PropTypes.node.isRequired,
    js: PropTypes.node.isRequired,
  }).isRequired,
};

export default Document;
