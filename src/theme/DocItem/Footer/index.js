import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Giscus from '@giscus/react';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <div style={{ marginTop: '3rem' }}>
        <Giscus
          id="general"
          repo="YHOAUA/doc"
          repoId="R_kgDONblbhw"
          category="general"
          categoryId="DIC_kwDONblbh84CxW4D"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          darkTheme="dark"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </>
  );
}
