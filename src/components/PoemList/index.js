import React from 'react';
import './PoemList.css';

export default function PoemList({ children }) {
  // 将 React children 转换为字符串
  const childrenString = React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string') {
        return child;
      }
      if (React.isValidElement(child)) {
        return child.props.children;
      }
      return '';
    })
    .join('\n');

  // 解析文本内容
  const lines = childrenString.trim().split('\n');
  const poems = [];
  let currentPoem = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过空行和标题
    if (!line || line.startsWith('#')) continue;

    // 检查是否是诗句行（不包含作者名或书名号）
    const isPoemLine = !line.includes('《') && !line.includes('》');

    if (isPoemLine) {
      // 开始新诗
      if (currentPoem) {
        poems.push(currentPoem);
      }
      currentPoem = {
        content: line,
        source: ''
      };
    } else if (currentPoem) {
      // 这是出处行
      currentPoem.source = line;
    }
  }

  // 添加最后一首
  if (currentPoem) {
    poems.push(currentPoem);
  }

  // 生成搜索URL
  const getSearchUrl = (content) => {
    return `https://www.google.com/search?q=${encodeURIComponent(content)}`;
  };

  return (
    <div className="poem-list">
      {poems.map((poem, index) => (
        <div key={index} className="poem-item">
          <div className="poem-quote">
            <a href={getSearchUrl(poem.content)} target="_blank" rel="noopener">
              {poem.content}
            </a>
          </div>
          <div className="poem-source">{poem.source}</div>
        </div>
      ))}
    </div>
  );
}
