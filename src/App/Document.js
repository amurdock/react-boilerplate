import React from 'react';

const Document = ({ html, tags }) => (
  <html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    {tags.css}
  </head>
  <body>

  <div id="root" dangerouslySetInnerHTML={{ __html: html }}/>

  {tags.js}
  </body>
  </html>
);

export default Document;
