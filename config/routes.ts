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
    path: '/pic_book',
    icon: 'BookOutlined',
    name: '绘本管理',
    component: './MLNBook/PicBook',
  },
  {
    path: '/pic_book/designing',
    name: '绘本编排',
    hideInMenu: true,
    component: './MLNBook/PicBook/Designing/index',
  },
  {
    path: '/kpoint',
    icon: 'ZhihuOutlined',
    name: '知识点管理',
    component: './MLNBook/KnowledgePoint',
  },
  {
    path: '/pic_book/voice',
    icon: 'SoundOutlined',
    name: '语音管理',
    hideInMenu: true,
    component: './MLNBook/PicBook/VoiceTemplate',
  },
  {
    path: '/mobile_preview',
    icon: 'MobileOutlined',
    name: '内容预览',
    component: './MLNBook/MobilePreview',
  },
  {
    path: '/layout_template',
    icon: 'LayoutOutlined',
    name: '布局模板',
    component: './MLNBook/LayoutTemplate',
  },
  {
    path: '/',
    redirect: '/pic_book',
  },
  {
    component: './404',
  },
];
