<template>
  <div class="epidemicList epidemicLoad">
    <div class="center1200">
      <epidemicNavbar></epidemicNavbar>
      <div class="rightBg">
        <div class="list">
          <div class="page"  v-loading="loading">
            <ul v-if="list&&list.length>0">
              <li v-for="(item,index) in list" :key="index">
                <div class="cover" v-if="item.img">
                  <img :src="fileUrl(item.img)" alt=""  @click="toDetail(item)">
                </div>

                <div class="word">
                  <h1 @click="toDetail(item)">{{item.title}}</h1>
                  <p :id="'synopsis'+index" v-if="item.synopsis">{{Ellipsis('synopsis'+index,2,item.synopsis,24)}}</p>
                  <div class="other">
                    <span>{{item.browseNum}}次浏览</span>
                    <div class="readNum" @click="toDetail(item)"><h2>阅读</h2></div>
                  </div>
                </div>
              </li>
            </ul>
            <div  v-if="!loading&&list.length==0" style="text-align: center; padding-top: 5px;">
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
  import epidemicNavbar from '../../components/epidemicNavbar'
  import {getTopicAPI,getTopicMoreAPI} from '../../api/epidemic'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        list: [],
        listQuery: {
          pageNum: 1,
          pageSize: 15,
        },
        lastPage: 0,
        curType:null,
        loading:true,
        cont5:[
          {code:'COVID_TOPIC_01',name:'新冠肺炎防控知识'},
          {code:'COVID_TOPIC_05',name:'理论'},
          {code:'COVID_TOPIC_06',name:'药物'},
          {code:'COVID_TOPIC_07',name:'临床'},
          {code:'COVID_TOPIC_08',name:'医案'},
        ],
      }
    },
    components: {epidemicNavbar},
    created () {
      this.$route.matched[1].meta.title=this.$route.query.type||'新冠肺炎防控知识';
      let data=null;
      if(this.$route.query.type){
        data=this.cont5.filter((item)=>{
          return item.name==this.$route.query.type
        })
        this.listQuery.code=data[0].code;
      }
      this.getList();

    },
    watch: {},
    methods: {
      getList(){
        this.loading=true;
        let API=this.$route.query.type=='新冠肺炎防控知识'?getTopicMoreAPI:getTopicAPI;
        API(this.listQuery).then(res=>{
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
      pageChange (val) {
        this.listQuery.pageNum = val
        this.getList();
       /* window.scrollTo(0, 0)*/
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul, li, h1, h2, h3, h4, h5, p, span, div {
    margin: 0;
    padding: 0;
    list-style: none
  }

  .epidemicList {
    width: 100%;
    min-width: 1200px;
    background: url("../../assets/images/epidemic/bg_top.png") no-repeat top;
    .center1200 {
      width: 1200px;
      margin: 0 auto;
      min-height: calc(100vh - 423px);
      .list {
        background: url("../../assets/images/epidemic/bg_zuo.png") repeat-x top #fff;
        box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.04);
        padding-bottom: 50px;
        height: 100%;
        .page {
          width: 1160px;
          margin: 0 auto 39px;
          ul {
            padding-top: 5px;
            min-height: calc(100vh - 611px);
            li {
              height: auto;
              padding: 25px 10px 22px 10px;
              display: flex;
              justify-content: flex-start;
              border-bottom: 1px solid #EDEDED;
              .cover {
                width: 185px;
                height: 138px;
                margin-right: 20px;
                img{
                  width: 185px;
                  height: 138px;
                  cursor: pointer;
                }
              }

              .word {
                width: 100%;
                h1 {
                  font-size: 18px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  height: 25px;
                  line-height: 25px;
                  padding-bottom: 22px;
                  cursor: pointer;
                }

                p {
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                  line-height: 24px;
                  margin-bottom: 15px;
                }

                .other {
                  display: flex;
                  justify-content: space-between;

                  span {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    height: 28px;
                    line-height: 28px;
                  }

                  span:before {
                    content: url("../../assets/images/epidemic/icon_lll.png");
                    width: 20px;
                    height: 11px;
                    float: left;
                    display: block;
                    padding-top: 0px;
                    padding-right: 4px;
                  }

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
                    }

                    h2:before {
                      content: url("../../assets/images/epidemic/icon_yued_nor.png");
                      width: 18px;
                      height: 12px;
                      margin-right: 7px;
                      /*margin-top: 1px;*/
                    }

                    /*img {

                    }*/
                  }
                }
              }
            }

            li:hover {
              background: #FCFBF9;
              /*.cover {
                width: 185px;
                height: 138px;
                margin-right: 20px;
              }*/
              .other {
                .readNum {
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
          .no_content{
            width: 400px;
            height: 306px;
            margin: 0;
          }
        }
      }
    }

  }

</style>
