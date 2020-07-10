<template>
  <!--添加内容列表d-->
  <div class="resContent">
    <div class="conRight">
      <div class="title">
        <h1>添加内容</h1>

      </div>
      <div class="list">

        <div class="first">
          <ul class="buttons">
            <li @click="isShow=true"><img src="../../assets/images/resources/ico-guan.png" width="14" alt="">关联内容</li>
            <li @click="cancelBind"><img src="../../assets/images/resources/ico-qu.png" width="12" alt="">批量取消</li>
          </ul>
          <div class="search">
            <input type="text" placeholder="输入搜索内容" v-model="listQuery.name">
            <h1 @click="searchBtn">搜索</h1>
          </div>
        </div>


        <el-table row-key="id" ref="multipleTable" :key='tableKey' :data="dataList" v-loading="dataLoading" element-loading-text="给我一点时间" highlight-current-row stripe @selection-change="chioceList" style="width: 926px;margin: 0 auto" >
          <el-table-column type="index" align="center" label="" width="60px"></el-table-column>
          <el-table-column type="selection" align="center"></el-table-column>

          <el-table-column label="资源名称" align="center" width="250px">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>视频</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template slot-scope="scope">
              <!--<span  class="Free">免费</span>-->
              <span  class="price">{{scope.row.realPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div class="status">
                <h1 v-if="scope.row.status==2||scope.row.status==4||scope.row.status==5">审核通过</h1><h2 v-if="scope.row.status==3">审核未通过</h2><h3 v-if="scope.row.status==1">审核中</h3><h4 v-if="scope.row.status==0">未提交</h4>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <i class="el-icon-sort"></i>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <div class="pagination_box" v-if="dataList.length>0">
      <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        layout="prev, pager, next, total, jumper"
        :total="total">
      </el-pagination> -->
    </div>


    <!--弹出框-->
    <div class="prop" v-if="isShow">
      <div class="propCont">
        <div class="propTit"><h1>关联资源</h1><i class="el-icon-close" @click="isShow=false"></i></div>
        <div class="propSearch">
          <!--<el-select v-model="canQuery.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.enkey"
              :label="item.cnkey"
              :value="item.enkey">
            </el-option>
          </el-select>-->
          <div class="right"><input type="text" placeholder="请输入资源名称" v-model="canQuery.name"><button @click="canSearch">保存</button></div>
        </div>
        <el-table id="getHeight"  ref="multipleTable" :key='tableKey' :data="canList" v-loading="listLoading" element-loading-text="给我一点时间" highlight-current-row stripe @selection-change="checkoutList" style="width: 840px;margin: 0 auto">
          <el-table-column type="index" align="center" label="" width="60"></el-table-column>
          <el-table-column type="selection" align="center"></el-table-column>

          <el-table-column label="资源名称" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <!-- <span class="two-line-word" :title="scope.row.name">{{scope.row.name}}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="上传时间"  align="center" width="200px">
            <template slot-scope="scope">
              <span>{{scope.row.uploadTime}}</span>
              <!-- <span class="two-line-word" :title="scope.row.name">{{scope.row.name}}</span> -->
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120px" align="center">
            <template slot-scope="scope">
              <div class="status">
                <h1 v-if="scope.row.status==2||scope.row.status==4">{{scope.row.status==2?'审核通过':'已上架'}}</h1><h2 v-if="scope.row.status==3">审核未通过</h2><h3 v-if="scope.row.status==1">审核中</h3><h4 v-if="scope.row.status==5||scope.row.status==0">{{scope.row.status==0?'未提交':'已下架'}}</h4>
              </div>
              <!-- <span class="two-line-word" :title="scope.row.name">{{scope.row.name}}</span> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination_box" v-if="canList.length>0">
      <pagination @change="pageCanChange" :current-page="canQuery.pageNum" :page-size="canQuery.pageSize" :total-page="lastCanPage"></pagination>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        layout="prev, pager, next, total, jumper"
        :total="total">
      </el-pagination> -->
    </div>
        <div slot="footer" class="dialog-footer"  v-if="canList.length>0">
          <el-button style="background: #F44B4A;color: #fff" @click="dataSubmit">保存</el-button>
          <el-button  @click="isShow=false">取消</el-button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import {getBindingAPI,canBindingAPI,getTypeListAPI,bindingAPI,cancelBindingAPI,modifySortAPI} from '../../api/resources';
  import { getMultipleSelectionIDs } from '../../filter/getIds'
  import "../../../static/css/addCont.css";
  export default {
    data () {
      return {
        isShow:false,
        options: [],
        value: '',
        change: [{name: '全部', code: 0,},
          {name: '审核通过', code: 1,},
          {name: '未提交', code: 2,},
          {name: '审核中', code: 3,},
          {name: '审核未通过', code: 4,}],
        curChange: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        canQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        canBatchList:[],
        lastPage: 0,
        lastCanPage: 0,
        tableKey: 0,
        dataList:[{name:'此处为内容标题药材',id:1,video:'视频',price:'30.3',status:1}],
        dataLoading:false,
        listLoading:false,
        list:[],
        batchList:[],
        canList:[],
      }
    },
    watch:{
      isShow(n,o){
        if(!n){
          this.canQuery.name='';
          this.canQuery.pageNum=1;
          this.canQuery.pageSize=10;
          this.canBatchList=[];
        }
      },
    },
    components: {Sortable},
    created(){
      this.listQuery.courseId=this.$route.query.id;
      this.getList();
      /*this.getTypeList();*/
    },
    methods: {
      getList(){
        getBindingAPI(this.listQuery).then(res=>{
          this.dataList=res.data.data.list;
          this.lastPage=res.data.data.pages;
          this.$nextTick(() => {
            this.setSort()
          })
          this.canBinding();
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
          this.listQuery.courseId=this.$route.query.id;
        }
        this.getList();
      },

      pageChange (val) {
        console.log('切换page')
        this.listQuery.pageNum = val;
        this.getList();
        /*window.scrollTo(0, 0)*/
      },
      /*可以关联*/
      canBinding(){
        this.canQuery.courseId=this.$route.query.id;
        canBindingAPI(this.canQuery).then(res=>{
          this.canList=res.data.data.list;
          this.lastCanPage=res.data.data.pages;
        })
      },
      /*弹出框搜索*/
      canSearch(){
        if(this.canQuery.name.trim()){
          this.canQuery.pageNum=1;
          this.canQuery.pageSize=10;
        }else{
          this.canQuery={
            pageNum:1,
            pageSize:10
          };
        }
        this.getList();
        /*this.canBinding();*/
      },

      pageCanChange (val) {
        console.log('切换page')
        this.canQuery.pageNum = val;
        this.canBinding();
        /*window.scrollTo(0, 0)*/
      },

      checkoutList(val){
        this.canBatchList=val;
      },


      getTypeList(){
        getTypeListAPI({
          code:'YDCCRESOURCETYPE',
          pageSize:100,
          pageNum:1,
        }).then(res=>{
          this.options=res.data.data.list;
        })
      },


      /*弹出框*/
      chioceList(val) {
        this.batchList = val;
      },
      dataSubmit(){
        if(this.canBatchList.length==0){
          this.$message.error('请选择至少一条记录进行操作');
          return
        }
        const ids = getMultipleSelectionIDs(this.canBatchList);
        bindingAPI({
          courseId: this.$route.query.id,
          ids: ids
        }).then(res=>{
          console.log('绑定资源',res)
          this.isShow=false;
          this.getList();
          /*this.canBinding();*/
        })
      },
      /*批量取消*/
      cancelBind(){
        if(this.batchList.length==0){
          this.$message.error('请选择至少一条记录进行操作');
          return
        }
        const ids = getMultipleSelectionIDs(this.batchList);
        cancelBindingAPI({
          courseId: this.$route.query.id,
          ids: ids
        }).then(res=>{
          if(res.data.status){
            this.$message.success('取消成功');
            this.getList();
          }else{
            this.$message.error(res.data.msg);
          }

        })
      },
      /*修改排序*/
     setSort(){
       const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
       let self = this;
       Sortable.create(el, {
// 拖拽结束后的操作
         onEnd({ newIndex, oldIndex }) {
// 修改data中的数组，

           const targetRow = self.dataList.splice(oldIndex, 1)[0];
           self.dataList.splice(newIndex, 0, targetRow);
           console.log('序号',newIndex, oldIndex,targetRow)
           modifySortAPI({
             id:targetRow.rowId,
             sort: newIndex
           }).then(res=>{
             if(res.data.status){
               this.getList();
             }
           })
         }
       });

     },





    }
  }
</script>

<style scoped lang="less">
  ul, li, h1, h2, h3, h4 {
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
        h1 {
          color: #333333;
          font-size: 20px;
          font-weight: normal;
        }

      }
      .buttons {
        display: flex;
        justify-content: flex-end;
        li {
          margin-left: 10px;
          width: 94px;
          height: 30px;
          line-height: 16px;
          background: #4692FB;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          cursor: pointer;
          img {
            padding-right: 3px;
          }
        }
      }
      .list {
        min-height: 840px;
        padding: 18px 28px 0 28px;
        background: #fff;
        margin-top: 8px;
        .first {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          .change {
            width: 50%;
            padding: 0;
            margin: 0;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            color: #333333;
            li {
              padding: 28px 5px 0 5px;
              margin-right: 15px;
              margin-bottom: 22px;
              font-weight: 500;
              cursor: pointer;
            }
            .curCss {
              color: #4692FB;
              padding-bottom: 14px;
              border-bottom: 2px solid #4692FB;
              border-radius: 1px;
            }
          }
          .search {
            display: flex;
            justify-content: flex-start;
            input {
              width: 178px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #EEEEEE;
              border-radius: 3px 0px 0px 3px;
              margin: 0;
              padding: 0 0 0 12px
            }
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
              color: #CCCCCC !important;
            }
            input:-moz-placeholder, textarea:-moz-placeholder {
              color: #CCCCCC !important;
            }
            input::-moz-placeholder, textarea::-moz-placeholder {
              color: #CCCCCC !important;
            }
            input:-ms-input-placeholder, textarea:-ms-input-placeholder {
              color: #CCCCCC !important;
            }
            h1 {
              width: 60px;
              height: 32px;
              background: #FD843C;
              border-radius: 0 3px 3px 0;
              color: #fff;
              font-size: 14px;
              display: inline-block;
              text-align: center;
              line-height: 32px;
              font-weight: normal;
              cursor: pointer
            }
          }
        }


        .el-icon-sort{font-weight: bold;color: #666666;cursor: pointer}
        .price{color: #F77F0A}
        .Free{color: #1CB20D}

      }
    }

    .prop{
      width: 100%;
      height: 100%;
      content: '';
      position: fixed;
      background: rgba(0,0,0,0.2);
      top: 0;
      left: 0;
      z-index: 11;
      display: flex;
      justify-content: center;
      align-items: center;
      .propCont{
        width: 900px;
        background: #fff;
        padding-bottom: 40px;
        .propTit{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          height: 36px;
          background: #F4F4F4;
          h1{font-size: 14px; color: #454545}
          i{ color: #AAAAAA; font-size: 14px;cursor: pointer}
        }
        .propSearch{
          margin:24px 30px;
          display: flex;
          justify-content: flex-start;
          .right{width: 290px; display: flex;justify-content: space-between;
          input{width: 209px;height: 30px; line-height: 30px; border-radius: 3px;border:1px solid  #DCDFE6; margin: 0;
            padding:0 0 0 11px;}
            button{width: 60px; border-radius: 3px;height: 32px; color: #fff; background: #6FA4FD;text-align: center;line-height: 32px;border: none}
          }
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: #CCCCCC !important;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
          color: #CCCCCC !important;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
          color: #CCCCCC !important;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: #CCCCCC !important;
        }
      }
      .dialog-footer{ text-align: center;}
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

  }
</style>
