<!-- 季度奖金页面 -->
<style lang='less' scoped>
  .wrap {
    min-height: 100%;
    background-color: @backGroundColor;
  }

  .prl {
    margin-top: 20px;
  }
</style>
<template>
  <div class='wrap'>
    <!-- 面包屑组件 -->
    <Crumbs :showQuarter="false"></Crumbs>
    <!-- 季度奖金搜索组件 -->
    <div class="quarter-search prl">
      <!--<ReviewQuarterSearch>-->
      <!--<span slot='bonus-input'> </span>-->
      <!--<span slot="bonus-search-btn"></span>-->
      <!--</ReviewQuarterSearch>-->
      <!-- <ReviewQuarter></ReviewQuarter> -->
      <QuarterTable :isShow="false" :columnTitle="columnTitle" :data="list"></QuarterTable>

    </div>
  </div>
</template>

<script>
import ReviewQuarter from '@/components/com/review-quarterly-table'
import Crumbs from '@/components/com/crumbs-com'
import ReviewQuarterSearch from '@/components/com/review-quarterly-search'
import QuarterTable from '@/components/com/attendance-table'

export default {
  components: {ReviewQuarter, Crumbs, ReviewQuarterSearch, QuarterTable},
  data () {
    return {
      columnTitle: [
        {
          title: '序号',
          type: 'index',
          width: '50'
        },
        {
          title: '考核季度',
          row: 'name'
        }, {
          title: '季度奖金(万元)',
          row: 'bonusAmount'
        }, {
          title: '考核人数',
          row: 'staffNumber'
        }, {
          title: '操作',
          type: 'operation',
          callback: {
            '编辑': (row) => {
              this.$store.dispatch('setQuarterId', row.id)
              this.$router.push('/bonus-setting')
            }
          },
          width: 100
        }
      ],
      list: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('/basic/quarter-info').then(rs => {
        this.list = rs
      })
    }
  }
}
</script>
