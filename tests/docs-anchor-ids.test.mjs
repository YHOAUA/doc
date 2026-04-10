import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function loadDoc(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

const gameDesignDoc = loadDoc('docs/游戏设计/游戏设计.md');
const unityCoursesDoc = loadDoc('docs/游戏引擎/Unity/课程.md');

test('game design doc declares stable ids for headings referenced by generated anchors', () => {
  const expectedHeadings = [
    ['h2', '视频'],
    ['h3', 'gdc--玩者之心---岩田聪'],
    ['h2', '频道'],
    ['h3', 'gmtk'],
    ['h3', 'brackeys'],
    ['h3', 'gdc'],
    ['h3', 'sora_sakurai_en'],
    ['h3', 'git-amend'],
  ];

  for (const [tag, id] of expectedHeadings) {
    assert.match(
      gameDesignDoc,
      new RegExp(`<${tag}\\s+id="${id}">`, 'i'),
      `missing explicit ${tag} id: ${id}`,
    );
  }
});

test('unity course doc declares stable ids for headings referenced by generated anchors', () => {
  const expectedIds = [
    '银鸟工作室--sc-101-unity游戏开发',
    'gmtk我是如何不跟教程学习unity的',
    'gmtkunity教程适合完全初学者',
    'learn-c-in-unity',
    'unity-ecs',
  ];

  for (const id of expectedIds) {
    assert.match(
      unityCoursesDoc,
      new RegExp(`<h3\\s+id="${id}">`, 'i'),
      `missing explicit h3 id: ${id}`,
    );
  }
});
