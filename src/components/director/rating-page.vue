<style lang="less">
  .container {
    .personal-information {
      height: 130px;
      background: #fff;
      display: flex;
      border:1px solid #e0e0e0;
      .information-part {
        display: inline-block;
        width: 70%;
        height:100%;
        position: relative;
        .personal-avatar{
          position: absolute;
          left:30px;
          top:50%;
          transform:translateY(-50%);
          width:80px;
          height:80px;
          border-radius: 50%;
        }
        .message-part{
          position:absolute;
          top:50%;
          transform:translateY(-50%);
          left:120px;
          .message-item{
            font-size: 12px;
            color:#a8a097;
            .message-detail{
              color:#000;
              margin-left:20px;
            }
          }
          .second-line{
            margin-top:12px;
          }
        }
        .separate-line{
          position:absolute;
          top:50%;
          right:0;
          transform:translateY(-50%);
          width:0;
          height:70%;
          border-right:1px solid #a8a097;
        }
      }
      .ratings-part{
        display: flex;
        width:30%;
        height:100%;
        align-items: center;
        margin-left:50px;
        .message-title{
          font-size:16px;
          color:#5a5a5a;
        }
        .message-content{
          font-size: 12px;
          color:#b1817b;
          margin:6px 0;
        }
        .check-detail{
          font-size: 12px;
          color:#8a66e6;
        }
      }
    }
    .table-content{
      margin:15px 15px 0 15px;
      .table-desc{
        border:1px solid #e0e0e0;
        height:50px;
        .table-title{
          display:inline-block;
          height:100%;
          font-size: 14px;
          font-weight: bold;
          line-height: 50px;
          margin: 0 20px;
        }
        .table-score{
          display: inline-block;
          height:100%;
          font-size: 12px;
          color:#818181;
          margin-left:10px;
          .score-percent{
            color:#1585ff;
          }
          .item-score{
            color:#f70001;
          }
        }
      }
      .columns-desc{
        display: inline-block;
        margin:15px 0 0 20px;
        color:#818181;
      }
      .data-add-button{
        height: 50px;
        border: 1px solid @borderColor;
        border-top: none;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn-container{
          width:400px;
          height:34px;
          border:1px dashed @borderColor;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
      }
    }
    .table-content~.el-row{
      margin:20px 0 5px 20px;
      .el-button{
        padding:8px 16px;
        span{
          display: inline-block;
          width:56px;
        }
        &.cancel{
          background: #d7d7d7;
        }
        &.save{
          margin-left:80px;
        }
      }
    }
  }
</style>
<template>
  <div class="container">
    <crumbs @callback="getData" class="top-nav"></crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="personal-information">
          <div class="information-part">
            <img src="../com/user-avatar.png" alt="" class="personal-avatar">
            <div class="message-part">
              <p class="message-item">被考核人 <span class="message-detail">1赵坚强</span></p>
              <p class="message-item second-line">职位级别 <span class="message-detail">高级产品经理</span><span
                class="message-detail">M7</span></p>
            </div>
            <span class="separate-line"></span>
          </div>
          <div class="ratings-part">
            <div class="is-rating">
              <p class="message-title">考核评分中</p>
              <p class="message-content">所有评分项完成后才能显示最终绩效评分</p>
              <p class="check-detail">查看绩效详情&gt;</p>
            </div>
          </div>
        </div>
        <div class="table-content">
          <div class="table-desc">
            <span class="table-title">综合评分</span>
            <span class="table-score">权重：<span class="score-percent">40%</span></span>
            <span class="table-score">统计得分：<span class="item-score">95</span></span>
          </div>
          <p class="columns-desc">评分项：共3项</p>
          <inviteTable class="table-show"></inviteTable>
        </div>
        <div class="table-content">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <div class="table-desc">
                  <span class="table-title">项目评分</span>
                  <span class="table-score">权重：<span class="score-percent">50%</span></span>
                  <span class="table-score">统计得分：<span class="item-score">97</span></span>
                </div>
              </template>
              <ratingTable :tableData="tableData"></ratingTable>
              <ratingTable :tableData="tableData"></ratingTable>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="table-content">
          <div class="table-desc">
            <span class="table-title">技术创新</span>
            <span class="table-score">权重：<span class="score-percent">加分项</span></span>
            <span class="table-score">统计得分：<span class="item-score">-</span></span>
          </div>
          <ratingTable :tableData="tableData"></ratingTable>
          <div class="data-add-button">
            <div class="btn-container"><i class="iconfont icon-add"></i>添加</div>
          </div>
        </div>
        <el-row>
          <el-button type="primary">提交审核</el-button>
          <el-button type="primary" class="save">保存</el-button>
          <el-button class="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
//  面包屑组件
import crumbs from '@/components/com/crumbs-com'
import inviteTable from '@/components/com/invite-score-table'
import ratingTable from '@/components/com/project-rating-table-show'

export default {
  data () {
    return {
      tableData: {
        tableTitle: ['考核事项', '子权重', '考核评价', '具体评分'],
        data: [{
          '考核事项': '完成质量',
          '子权重': '50%',
          '考核评价': '未评分',
          '具体评分': '未评分'
        }, {
          '考核事项': '完成质量',
          '子权重': '50%',
          '考核评价': '未评分',
          '具体评分': '未评分'
        }]
      }
    }
  },
  components: {
    crumbs: crumbs,
    inviteTable: inviteTable,
    ratingTable: ratingTable
  },
  computed: {
    quarterId () {
      return this.$store.state.common.quarterId
    }
  },
  methods: {
    getData () {
      this.$http({
        url: 'score/staff',
        data: {
          quarterId: this.quarterId,
          staffId: 'ed1805ef345143d78446fefb5f9f9bd9'
        }
      }).then(data => {
        console.log('staff:', data)
      })
    }
  },
  mounted () {
    this.$http({
      url: 'score/rules'
    }).then(data => {
      console.log('rules:', data)
    })
  }
}
</script>
