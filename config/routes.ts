export default [
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
    path: '/mlnbook/pic_book',
    icon: 'BookOutlined',
    name: '绘本管理',
    component: './MLNBook/PicBook',
  },
  {
    path: '/mlnbook/pic_book/designing',
    name: '绘本编排',
    hideInMenu: true,
    component: './MLNBook/PicBook/components/BookContentComponent',
  },
  {
    path: '/mlnbook/kpoint',
    icon: 'ZhihuOutlined',
    name: '知识点管理',
    component: './MLNBook/KnowledgePoint',
  },
  {
    path: '/mlnbook/layout_template',
    icon: 'LayoutOutlined',
    name: '布局模板',
    component: './MLNBook/LayoutTemplate',
  },
  {
    path: '/',
    redirect: '/mlnbook/pic_book',
  },
  {
    component: './404',
  },
];
