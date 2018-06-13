<style lang="less" scoped>
.table-part-container {
  background: @bgColor;
  .project-information,
  .project-member {
    background: #fff;
    overflow: hidden;
    &.project-member {
      margin-top: 10px;
    }
    .title-part {
      height: 50px;
      font-size: 16px;
      font-weight: bold;
      padding-left: 20px;
      line-height: 50px;
      border-bottom: 1px solid @borderColor;
    }
    .content-part {
      margin: 10px;
      .infor-line {
        margin: 25px 20px;
        display: flex;
        justify-content: flex-start;
        .infor-item {
          flex: 0 1 25%;
          color: @subtitleColor;
          .infor-detail {
            margin-left: 10px;
            color: #000;
          }
          .infor-progress {
            color: @linkColor;
            display: inline-block;
            .inline-el {
              display: inline-block;
              width: 130px;
            }
          }
        }
      }
      .infor-single-item {
        margin: 25px 20px;
        color: @subtitleColor;
        .infor-detail {
          color: #000;
        }
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <crumbs class="top-nav"></crumbs>
    <div class="sub-container">
      <div class="table-part-container">
        <div class="project-information">
          <div class="title-part">项目基本信息</div>
          <div class="content-part">
            <div class="infor-line">
              <span class="infor-item">项目名称：
                <span class="infor-detail">ERP系统重构</span>
              </span>
              <span class="infor-item">项目级别：
                <span class="infor-detail">A级</span>
              </span>
              <span class="infor-item">项目周期：
                <span class="infor-detail">2018.01.01-2018.07.31</span>
              </span>
              <div class="infor-item">项目进度：
                <div class="infor-progress">进行中：
                  <el-progress :percentage="70" class="inline-el"></el-progress>
                </div>
              </div>
            </div>
            <div class="infor-line">
              <span class="infor-item">项目负责人：
                <span class="infor-detail">陈大力</span>
              </span>
              <span class="infor-item">评分状态：
                <span class="infor-detail">评分中</span>
              </span>
            </div>
            <p class="infor-single-item">项目目标：
              <span class="infor-detail">项目介绍，高端大气上档次，深度沉稳有内涵，做过路过不要错过，你值得拥有！只要998，998你买不了吃亏买不了上当，买来的只有实惠，只有优惠，赶快拿起手中的电话订购吧！</span>
            </p>
            <p class="infor-single-item">项目简介：
              <span class="infor-detail">项目介绍，高端大气上档次，深度沉稳有内涵，做过路过不要错过，你值得拥有！只要998，998你买不了吃亏买不了上当，买来的只有实惠，只有优惠，赶快拿起手中的电话订购吧！</span>
            </p>
          </div>
        </div>
        <div class="project-member">
          <div class="title-part">项目成员</div>
          <div class="content-part">
            <ratingsTable :tableData="tableData" :isOperateable="false"></ratingsTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crumbs from '@/components/com/crumbs-com'
import ratingsTable from '@/components/com/ratings-table'

export default {
  data () {
    return {
      tableData: {
        tableTitle: [
          '工号',
          '姓名',
          '项目角色',
          '负责内容',
          '参与时间',
          '直属领导',
          '联系方式',
          '考核状态'
        ],
        data: [
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '90'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '91'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '92'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '93'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '94'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '95'
          },
          {
            工号: 'K4008098',
            姓名: '李强',
            项目角色: '项目负责人',
            负责内容: '统筹项目',
            参与时间: '2018.03.01-至今',
            直属领导: '王阳明',
            联系方式: '12345623423',
            考核状态: '未评分'
          }
        ],
        operateArr: ['详情'],
        sortArr: ['考核状态']
      }
    }
  },
  components: {
    crumbs: crumbs,
    ratingsTable: ratingsTable
  }
}
</script>
