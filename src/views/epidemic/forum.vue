<template>
  <div class="forumCss epidemicLoad">
    <div class="forum">
      <epidemicNavbar></epidemicNavbar>
      <div class="epidemicForum">
        <div v-loading="loading">
        <ul v-if="list&&list.length>0">
          <li v-for="(item,index) in list" :key="index">
            <div class="cover" @click="toDetail(item)">
              <img :src="fileUrl(item.img)" alt="" v-if="item.img">
              <img src="../../assets/images/resources/zanwu.png" alt="" v-else>
            </div>
            <h1 @click="toDetail(item)">{{item.title}}</h1>
          </li>
        </ul>
          <div  v-if="!loading&&list.length==0" style="text-align: center; width: 100%;background: #fff">
            <img src="../../assets/images/home/no-content.jpg" class="no_content">
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination_box" v-if="list && list.length > 0">
          <pagination  @change="pageChange"
                       :current-page="listQuery.pageNum"
                       :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import epidemicNavbar from '../../components/epidemicNavbar'
  import {getTopicAPI} from '../../api/epidemic'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        list:[],
        listQuery: {
          pageNum:1,
          pageSize:12,
          code:'COVID_TOPIC_04',
        },
        lastPage:0,
        loading:true,
      }
    },
    components: { epidemicNavbar },
    created () {
      this.getList();
    },
    watch: {},
    methods: {
      getList(){
        this.loading=true;
        getTopicAPI(this.listQuery).then(res=>{
          if(res.data.status){
            this.list=res.data.data.recommendResourceList.list;
            this.lastPage=res.data.data.recommendResourceList.lastPage;
          }
          this.loading=false;
        })
      },
      toDetail(item){
        /*this.$router.push({path:'/epidemicDetail',query:{id:item.id}});*/
        let routeUrl = this.$router.resolve({
          path: "/epidemicDetail",
          query: {id:item.id}
        });
        window.open(routeUrl.href, '_blank');
      },
      // 分页
      pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val;
        this.getList();
        /*window.scrollTo(0, 0)*/
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul,li,h1,h2,h3,h4,h5,p,span,div{margin: 0;padding: 0;list-style: none}
  .forumCss{
    width: 100%;
    min-width: 1200px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat;
    .forum{
      width: 1200px;
      margin: 0 auto;
      .epidemicForum{
        width: 1200px;
        margin: 0 auto;
        box-shadow:0px 2px 8px 0px rgba(1,2,2,0.04);
        background: url("../../assets/images/epidemic/bg_zuo.png") repeat-x top #fff;
        padding-bottom:50px;
        min-height: calc( 100vh - 532px);
        ul{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding:33px 30px 0px 30px;
          min-height: calc( 100vh - 600px);
          li{
            padding-bottom: 34px;
            width: 364px;
            .cover{
              width:364px;
              height:212px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img{
                width:364px;
                height:212px;
              }
            }
            .cover:hover:before{
              content: url("../../assets/images/epidemic/play.png");
              position: absolute;
              width: 60px;
              height: 60px;
              z-index: 11;
            }
            .cover:hover:after{
              content: '';
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.4);
              position: absolute;
              top: 0;
            }
            h1{
              font-size:16px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              display: flex;
              align-items: center;
              height: 52px;
              cursor: pointer;
            }
            h1:before{
              content: '';
              background: url("../../assets/images/epidemic/text-li.png") no-repeat;
              width: 18px;
              height: 15px;
              float: left;
              margin-right: 6px;
            }
          }
        }
        .no_content{
          width: 400px;
          height: 306px;
          margin: 0;
        }

      }
    }
  }


</style>
