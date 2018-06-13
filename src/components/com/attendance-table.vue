<!-- 考勤tabl组件 -->
<style lang='less' scoped>
  .attendance-table-wrap {
    position: relative;
    height: 100%;
    background-color: @backGroundColor;
    .table-title {
      height: 64px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .attendance-btn {
        text-align: center;
      }
    }
    .pagination-wrap {
      float: right;
      margin: 16px 0;
      // font-size: 12px;
      height: 32px;
      background-color: @backGroundColor;
    }
    .clear-both {
      clear: both;
    }
  }
</style>
<template>
  <div class='attendance-table-wrap'>
    <slot name='table-header'>
      <div v-if="isShowBehaviorBtn && addType"
           class="table-title">
        <div class="attendance-btn" v-if="addType">
          <el-button type="primary"
                     @click="addQuarter">{{addType}}
          </el-button>
          <PersonalAddDialog :addType="addType"></PersonalAddDialog>
        </div>
      </div>
    </slot>
    <div class="table-data">
      <el-table stripe
                :data="data"
                style="width: 100%">
        <template v-for="(item,index) of columnTitle">
          <el-table-column :key="index"
                           v-if="item.type === 'operation'"
                           :width="item.width || ''"
                           :prop="item.row"
                           :label="item.title">
            <template slot-scope="scope">
              <el-button v-if="item.flag"
                         :key="item.flag"
                         @click="fnClick(scope.row, data)"
                         type="text"
                         size="small">{{assessFn(scope.row)}}
              </el-button>
              <el-button v-else
                         v-for="(fnItem, fnKey) in item.callback"
                         :key="fnKey"
                         @click="fnItem(scope.row, data)"
                         type="text"
                         size="small">{{fnKey}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column :key="index"
                           v-else-if="item.type"
                           :width="item.width || ''"
                           :type="item.type || 'none'"
                           :prop="item.row"
                           :label="item.title">
          </el-table-column>
          <el-table-column :key="index"
                           v-else
                           :sortMethod="item.sort"
                           :sortable="!!item.sort"
                           :width="item.width || ''"
                           :prop="item.row"
                           :label="item.title">
            <template slot-scope="scope">
              <span v-html="item.format?item.format(scope.row):scope.row[item.row]"></span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <slot name='slot-pagination'>
      <div class='pagination-wrap'>
        <el-pagination :page-size="page.size"
                       background
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       :page-sizes="page.sizes"
                       layout="sizes,prev,pager,next"
                       :total="page.total"
                       prev-text="上一页"
                       next-text='下一页'>
        </el-pagination>
      </div>
      <div class="clear-both"></div>
    </slot>

  </div>
</template>

<script>
import AttendanceTable from '@/components/com/basic-score'
import InviteTable from '@/components/com/invite-score-table'
import PersonalAddDialog from '@/components/com/personal-add-dialog'
import {mapActions} from 'vuex'

export default {
  props: {
    isSetClass: {type: Boolean, default: false},
    scoreingSetClass: {type: Boolean, default: false},
    isShowSerialNumber: {
      type: Boolean,
      default: true
    },
    isShow: {
      type: Boolean,
      default: true
    },
    addType: {
      default: ''
    },
    columnTitle: {
      default () {
        return []
      }
    },
    data: {
      default () {
        return []
      }
    },
    page: {
      type: Object,
      default () {
        return {
          size: 100,
          current: 1,
          total: 0,
          sizes: [50, 100, 200]
        }
      }
    }
  },
  components: {AttendanceTable, InviteTable, PersonalAddDialog},
  computed: {},

  mounted () {
    console.log(this.columnTitle.callback)
  },
  watch: {},
  data () {
    return {
      isShowBehaviorBtn: this.$store.state.addAttendance.behaviorData.isShowBehaviorBtn
    }
  },
  methods: {
    ...mapActions({
      showDialog: 'dialogShow', hidenDialog: 'hidenDialog', updateTitle: 'updateDialogTitle'
    }),
    fnClick (row) {
      this.$router.push(`/score-page/${row.uid}`)
    },
    assessFn (row) {
      let status = +row.score.status || 1
      let operationType = null
      switch (status) {
        case 1:
        case 2:
          operationType = '评分'
          break
        case 3:
          operationType = '修改'
          break
        default:
          operationType = '评分'
          break
      }
      return operationType
    },
    handleClick (index, row) {
      if (this.currentRole === '4') {
        return
      }
      this.$router.push('/bonus-setting')
    },
    addQuarter () {
      // 获取路由地址数据
      let queryData = this.$route.query
      let getPath = queryData.name || queryData.subname
      // 获取用户角色
      let user = this.$utils.getLocalUser().role
      switch (user) {
        case 4:
          this.showDialog()
          this.updateTitle(getPath)
          break
        case 1:
          this.$router.push('/bonus-setting')
          break
      }
    },
    close () {
      this.hidenDialog()
    },
    currentChange (pageNo) {
      this.$emit('currentChange', pageNo)
    },
    sizeChange (size) {
      this.$emit('sizeChange', size)
    }
  }
}
</script>
