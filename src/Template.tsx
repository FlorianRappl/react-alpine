import * as React from 'react';
import appleTouchIcon from './assets/apple-touch-icon.png';
import favicon32 from './assets/favicon-32x32.png';
import favicon16 from './assets/favicon-16x16.png';
import manifest from './assets/site.webmanifest';

interface TemplateProps {
  title?: string;
  description?: string;
  style?: Array<React.ReactNode>;
  body: string;
}

function Template({ title, description, style, body }: TemplateProps) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="manifest" href={manifest} />
      {style}
    </head>
    <body dangerouslySetInnerHTML={{ __html: body }} />
    </html>
  );
}

export default Template;
