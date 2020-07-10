<template>
  <div class="epidemicRead epidemicLoad">
    <div class="medical_main">
      <epidemicNavbar></epidemicNavbar>
      <div class="medical_sub">
        <div class="sub_left">
          <div class="subleft_top">
            <div class="subline_left"></div>
            <div v-for="(itemT,indexT) in typeList" :KEY="indexT">
              <router-link :to="{name:$route.name,query:{type:itemT}}" >
                <div class="subline_leftMedical" :class="$route.query.type==itemT ? 'bgColor' : ''">{{itemT}}</div>
              </router-link>
            </div>

          </div>
        </div>
        <div class="sub_right">
          <div v-loading="loading">
          <ul class="messageList"  v-if="list && list.length > 0">
            <li v-for="(item,index) in list" :key="index"><span @click="toDetail(item)">{{item.title}}</span>
              <h1>{{item.releaseTime}}</h1></li>
          </ul>
            <div  v-if="!loading&&list.length==0" style="text-align: center;padding-top: 5px">
              <img src="../../assets/images/home/no-content.jpg" class="no_content">
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination_box" v-if="list && list.length > 0">
            <pagination @change="pageChange"
                        :current-page="listQuery.pageNum"
                        :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import epidemicNavbar from '../../components/epidemicNavbar.vue'
  import '@static/css/medical_information/index.less'
  import {medicalDetailsAPI} from '@/api/medical/medical'
  import {getInforAPI} from '../../api/epidemic'

  export default {
    name: 'HelloWorld',
    data: function () {
      return {
        index: null,
        listQuery: {
          pageNum: 1,
          pageSize: 17,
          name: this.$route.query.type || this.typeList[0],
        },
        list: [],
        lastPage: 0,
        typeList: ['中医抗疫纪实', '中医诊疗方案', '中医防护知识'],
        loading:true,
      }
    },
    components: {epidemicNavbar},
    created () {
      if (!this.$route.query.type) {
        this.listQuery.name = this.typeList[0]
      } else {
        this.index = 1
      }
      this.getList()
    },
    watch: {
      '$route.query.type' (n, o) {
        this.listQuery.name = n
        this.listQuery.pageNum = 1
        this.getList()
      },
    },
    methods: {
      getList () {
        this.loading=true;
        getInforAPI(this.listQuery).then(res => {
          if (res.data.status) {
            this.list = res.data.data.list;
            this.lastPage = res.data.data.lastPage;
          }
          this.loading=false;
        })
      },
      toDetail(item){
        let data=['中医抗疫纪实','中医诊疗方案','中医防护知识'];
        let index=data.findIndex((curI)=>{
          return  curI==item.name;
        });
        /*this.$router.push({path:'/epidemicRead',query:{id:item.id,pageType:index}});*/
        let routeUrl = this.$router.resolve({
          path: "/epidemicRead",
          query: {id:item.id,pageType:index}
        });
        window.open(routeUrl.href, '_blank');
      },
      // 分页
      pageChange (val) {
        this.listQuery.pageNum = val
        this.getList()
        /*window.scrollTo(0, 0)*/
      },
    },
    beforeRouteLeave (to, from, next) {
      from.meta.keepAlive = false
      next()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  /*ul, li, h1, h2, h3, h4, h5, p, span, div {
    margin: 0;
    padding: 0;
    list-style: none
  }*/
  .epidemicRead {
    width: 100%;
    min-width: 1200px;
    min-height: calc(100vh - 422px);
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat;

    .medical_main {
      margin: 0 auto;
    }

    .subline_leftMedical {
      padding: 0 !important;
      background: url(../../../src/assets/images/epidemic/wenli_nor.png) no-repeat center !important;
      text-align: center;
      height: 30px;
      line-height: 28px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      color: #333333;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        background: url(../../../src/assets/images/epidemic/wenli_sel.png) no-repeat center !important;
        color: #9A2B34 !important;
      }
    }

    .bgColor {
      background: url(../../../src/assets/images/epidemic/wenli_sel.png) no-repeat center !important;
      color: #9A2B34 !important;
      font-weight: bold;
    }

    .subleft_top {
      background: url("../../assets/images/epidemic/bg_zuo.png") no-repeat #fff;
    }

    .sub_right {
      background: url("../../assets/images/epidemic/bg_zuo.png") repeat-x #fff;
      min-height: calc(100vh - 517px);

      .messageList {
        width: 840px;
        margin: 40px auto 20px;
        padding: 0;
        min-height: 273px;

        li {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #555555;
          line-height: 40px;
          cursor: pointer;

          span {
            width: 652px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0;
            padding: 0;
          }

          span:before {
            content: url("../../assets/images/epidemic/icon_biao_nor.png");
            padding-right: 10px;
          }

          h1 {
            color: #C6C6C6;
            line-height: 40px;
            font-weight: normal;
            font-size: 14px;
            margin: 0;
            padding: 0;
          }
        }

        li:hover {
          color: rgba(154, 43, 52, 1);

          span:before {
            content: url("../../assets/images/epidemic/icon_biao_sel.png");
            padding-right: 10px;
          }

          h1 {
            color: #9A2B34;
          }
        }
      }

      .no_content{
        width: 400px;
        height: 306px;
        margin: 0;
      }
    }

    .subleft_top a {
      margin-top: 26px;
      display: inherit;
      text-decoration: none;
    }
  }


</style>
