﻿export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './user/Login',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '配置管理',
    icon: 'SettingOutlined',
    path: '/mlnbook',
    routes: [
      {
        path: 'pic_book',
        name: '绘本管理',
        component: './MLNBook/PicBook',
      },
      {
        path: 'pic_book/config',
        name: '绘本配置',
        hideInMenu: true,
        component: './MLNBook/PicBook/configuration',
      },
      {
        path: 'kpoint',
        name: '知识点管理',
        component: './MLNBook/KnowledgePoint',
      },
      {
        path: 'chapter_template',
        name: '章节模板',
        component: './MLNBook/ChapterTemplate',
      },
      {
        path: '/mlnbook',
        redirect: '/mlnbook/pic_book', // 设置默认跳转的路径
      },
    ]
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
