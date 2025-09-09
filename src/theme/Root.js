import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Default implementation, that you can customize
export default function Root({children}) {
  return <>
    {children}
    <BrowserOnly>
      {() => (
        <meting-js
          server="netease"
          type="playlist"
          id="8282573592"
          fixed="true"
          autoplay="true"
          loop="all"
          order="random"
          preload="auto"
          list-folded="false"
          list-max-height="500px"
        >
        </meting-js>
      )}
    </BrowserOnly>
  </>;
}
