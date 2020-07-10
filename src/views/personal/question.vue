<template>
  <div>
    <div class="question_title">在线提问</div>
      <div class="question_info">
        <div class="question_list" v-for="item in list" :key="item.id" >
          <div class="flex-between" v-if="list.length > 0">
            <router-link :to="{path: '/answer', query: {id: item.id}}" >
              <div class="question_name">{{item.title.length > 30 ? item.title.substring(0,15)+'...' : item.title}}</div>
            </router-link>
            <div class="question_time">{{item.createTime.slice(0,item.createTime.length - 3)}}</div>
          </div>
          <div class="question_answer" v-html="item.replyContent"></div>
        </div>
        <div class="noHave" v-if="list.length == 0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
        
      
      </div>

      <div class="pagination_box" v-if="list.length > 0">
        <div class="pagination_wrap">
          <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
          <!-- <el-pagination  :page-size="listQuery.pageSize" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :firstPage='firstPage' :lastPage='lastPage'  layout="prev, pager, next, total, jumper, slot" :total="total"> -->
              <!-- <el-button :disabled="listQuery.pageNum === firstPage" class="first-pager" @click="toFirstPage" >|&lt;</el-button>
              <el-button :disabled="listQuery.pageNum === lastPage" class="last-pager" @click="toLastPage" >|&gt;</el-button> -->
          <!-- <div class="pagination_first">|&lt;</div> -->
          
          <!-- <div class="pagination_end">|&gt;</div> -->

          <!-- </el-pagination> -->
          <!-- <el-pagination  :page-size="listQuery.pageSize" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :firstPage='firstPage' :lastPage='lastPage'  layout="prev, total, slot" :total="total">
              <el-button :disabled="listQuery.pageNum === firstPage" class="first-pager" @click="toFirstPage" >|&lt;</el-button>
          </el-pagination>
          <el-pagination  :page-size="listQuery.pageSize" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :firstPage='firstPage' :lastPage='lastPage'  layout="pager, next, slot, jumper" :total="total">
            <el-button :disabled="listQuery.pageNum === lastPage" class="last-pager" @click="toLastPage" >|&gt;</el-button>
          </el-pagination> -->
        </div>
      </div>
      
  </div>
</template>

<script>
import "@static/css/personal/question.less";
import "@static/css/common.less";
import { getListAPI } from '@/api/personal/question'

export default {
  name: 'bookshelf',
  data(){
    return {
      status:null,
      activeName:'first',
      content:null,
      list: [],
      total: null,
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      firstPage: null,
      lastPage: null,
      lastPage:0,
    }
  },
  created(){
    console.log(111);
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList() {
      getListAPI(this.listQuery).then(res => {
        console.log(res,"在线提问");
        if(res.data.code === 0) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
        }

      })
    },
    handleClick(tab, event) {
      console.log(tab.index);
      console.log(this.activeName);
    },
    // 分页
        pageChange(val) {
            console.log('切换page')
            this.listQuery.pageNum = val
            this.getList();
            window.scrollTo(0, 0)
        },
    // handleCurrentChange(val) {
    //     this.listQuery.pageNum = val
    //     this.getList()
    //     window.scrollTo(0, 0)
    // },
    // // 首页
    // toFirstPage(val) {
    //   this.listQuery.pageNum = this.firstPage;
    //   this.handleCurrentChange(this.firstPage)
    // },
    // // 末页
    // toLastPage(val) {
    //   this.listQuery.pageNum = this.lastPage;
    //   this.handleCurrentChange(this.lastPage);
    // }
  }
}
</script>
<style lang="less" scoped="">
  .question_info{
    .noHave{ height: 860px; background: #fff; display: flex; justify-content: center; align-items: center}
    .flex-between{
      display: flex;
      justify-content: space-between;
    }
    .question_time{
      color: #A9A8A9;
      font-size: 12px
    }
  }
</style>
