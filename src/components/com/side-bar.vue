<style lang="less">
  .el-menu-item i, .el-submenu__title i {
    color: rgb(77, 49, 124) !important
  }
  .el-menu-item.is-active {
    border-right: 2px solid #FF9300;
    background-color: @backGroundColor !important;
  }
  .el-aside {
    height: 100%;
    background: #f1f1f5;
    .el-menu {
      height: 100%;
      .el-menu-item,
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
      }
      .el-submenu .el-menu-item {
        width: 159px;
        min-width: 0;
        padding: 0 0 0 40px;
      }
    }
  }
</style>

<template>
  <div class="side-wrap">
    <el-aside width="160px">
      <el-menu :router="true"
               :default-active="getRoutePath"
               class="el-menu-vertical-demo"
               @select="getSelectItem"
               background-color="#F1F1F5"
               text-color="#333"
               active-text-color="#FF9300">
        <template v-for="nav in navList">
          <el-submenu v-if="nav.sub"
                      :index="nav.index"
                      :key="nav.index">
            <template slot="title">
              <i :class="nav.icon"></i>
              <span>{{nav.name}}</span>
            </template>
            <!-- <el-menu-item v-for="subnav in nav.sub" :index="subnav.path" :key="subnav.index">
              {{subnav.name}}
            </el-menu-item> -->
            <template v-for="subnav in nav.sub">
              <el-submenu v-if='subnav.sub'
                          :index='subnav.index'
                          :key='subnav.index'>
                <template slot="title">
                  <i :class="subnav.icon"></i>
                  <span>{{subnav.name}}</span>
                </template>
                <template v-for="subitemnav in subnav.sub">
                  <el-submenu v-if='subitemnav.sub'
                              :index='subitemnav.index'
                              :key='subitemnav.index'>
                    <template slot="title">
                      <i :class="subitemnav.icon"></i>
                      <span>{{subitemnav.name}}</span>
                    </template>
                  </el-submenu>
                  <el-menu-item v-else
                                route
                                :index="subitemnav.path"
                                :key="subitemnav.index">
                    <i :class="nav.icon"></i>
                    <span>{{subitemnav.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-else
                            route
                            :index="subnav.path"
                            :key="subnav.index">
                <i :class="nav.icon"></i>
                <span>{{subnav.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else
                        route
                        :index="nav.path"
                        :key="nav.index">
            <i :class="nav.icon"></i>
            <span>{{nav.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getRoutePath: '',
      navList: [
        {
          name: '首页',
          icon: 'iconfont icon-shouye',
          path: '/index',
          index: '1',
          nav: ['首页']
        }
      ],
      user: null
    }
  },
  beforeMount () {
    this.getPath()
    // this.getRoutePath = this.$route.fullPath
    // console.log(this.getRoutePath)
    this.user = this.$utils.getLocalUser()
    let menuMap = {
      1: [
        {
          name: '考核管理',
          icon: 'iconfont icon-kaoheguanli',
          index: '2',
          path: '/employee-assessment',
          nav: ['考核管理']
        },
        {
          name: '项目管理',
          icon: 'iconfont icon-xiangmuguanli',
          index: '3',
          path: '/manage-project',
          nav: ['项目管理']
        },
        {
          name: '审批管理',
          icon: 'iconfont icon-shenpiguanli',
          path: '/manage-review',
          index: '4',
          nav: ['审批管理']
        },
        {
          name: '行为规范',
          icon: 'iconfont icon-xingweiguifan',
          index: '5',
          sub: [
            {
              name: '考勤管理',
              path: '/attendance-management',
              index: '5-1',
              nav: ['行为规范', '考勤管理']
            },
            {
              name: '行政管理',
              path: '/administrative-management',
              index: '5-2',
              nav: ['行为规范', '行政管理']
            },
            {
              name: '简报管理',
              path: '/briefing-management',
              index: '5-3',
              nav: ['行为规范', '简报管理']
            }
          ]
        },
        {
          name: '组织架构',
          icon: 'iconfont icon-zuzhijiagou',
          index: '6',
          path: '/organizational',
          nav: ['组织架构']
        },
        // 季度分配设置
        {
          name: '绩效分配管理',
          icon: 'iconfont icon-jixiaofenpeiguanli',
          index: '7',
          sub: [
            {
              name: '绩效分配管理',
              icon: 'document',
              index: '7-1',
              path: '/review-quarterly',
              nav: ['季度分配管理', '绩效分配管理']
            },
            {
              name: '季度设置',
              icon: 'setting',
              path: '/bonus-setting',
              index: '7-2',
              nav: ['季度分配管理', '季度设置']
            }
          ]
        }
      ],
      2: [
        {
          name: '我的绩效',
          icon: 'iconfont icon-wodejixiao',
          index: '2',
          path: '/performance-detail',
          nav: ['我的绩效']
        },
        {
          name: '考核管理',
          icon: 'iconfont icon-kaoheguanli',
          index: '3',
          path: '/review-detail',
          nav: ['考核管理']
        },
        {
          name: '项目管理',
          icon: 'iconfont icon-xiangmuguanli',
          index: '4',
          path: '/manage-project',
          nav: ['项目管理']
        },
        {
          name: '行为规范',
          icon: 'iconfont icon-xingweiguifan',
          index: '6',
          sub: [
            {
              name: '考勤管理',
              path: '/attendance-management',
              index: '6-1',
              nav: ['行为规范', '考勤管理']
            },
            {
              name: '行政管理',
              path: '/administrative-management',
              index: '6-2',
              nav: ['行为规范', '行政管理'],
              query: {
                test: ''
              }
            },
            {
              name: '简报管理',
              path: '/briefing-management',
              index: '6-3',
              nav: ['行为规范', '简报管理'],
              query: {
                test: ''
              }
            }
          ]
        }
      ],
      3: [
        {
          name: '项目管理',
          icon: 'iconfont icon-xiangmuguanli',
          index: '8',
          path: '/manage-project',
          nav: ['项目管理']
        }
      ],
      4: [
        {
          name: '考勤管理',
          icon: 'iconfont icon-xingweiguifan',
          index: '4-1',
          path: '/attendance-management',
          nav: ['考勤管理']
        },
        {
          name: '行政管理',
          icon: 'iconfont icon-xingweiguifan',
          index: '4-2',
          path: '/administrative-management',
          nav: ['行政管理']
        },
        {
          name: '简报管理',
          icon: 'iconfont icon-xingweiguifan',
          index: '4-3',
          path: '/briefing-management',
          nav: ['简报管理']
        },
        {
          name: '添加人员',
          icon: 'iconfont icon-tianjiachengyuan',
          index: '4-4',
          path: '/staff-add',
          nav: ['添加人员']
        }
      ],
      5: [
        {
          name: '项目管理',
          icon: 'document',
          index: '2',
          path: '/manage-project',
          nav: ['项目管理']
        }
      ]
    }
    this.navList = this.navList.concat(menuMap[this.user.role])
  },
  methods: {
    getPath () {
      this.getRoutePath = `${this.$route.path}`
    },
    getSelectItem (index, indexPath) {
      for (let val of this.navList) {
        if (val.sub) {
          for (let subVal of val.sub) {
            if (subVal.path === index) {
              this.$store.dispatch('setNavList', subVal.nav)
              break
            }
          }
        }
        if (val.path === index) {
          this.$store.dispatch('setNavList', val.nav)
          break
        }
      }
    }
  }
}
</script>
