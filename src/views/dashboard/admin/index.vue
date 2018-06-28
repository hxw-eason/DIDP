<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-col>
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <img src="../../../assets/logo.png" class="user-avator" alt="">
                  <div class="user-info-cont">
                      <div class="user-info-name">admin</div>
                  </div>
              </div>
              <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
              <div class="user-info-list">上次登录地点：<span>广州</span></div>
            </el-card>
            <el-card shadow="hover">
              <div slot="header" class="clearfix">
                  <span>用户信息</span>
              </div>
              广州
              <el-progress :percentage="57.2" color="#42b983"></el-progress>
              深圳
              <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
              北京
              <el-progress :percentage="11.9"></el-progress>
              上海
              <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-view grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">1234</div>
                            <div>用户访问量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-message grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">321</div>
                            <div>系统消息</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">5000</div>
                            <div>数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 10}" :lg="{span: 6}" :xl="{span: 3}" style="margin-bottom:30px;">
        <todo-list></todo-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'dashboard-admin',
  components: {
    TodoList
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .el-row {
    margin-bottom: 20px;
    .user-info {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
      .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
      }
    }
    .user-info-list {
      font-size: 14px;
      color: #999;
      line-height: 25px;
      span {
        margin-left: 70px;
      }
    }
    .mgb20 {
      margin-bottom: 20px;
    }
    .grid-content {
      display: flex;
      align-items: center;
      height: 100px;
    }
    .grid-con-1 {
      .grid-con-icon {
        background: rgb(45, 140, 240);
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
      }
      .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
        .grid-num {
          font-size: 30px;
          font-weight: bold;
          color: rgb(45, 140, 240);
        }
      }
    }
    .grid-con-2 {
      .grid-con-icon {
        background: rgb(100, 213, 114);
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
      }
      .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
        .grid-num {
          font-size: 30px;
          font-weight: bold;
          color: rgb(45, 140, 240);
        }
      }
    }
    .grid-con-3 {
      .grid-con-icon {
        background: rgb(242, 94, 67);
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
      }
      .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
        .grid-num {
          font-size: 30px;
          font-weight: bold;
          color: rgb(242, 94, 67);
        }
      }
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
