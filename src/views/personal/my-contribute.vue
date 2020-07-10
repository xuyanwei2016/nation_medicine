<template>
<div>
    <div class="contribute_title">我的贡献</div>
    <div class="contribute_info">
      <div class="contribute_wrap">
        <div class="noHave" v-if="list.length==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
        <div class="contribute_list" v-else v-for="item in list" :key="item.id">
          <router-link :to="{path: '/usoffer', query: {id: item.id}}">
            <div class="contribute_name">{{item.title}}</div>
          </router-link>
          <div class="contribute_words" >
            <span v-for="item in item.keyword" :key="item.id" >{{item}}</span>
          </div>
          <div class="contrubute_status">
            <!-- 已审核 -->
            <!-- <img v-if="item.status === 2" src="@/assets/images/personal-center/contribute-check.png" > -->
            <!-- 审核中 -->
            <img v-if="item.status === 0" src="@/assets/images/personal-center/contribute-checking.png">
            <!-- 已发布 -->
            <img v-if="item.status === 1" src="@/assets/images/personal-center/contribute-publish.png">
            <!-- 已驳回 -->
            <img v-if="item.status === 2" src="@/assets/images/personal-center/contribute-refuse.png">
          </div>
          <div class="contrubute_con" v-html="item.synopsis">{{item.synopsis?item.synopsis.length>150?item.synopsis.substring(0,150)+'...':item.synopsis:''}}</div>
          <div class="contribute_bot">
            <div class="contribute_times">{{item.uploadTime}}</div>
            <div class="contribute_del" v-if="item.status === 2" @click="contributeDel(item.id)">
              <img src="@/assets/images/personal/del_ico.png" style="float:left;margin-top:3px;">
              <div style="float:left;margin-left:3px;">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination_box" v-if="list.length>0">
        <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
        <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
      </div>
    </div>
</div>
</template>

<script>
import "@static/css/personal/my-contribute.less";
import { getListAPI , getdelAPI } from '@/api/personal/contribute'
import { operationMsg } from '@/utils/publicFunction'

export default {
  name: 'bookshelf',
  data(){
    return {
      status:null,
      activeName:'first',
      content:null,
      total: null,
      list: [],
      listQuery: {
        pageNum: 1,
        pageSize: 15
      },
      list: [],
      total: null,
      form: {
        delIds: []
      },
      lastPage:0,
      
    }
  },

  mounted() {
    this.getList()
  },
  methods:{
    // 获取列表
    getList() {
      getListAPI(this.listQuery).then(res => {
        console.log(res);
        if(res.data.code === 0) {
          this.list = res.data.data.list
          this.total = res.data.data.total;
          this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
          let arr = []
          let regex = /,|，|\\s+/; 
          res.data.data.list.map(node => {
            if(node.keywords == '' || node.keywords == null) {
              return 
            } else {
              arr = node.keywords.split(regex)
              return  node.keyword = arr;
            }
            
          })
        }
      })
    },
    // 已驳回文章删除
    contributeDel(id) {
      this.form.delIds.push(id)
      getdelAPI(this.form).then(res => {
        console.log(res,'vvvvvvvv');
        operationMsg.apply(this,[res.data.code,`删除`, res.data.msg])
        this.getList()
      })
    },
    handleClick(tab, event) {
      console.log(tab.index);
      console.log(this.activeName);
    },
    // handleCurrentChange(val) {
    //     this.listQuery.pageNum = val
    //     this.getList()
    // }
    // 分页
    pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val
        this.getList();
    },
  }
}
</script>
<style lang="less" scoped>
  .contribute_info{
    margin-bottom: 20px;
    min-height: 862px;
    .noHave{ height: 860px; background: #fff; display: flex; justify-content: center; align-items: center}
  }
</style>
