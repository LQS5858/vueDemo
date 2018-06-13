import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Personaladddialog from '@/components/com/personal-add-dialog'
import Layout from '@/components/com/layout'
import utils from '@/assets/js/utils'
import DeptTree from '@/components/com/dept-tree'

Vue.use(Router)

let user = utils.getLocalUser()
let defaultRouter = [
  {
    path: 'project-ratings',
    component: resolve => {
      require(['@/components/employee/project-ratings'], resolve)
    }
  },
  {
    path: 'basic-ratings',
    component: resolve => {
      require(['@/components/employee/basic-ratings'], resolve)
    }
  },
  {
    path: 'briefing-ratings',
    component: resolve => {
      require(['@/components/employee/briefing-ratings'], resolve)
    }
  },
  {
    path: 'admin-attendance',
    component: resolve => {
      require(['@/components/employee/administrative-attendance'], resolve)
    }
  },
  {
    path: 'technological-innovation',
    component: resolve => {
      require(['@/components/employee/technological-innovation'], resolve)
    }
  }
]
let routerMap = {
  1: {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      ...defaultRouter,
      {
        path: 'index',
        component: resolve => {
          require(['@/components/director'], resolve)
        }
      },
      {
        path: 'bonus-setting',
        component: resolve => {
          require(['@/components/director/bonus-setting'], resolve)
        }
      },
      {
        path: 'rating-page',
        component: resolve => {
          require(['@/components/director/rating-page'], resolve)
        }
      },
      // 项目管理
      {
        path: 'manage-project',
        component: resolve => {
          require(['@/components/director/manage-project'], resolve)
        }
      },
      // 项目详情
      {
        path: 'project-rating-detail',
        component: resolve => {
          require(['@/components/director/project-rating-detail'], resolve)
        }
      },
      {
        path: 'manage-review',
        component: resolve => {
          require(['@/components/director/manage-review'], resolve)
        }
      },
      {
        path: 'review-detail/:id',
        name: 'review-detail',
        component: resolve => {
          require(['@/components/director/review-detail'], resolve)
        }
      },
      {
        path: 'attendance-management',
        component: resolve => {
          require(['@/components/director/attendance-management'], resolve)
        }
      },
      // 行政管理
      {
        path: 'administrative-management',
        component: resolve => {
          require(['@/components/director/administrative-management'], resolve)
        }
      },
      // 简报管理
      {
        path: 'briefing-management',
        component: resolve => {
          require(['@/components/director/briefing-management'], resolve)
        }
      },
      // 组织架构
      {
        path: 'organizational',
        component: resolve => {
          require(['@/components/com/organizational-structure'], resolve)
        }
      },
      // 奖金设置
      {
        path: 'review-quarterly',
        component: resolve => {
          require(['@/components/director/review-quarterly'], resolve)
        }
      },
      // 下属待考核页面
      {
        path: 'employee-assessment',
        component: resolve => {
          require(['@/components/director/employee-assessment'], resolve)
        }
      },
      // 下属绩效详细页面
      {
        path: 'performance-detail/:id?',
        component: resolve => {
          require(['@/components/employee'], resolve)
        }
      },
      // 下属评分页面
      {
        path: 'score-page/:id?',
        component: resolve => {
          require(['@/components/director/score-page'], resolve)
        }
      }
    ]
  },
  2: {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      ...defaultRouter,
      {
        path: 'index',
        component: resolve => {
          require(['@/components/manager'], resolve)
        }
      },
      {
        path: 'rating-page',
        component: resolve => {
          require(['@/components/manager/rating-page'], resolve)
        }
      },
      {
        path: 'manage-ratings',
        component: resolve => {
          require(['@/components/manager/manage-ratings'], resolve)
        }
      },
      // 下属待考核页面
      {
        path: 'review-detail',
        component: resolve => {
          require(['@/components/director/review-detail'], resolve)
        }
      },
      // 下属绩效详细页面
      {
        path: 'performance-detail/:id?',
        component: resolve => {
          require(['@/components/employee'], resolve)
        }
      },
      // 下属评分页面
      {
        path: 'score-page/:id?',
        component: resolve => {
          require(['@/components/director/score-page'], resolve)
        }
      },
      // 项目考核
      {
        path: 'manage-project',
        component: resolve => {
          require(['@/components/director/manage-project'], resolve)
        }
      },
      // 项目详情
      {
        path: 'project-rating-detail',
        component:
          resolve => {
            require(['@/components/director/project-rating-detail'], resolve)
          }
      },
      // 考勤管理
      {
        path: 'attendance-management',
        component:
          resolve => {
            require(['@/components/director/attendance-management'], resolve)
          }
      },
      // 行政管理
      {
        path: 'administrative-management',
        component:
          resolve => {
            require(['@/components/director/administrative-management'], resolve)
          }
      },
      {
        path: 'briefing-management',
        component:
          resolve => {
            require(['@/components/director/briefing-management'], resolve)
          }
      }
    ]
  },
  3:
    {
      path: '/',
      component: Layout,
      redirect: 'index',
      children:
        [
          ...defaultRouter,
          {
            path: 'index',
            component: resolve => {
              require(['@/components/employee'], resolve)
            }
          },
          {
            path: 'manage-project',
            component: resolve => {
              require(['@/components/director/manage-project'], resolve)
            }
          },
          {
            path: 'project-rating-detail',
            component: resolve => {
              require(['@/components/director/project-rating-detail'], resolve)
            }
          },
          // 组织架构
          {
            path: 'organizational',
            component: resolve => {
              require(['@/components/com/organizational-structure'], resolve)
            }
          }
        ]
    },
  4:
    {
      path: '/',
      component: Layout,
      redirect: 'index',
      children:
        [
          ...defaultRouter,
          {
            path: 'index',
            component: resolve => {
              require(['@/components/personnel/index'], resolve)
            }
          },
          {
            path: 'attendance-management',
            component: resolve => {
              require(['@/components/personnel/attendance-management'], resolve)
            }
          },
          {
            path: 'administrative-management',
            component: resolve => {
              require([
                '@/components/personnel/administrative-management'
              ], resolve)
            }
          },
          {
            path: 'briefing-management',
            component: resolve => {
              require(['@/components/personnel/briefing-management'], resolve)
            }
          },
          {
            path: 'staff-add',
            component: resolve => {
              require(['@/components/personnel/staff-add'], resolve)
            }
          }
        ]
    },
  5:
    {
      path: '/',
      component: Layout,
      redirect: 'index',
      children:
        [
          ...defaultRouter,
          {
            path: 'index',
            component: resolve => {
              require(['@/components/employee'], resolve)
            }
          },
          {
            path: 'manage-project',
            component: resolve => {
              require(['@/components/program-ex/manage-project'], resolve)
            }
          },
          {
            path: 'project-rating-detail',
            component: resolve => {
              require(['@/components/director/project-rating-detail'], resolve)
            }
          },
          {
            path: 'add-project',
            component: resolve => {
              require(['@/components/program-ex/add-project'], resolve)
            }
          },
          {
            path: 'modify-project',
            component: resolve => {
              require(['@/components/program-ex/modify-project'], resolve)
            }
          }
        ]
    }
}
let routerArr = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/Personaladddialog',
    component: Personaladddialog
  },
  {
    path: '/dept-tree',
    component: DeptTree
  }
]

if (user.role) {
  routerArr.push(routerMap[user.role])
}

const router = new Router({
  mode: 'history',
  routes: routerArr
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
