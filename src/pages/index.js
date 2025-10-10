import React, { useState, useEffect, useRef, useCallback } from 'react'; // 引入 useCallback
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [fullHitokoto, setFullHitokoto] = useState('Never Knows Best');
  const [displayHitokoto, setDisplayHitokoto] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCursor, setShowCursor] = useState(false); // 新增状态：控制光标显示
  const typingTimeoutRef = useRef(null);

  // **优化：将 fetchHitokoto 提取为 useCallback，以便在双击时调用**
  const fetchHitokoto = useCallback(async () => {
    // 首先清除任何正在进行的打字动画
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setDisplayHitokoto(''); // 重置打字机显示内容
    setShowCursor(true);    // 显示光标
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://v1.hitokoto.cn/?c=i&encode=text');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setFullHitokoto(data);
    } catch (e) {
      console.error("Failed to fetch hitokoto:", e);
      setError("未能加载标语，请稍后再试。");
      setFullHitokoto('Live free or die.'); // 失败时提供一个兜底标语
    } finally {
      setIsLoading(false);
    }
  }, []); // 空依赖数组表示此函数在组件生命周期内不会改变

  // 1. 组件挂载时获取一言
  useEffect(() => {
    fetchHitokoto();

    return () => { // 清理函数
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [fetchHitokoto]); // 依赖 fetchHitokoto

  // 2. 实现打字机效果的 useEffect
  useEffect(() => {
    if (isLoading || error || !fullHitokoto) {
      // 如果还在加载，有错误，或没有获取到完整标语，则不启动打字机
      return;
    }

    // 清除上一个可能的打字定时器
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }

    if (displayHitokoto.length < fullHitokoto.length) {
      // 继续打字
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayHitokoto(fullHitokoto.substring(0, displayHitokoto.length + 1));
      }, 100); // 每个字打字间隔 100ms
      setShowCursor(true); // 正在打字时显示光标
    } else {
      // 打字完成
      setShowCursor(false); // 打字完成时隐藏光标
    }

    return () => { // 清理函数
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [fullHitokoto, isLoading, error, displayHitokoto]); // 依赖项：当这些值改变时重新运行此 effect


  // 双击事件处理器
  const handleDoubleClick = () => {
    if (!isLoading) { // 只有在当前没有加载或打字时才能刷新，防止频繁操作
      fetchHitokoto();
    }
  };

  // 处理标语显示逻辑：
  let subtitleContent;
  if (isLoading) {
    subtitleContent = '加载中...';
  } else if (error) {
    subtitleContent = error;
  } else {
    subtitleContent = displayHitokoto; // 总是显示打字机当前内容
  }

  return (
    <header className={clsx('hero', styles.heroBanner)} onDoubleClick={handleDoubleClick}> {/* 双击事件绑定到整个头部区域 */}
      <div className="container">
        {/* 头像 */}
        <img
          src="https://avatars.githubusercontent.com/u/67505299"
          alt="YHOAUA's Avatar"
          className={styles.avatar}
        />
        {/* 姓名 */}
        <Heading as="h1" className={styles.heroTitle}>
          YHOAUA
        </Heading>
        {/* 标语 */}
        <p className={clsx(styles.heroSubtitle, styles.typingEffect)}>
          {subtitleContent}
          {showCursor && <span className={styles.typedCursor}></span>} {/* 根据 showCursor 状态条件渲染光标 */}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button', styles.blogButton)}
            to="/docs/intro">
            开始阅读 →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hi from YHOAUA`}
      description="YHOAUA">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
