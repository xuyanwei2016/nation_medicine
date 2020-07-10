<template>
  <!--课程管理-->
  <div class="resContent">
    <div class="conRight">
      <div class="title">
        <h1>课程管理</h1>
        <ul>
          <li @click="$router.push('/addLesson')"><img src="../../assets/images/resources/ico-jia.png" width="14" alt="">添加课程</li>
          <li @click="batchStatus"><img src="../../assets/images/resources/ico-shen.png" width="12" alt="">提交审核</li>
          <li @click="batchDel"><img src="../../assets/images/resources/ico-shan.png" width="11" alt="">批量删除</li>
        </ul>
      </div>
      <div class="list">
        <div class="first">
          <ul class="change">
            <li v-for="(item,index) in change" :key="index" :class="listQuery.status==item.code?'curCss':''" @click="changeType(item)">{{item.name}}</li>
          </ul>
          <div class="search">
            <input type="text" placeholder="输入搜索内容" v-model="listQuery.name">
            <h1 @click="searchBtn">搜索</h1>
          </div>
        </div>

        <el-table ref="multipleTable" :data="list" v-loading="dataLoading" element-loading-text="给我一点时间" highlight-current-row stripe @selection-change="chioceList" style="width: 926px;margin: 0 auto" >
          <!--<el-table-column type="index" align="center" label="" width="60px"></el-table-column>-->
          <el-table-column type="selection" align="center" width="50px"></el-table-column>

          <el-table-column label="课程名称" align="center" width="240px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="lessonName">
                <div class="cover">
                  <img :src="fileUrl(scope.row.img)" alt="" v-if="scope.row.img">
                  <img src="../../assets/images/resources/pic-3.png" alt="" v-else>
                </div>
                <h1>{{scope.row.name}}</h1></span>

            </template>
          </el-table-column>
          <!--<el-table-column label="上传时间" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="上传时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新课时数" align="center" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.consumeHour}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <div class="status">
                <h1 v-if="scope.row.status==2||scope.row.status==4||scope.row.status==5">审核通过</h1><h2 v-if="scope.row.status==3">审核未通过</h2><h3 v-if="scope.row.status==1">审核中</h3><h4 v-if="scope.row.status==0">未提交</h4>
              </div>

            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope" >
              <div class="operation">
                <i @click="$router.push({path:'/addLesson',query:{lookId:scope.row.id}})">查看</i><i v-if="scope.row.status==0||scope.row.status==3" @click="deleteOne(scope.row)">删除</i><i v-if="scope.row.status==3||scope.row.status==0" @click="$router.push({path:'/addLesson',query:{editId:scope.row.id}})">编辑</i><i v-if="scope.row.status==0||scope.row.status==2||scope.row.status==3" @click="$router.push({path:'/addContList',query:{id:scope.row.id}})">关联</i>
              </div>
            </template>
          </el-table-column>
        </el-table>


      </div>
    </div>
    <div class="pagination_box"  v-if="list.length>0">
      <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        layout="prev, pager, next, total, jumper"
        :total="total">
      </el-pagination> -->
    </div>
    <!--审核提示框-->
    <div class="okAlert" v-if="isAlert">
      <div class="okCont">
        <div class="okTit">
          <h1>提示</h1>
          <i class="el-icon-close"  @click="isAlert=false"></i>
        </div>
        <h2>操作成功！</h2>
        <button @click="isAlert=false">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../../static/css/addCont.css';
  import {getLessonListAPI,delLessonAPI,updateLessonStatusAPI} from '../../api/resources';
  import { getMultipleSelectionIDs } from '../../filter/getIds'
  import { confirm } from '../../utils/publicFunction'
  export default {
    data () {
      return {
        change:[{name:'全部',code:null,},
          {name:'审核通过',code:2,},
          {name:'未提交',code:0,},
          {name:'审核中',code:1,},
          {name:'审核未通过',code:3,}],
        dataLoading:false,
        curChange:0,
        listQuery:{
          pageNum:1,
          pageSize:10,
          status:null,
        },
        tableKey:0,
        lastPage:0,
        list:[],
        batchList:[],
        isAlert:false,
      }
    },
    components: {},
    created(){
      this.getList();
    },
    methods: {
      /*status
状态：0:未提交 1：待审核 2：审核通过 3：审核不通过 4：已上架 5：已下架*/
      getList(){
        getLessonListAPI(this.listQuery).then(res=>{
          this.list=res.data.data.list;
          this.lastPage=res.data.data.pages;
          this.dataLoading=false;
        })
      },
      searchBtn(){
        if(this.listQuery.name.trim()){
          this.listQuery.pageNum=1;
          this.listQuery.pageSize=10;
        }else{
          this.listQuery.pageNum=1;
          this.listQuery.pageSize=10;
          this.listQuery.name=null;
        }
        this.getList();
      },
      pageChange(val) {
        this.dataLoading=true;
        console.log('切换page')
        this.listQuery.pageNum = val;
        this.getList();
        /*window.scrollTo(0, 0)*/
      },
      changeType(item){
        this.dataLoading=true;
        this.listQuery.status=item.code;
        this.listQuery.pageNum=1;
        this.listQuery.pageSize=10;
        this.getList();

      },
      batchDel(){
        if(this.batchList.length == 0){
          this.$message.error('请选择至少一条记录进行操作')
        } else {
          const dataType = this.batchList.every(data => data.status == 0||data.status == 3);
          console.log(222,dataType)
          if (dataType) {
            const ids = getMultipleSelectionIDs(this.batchList);
            confirm.apply(this, ['确认删除吗？']).then(() => {
              delLessonAPI(JSON.stringify(ids)).then(res => {
                this.$message.success('删除成功');
                this.getList()
              })
            })
          } else {
            this.$message.error('审核中或审核通过状态下数据不能删除，请重新选择')
          }
        }
      },
      /*单条删除*/
      deleteOne(item){
        let ids=[item.id];
        confirm.apply(this, ['确认删除吗？']).then(() => {
          delLessonAPI(JSON.stringify(ids)).then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
      },
      batchStatus(){
        if(this.batchList.length == 0){
          this.$message.error('请选择至少一条记录进行操作')
        } else {
          const dataType = this.batchList.every(data => data.status == 0);
          if (dataType) {
            const ids = getMultipleSelectionIDs(this.batchList);
            updateLessonStatusAPI(JSON.stringify(ids)).then(res => {
              this.isAlert=true;
              this.getList()
            })
          } else {
            this.$message.error('审核中或审核通过状态下数据不能审核，请重新选择')
          }
        }
      },
      oneStatus(item){
        updateLessonStatusAPI(JSON.stringify([item.id])).then(res => {
          this.isAlert=true;
          this.getList()
        })
      },

      chioceList(val) {
        this.batchList = val;
      },
    }
  }
</script>

<style scoped lang="less">
  ul,li,h1,h2,h3,h4{
    padding: 0;
    margin: 0;
  }
  .resContent {
    .conRight {
      width: 980px;
      float: right;
      .title {
        padding: 0 28px;
        height: 60px;
        display: flex;
        align-items: center;
        background: #fff;
        justify-content: space-between;
        h1{
          color: #333333;
          font-size: 20px;
          font-weight: normal;
        }
        ul{
          display: flex;
          justify-content: flex-end;
          li{
            margin-left: 10px;
            width: 94px;
            height: 30px;
            line-height: 16px;
            background: #4692FB;
            color: #fff;
            font-size:14px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
            cursor: pointer;
            img{padding-right: 3px;}
          }
        }
      }
      .list{
        min-height: 840px;
        padding: 0 28px;
        background: #fff;
        margin-top: 8px;
        .first{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .change{
            width: 50%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            color: #333333;
            li{
              padding: 28px 5px 0 5px;
              margin-right: 15px;
              margin-bottom: 22px;
              font-weight: 500;
              cursor: pointer;
            }
            .curCss{
              color: #4692FB;
              padding-bottom: 14px;
              border-bottom: 2px solid #4692FB;
              border-radius: 1px;
            }
          }
          .search{
            display: flex;
            justify-content: flex-start;
            input{width: 178px;height: 30px;line-height:30px;border: 1px solid #EEEEEE;border-radius: 3px 0px 0px 3px;margin: 0;padding:0 0 0 12px}
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
              color: #CCCCCC!important;
            }
            input:-moz-placeholder, textarea:-moz-placeholder {
              color: #CCCCCC!important;
            }
            input::-moz-placeholder, textarea::-moz-placeholder {
              color: #CCCCCC!important;
            }
            input:-ms-input-placeholder, textarea:-ms-input-placeholder {
              color: #CCCCCC!important;
            }
            h1{width: 60px;height: 32px; background: #FD843C;border-radius: 0 3px 3px 0;color: #fff;font-size: 14px;display: inline-block;text-align: center;line-height: 32px;font-weight: normal;cursor: pointer}
          }
        }

        .operation{
          color: #4692FB;
          display: flex;
          justify-content: center;
          i{font-style: normal;cursor: pointer;padding: 0 6px; }
        }
        .status{
           h1,h2,h3,h4{font-size: 14px;
             font-weight: normal;padding: 0 10px; }
           h1{
             color: #1CB20D;
           }
           h2{
             color: #D62C2C;
           }
           h3{
             color: #F77F0A;
           }
           h4{
             color: #999999;
           }
         }
        .lessonName{
          display: flex;
          justify-content: space-between;
          width: 220px;


          .cover{
            width: 100px;
            height: 75px;
            /*padding-right: 10px;*/
            img{width: 100px;height:75px;position: relative;}
          }
          h1{
            width: 110px;
            line-height: 75px;
            font-size: 14px;
            font-weight: normal;
            color: #333333;
            overflow: hidden;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
          }
        }
        .lessonName .cover:before{
          content: '';
          position: absolute;
          left: 11px;
          top:12px;
          width: 100px;height:75px;
          z-index: 11111;
          background: url("../../assets/images/medical/play_icon.png") no-repeat center center;
        }



      }
    }
    .noHave{
      line-height: 60px;
      width: 100%;
      color: #909399;
      text-align: center;
    }

  }
</style>
