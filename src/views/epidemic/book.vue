<template>
  <div class="epidemicBook epidemicLoad">
    <div class="center1200">
      <epidemicNavbar></epidemicNavbar>
      <div v-loading="loading">
      <ul v-if="list&&list.length>0">
        <li v-for="(item,index) in list" :key="index">
          <div class="cover" @click="toDetail(item)">
            <img :src="fileUrl(item.bookCover)" alt="" v-if="item.bookCover">
            <img src="../../assets/images/home/no-cover.jpg" alt="" v-else>
          </div>
          <div class="word">
            <h1 @click="toDetail(item)">{{item.name}}</h1>
            <h2>{{item.author}} <span>{{changeTime(item.publishTime)}}</span></h2>
            <p :id="`summary`+index">
              {{Ellipsis(`summary`+index,2,item.summary,24)}}</p>
            <div class="other">
              <div class="readNum" @click="toDetail(item)"><h2>阅读</h2></div>
            </div>
          </div>
        </li>
      </ul>
        <div  v-if="!loading&&list.length==0" style="text-align: center; width: 100%;background: #fff">
          <img src="../../assets/images/home/no-content.jpg" class="no_content">
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination_box" v-if="list && list.length > 0">
      <pagination  @change="pageChange"
                   :current-page="listQuery.pageNum"
                   :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
    </div>
  </div>
</template>

<script>
  import epidemicNavbar from '../../components/epidemicNavbar'
  import {getTopicAPI} from '../../api/epidemic/index.js';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        list:[],
        listQuery: {
          pageNum:1,
          pageSize:15,
          code:'COVID_TOPIC_02',
        },
        lastPage:0,
        loading:true,
      }
    },
    components: {epidemicNavbar},
    created () {
      this.getList();
    },
    watch: {},
    methods: {
      getList(){
        this.loading = true;
        getTopicAPI(this.listQuery).then(res=>{
          if(res.data.status){
           this.list=res.data.data.recommendResourceList.list;
           this.lastPage=res.data.data.recommendResourceList.lastPage;
          }
          this.loading = false;
        })

      },
      toDetail(item){
        let routeUrl = this.$router.resolve({
          path: "/epidemicBookDetail",
          query: {id:item.id}
        });
        window.open(routeUrl.href, '_blank');
        /*this.$router.push({path:'/epidemicBookDetail',query:{id:item.id}});*/
      },
      // 分页
      pageChange(val) {
        console.log('切换page')
        this.listQuery.pageNum = val
        this.getList();
        /*window.scrollTo(0, 0)*/
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .epidemicBook {
    width: 100%;
    min-width: 1200px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat top;

    ul, li, h1, h2, h3, h4, h5, p, span, div {
      margin: 0;
      padding: 0;
      list-style: none
    }

    .center1200 {
      width: 1200px;
      margin: 0 auto 50px;
      min-height: calc(100vh - 472px);
      ul {
        li {
          width: 1140px;
          height: 162px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.1);
          padding: 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;

          .cover {
            width: 120px;
            height: 162px;
            box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.1);
            cursor:pointer;
            img {
              width: 120px;
              height: 162px;
            }
          }

          .word {
            width: 990px;

            h1 {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              height: 30px;
              line-height: 30px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: normal;
              cursor:pointer;
            }

            h2 {
              margin-top: 10px;
              margin-bottom: 20px;
              height: 16px;
              line-height: 16px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);

              span:before {
                content: '|';
                padding-left: 11px;
                padding-right: 11px;

              }
            }

            p {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 24px;
              margin-bottom: 12px;
              /*height: 60px;*/
            }
            .other {
              display: flex;
              justify-content: flex-end;

              .readNum {
                width: 90px;
                height: 28px;
                border: 1px solid rgba(226, 197, 197, 1);
                border-radius: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                h2 {
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(154, 43, 52, 1);
                  margin: 0;
                  padding: 0;
                }

                h2:before {
                  content: url("../../assets/images/epidemic/icon_yued_nor.png");
                  width: 18px;
                  height: 12px;
                  margin-right: 7px;
                  /*margin-top: 1px;*/
                }
              }
              .readNum:hover {
                width: 90px;
                height: 28px;
                background: rgba(154, 43, 52, 1);
                border-radius: 14px;

                h2 {
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #fff;
                }

                h2:before {
                  content: url("../../assets/images/epidemic/icon_yuedu_sel.png");
                  width: 18px;
                  height: 12px;
                  margin-right: 7px;
                }
              }
            }
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
</style>
