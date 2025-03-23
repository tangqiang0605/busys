import {
  CarOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SafetyOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  NodeIndexOutlined,
  SmileOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

export const routes = [
  {
    path: "/driver",
    name: "司机管理",
    icon: <UserOutlined />,
    routes: [
      {
        path: "/driver/info",
        name: "司机信息管理",
      },
      {
        path: "/driver/schedule",
        name: "司机排班系统",
      },
      {
        path: "/driver/evaluation",
        name: "司机绩效评估",
      },
    ],
  },
  {
    path: '/route',
    name: "路线管理",
    icon: <NodeIndexOutlined />,
    routes: [
      {
        path: "/route/info",
        name: "路线信息管理",
      },
      {
        path: '/route/schedule',
        name: '路线排班管理'
      },
    ]
  },
  {
    path: "/station",
    name: "车站管理",
    icon: <EnvironmentOutlined />,
    routes: [
      {
        path: "/station/info",
        name: "车站信息管理",
      },

      {
        path: "/station/monitor",
        name: "车站监控系统",
      },
      {
        path: "/station/maintenance",
        name: "车站维护管理",
      },
    ],
  },
  {
    path: "/vehicle",
    name: "车辆管理",
    icon: <CarOutlined />,
    routes: [
      {
        path: "/vehicle/info",
        name: "车辆信息管理",
      },
      {
        path: "/vehicle/schedule",
        name: "车辆调度系统",
      },
      {
        path: "/vehicle/maintenance",
        name: "车辆维护提醒",
      },
    ],
  },
  {
    path: "facility",
    name: "设施管理",
    icon: <ShoppingOutlined />,
    routes: [
      {
        path: "/facility/facilityInfo",
        name: '设施实例信息'
      }, {
        path: "/facility/facilityType",
        name: "设施类型管理"
      }
    ]
  },
  {
    path: "/supply",
    name: "物件申请",
    icon: <FileDoneOutlined />,
    routes: [
      {
        path: "/supply/application",
        name: "物件申请流程",
      },
      {
        path: "/supply/inventory",
        name: "物件库存管理",
      },
    ],
  },
  {
    path: "/passenger",
    name: "乘客服务",
    icon: <UsergroupAddOutlined />,
    routes: [
      {
        path: "/passenger/realtime",
        name: "实时信息查询",
      },
      {
        path: "/passenger/feedback",
        name: "乘客反馈系统",
      },
    ],
  },
  {
    path: "/finance",
    name: "财务管理",
    icon: <DollarCircleOutlined />,
    routes: [
      {
        path: "/finance/ticket",
        name: "票务管理",
      },
      {
        path: "/finance/cost",
        name: "成本控制",
      },
    ],
  },
  {
    path: "/safety",
    name: "安全管理",
    icon: <SafetyOutlined />,
    routes: [
      {
        path: "/safety/monitor",
        name: "安全监控",
      },
      {
        path: "/safety/emergency",
        name: "应急响应",
      },
    ],
  },
  {
    path: "/news",
    name: "新闻管理",
    icon: <NotificationOutlined />,
    routes: [
      {
        path: "/news/publish",
        name: "新闻发布",
      },
      {
        path: "/news/audit",
        name: "新闻审核",
      },
      {
        path: "/news/category",
        name: "新闻分类",
      },
      {
        path: "/news/push",
        name: "新闻推送",
      },
    ],
  },
  {
    path: "/staff",
    name: "职工管理",
    icon: <TeamOutlined />,
    routes: [
      {
        path: "/staff/info",
        name: "职工信息管理",
      },
      {
        path: "/staff/jobList",
        name: '岗位信息表'
      },
      {
        path: '/staff/position',
        name: "任岗情况"
      },
      {
        path: "/staff/attendance",
        name: "考勤管理",
      },
      {
        path: "/staff/evaluation",
        name: "绩效评估",
      },
      // TODO 员工培训与发展计划，即每个岗位的description中有写（用ai生成就好）
      // {
      //   path: "/staff/training",
      //   name: "培训与发展",
      // },
    ],
  },
  {
    path: "/user",
    name: "账号管理",
    icon: <TeamOutlined />,
    routes: [
      {
        path: "/user/userInfo",
        name: "账号信息管理",
      },
    ]
  },
  {
    path: "/devtools",
    name: '开发者工具',
    icon: <SmileOutlined />
  }
];

export default {
  route: {
    path: '/',
    routes: routes,
  },
  // location: {
  //   pathname: '/',
  // },
  // appList: [
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  //     title: 'Ant Design',
  //     desc: '杭州市较知名的 UI 设计语言',
  //     url: 'https://ant.design',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  //     title: 'AntV',
  //     desc: '蚂蚁集团全新一代数据可视化解决方案',
  //     url: 'https://antv.vision/',
  //     target: '_blank',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  //     title: 'Pro Components',
  //     desc: '专业级 UI 组件库',
  //     url: 'https://procomponents.ant.design/',
  //   },
  //   {
  //     icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
  //     title: 'umi',
  //     desc: '插件化的企业级前端应用框架。',
  //     url: 'https://umijs.org/zh-CN/docs',
  //   },

  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
  //     title: 'qiankun',
  //     desc: '可能是你见过最完善的微前端解决方案🧐',
  //     url: 'https://qiankun.umijs.org/',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
  //     title: '语雀',
  //     desc: '知识创作与分享工具',
  //     url: 'https://www.yuque.com/',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
  //     title: 'Kitchen ',
  //     desc: 'Sketch 工具集',
  //     url: 'https://kitchen.alipay.com/',
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  //     title: 'dumi',
  //     desc: '为组件开发场景而生的文档工具',
  //     url: 'https://d.umijs.org/zh-CN',
  //   },
  // ],
};