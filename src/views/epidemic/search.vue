<template>
  <div class="epidemicSearch epidemicLoad">
    <div class="rightBg">
      <div class="topCont">
        <ul>
          <li :class="$route.query.type==itemT.code?'active':''" v-for="(itemT,indT) in resourceType" :key="indT" @click="searchBtn(itemT)"><span>{{itemT.name}}</span></li>
        </ul>
      </div>
      <div class="list">
        <div class="sort">
          <ul>
            <li>排序：</li>
            <li :class="!listQuery.orderBy?'active':''" @click="sortFn()"><span>关联度</span></li><!--<img src="../../assets/images/epidemic/icon_jt_h_sha.png" alt="">-->
            <li :class="listQuery.orderBy&&listQuery.orderBy.indexOf('uploadTime')>=0?'active':''" @click="sortFn('uploadTime')"><span>时间</span><img :src="`../../static/img/icon_jt_h_${listQuery.orderBy&&listQuery.orderBy.indexOf('uploadTime')>=0?listQuery.orderBy.indexOf('asc')>=0?'sha':'xia':'xia1'}.png`" alt=""></li>
            <li :class="listQuery.orderBy&&listQuery.orderBy.indexOf('browseNum')>=0?'active':''" @click="sortFn('browseNum')"><span>浏览量</span><img :src="`../../static/img/icon_jt_h_${listQuery.orderBy&&listQuery.orderBy.indexOf('browseNum')>=0?listQuery.orderBy.indexOf('asc')>=0?'sha':'xia':'xia1'}.png`" alt=""></li>
          </ul>
          <h1>共 {{total}} 条搜索结果</h1>
        </div>
        <div v-loading="loading">
        <div class="page" v-if="list && list.length > 0">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="cover" v-if="item.img" @click="toDetail(item)">
                <img :src="fileUrl(item.img)" alt="">
              </div>
              <div class="word" :style="{width:item.img?'950px':'100%'}">
                <h1 @click="toDetail(item)" v-html="item.name"><!--{{item.name}}--></h1>
                <p :id="'id'+index">{{Ellipsis('id'+index,2,item.description,24)}}</p>
                <div class="other">
                  <span>{{item.browseNum}}次浏览</span>
                  <div class="readNum"  @click="toDetail(item)"><h2>阅读</h2></div>
                </div>
              </div>
            </li>

          </ul>
        </div>
        <div  v-if="!loading&&list.length==0" style="text-align: center;color: #545454;">
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
  import {searchAPI} from '../../api/epidemic/index';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        list:[],
        resourceType:[
          {name:'全部',code:null},
          {name:'理论',code:31},
          {name:'药物',code:32},
          {name:'临床',code:34},
          {name:'医案',code:35},
          ],
        listQuery: {
          pageNum:1,
          pageSize:6,
          content:'',
          systemType:1,
          resourceType:null,
          orderBy:null,
        },
        lastPage:10,
        total:0,
        loading:true,
      }
    },
    created () {
      this.getList();
    },
    watch: {
      '$route.query.val'(n,o){
        this.listQuery.pageNum=1;
        this.listQuery.content=n;
        this.getList();
      },
      /*'$route.query.type'(n,o){
        if(n==null){
          /!*console.log('类型变化',n);*!/
        }else{
          console.log('类型变化',n);
        }

      },*/
    },
    methods: {
      getList(){
        this.loading = true;
        /*资源类型 31理论 32药物 33方剂 34临床 35医案 36文化 37机构 38医论 48其他 1医著 2医家 39特色疗法 51医师*/
        if(this.$route.query.val){
          this.listQuery.content=this.$route.query.val;
        }
        if(this.$route.query.type){
          this.listQuery.resourceType=this.$route.query.type;
        }else{
          delete this.listQuery.resourceType
        }
        searchAPI(this.listQuery).then(res=>{
          if(res.data.status){
            this.list=(res.data.data&&res.data.data.resList)||[];
            this.lastPage=(res.data.data&&res.data.data.pageCount)||0;
            this.total=(res.data.data&&res.data.data.totalCount)||0;
          }
          this.loading = false;
        })
      },

      searchBtn(item){
        this.$router.push({name:'epidemicSearch',query:{val:this.$route.query.val,type:item.code}});
        this.listQuery.pageNum=1;
        this.listQuery.orderBy=null;
        this.getList();
      },

      /*排序*/
      sortFn(item){
        if(item){
          if(this.listQuery.orderBy&&this.listQuery.orderBy.indexOf(item)>=0){
            this.listQuery.orderBy=item+' '+(this.listQuery.orderBy.indexOf('asc')>=0?'desc':'asc');
          }else{
            this.listQuery.orderBy=item+' '+'asc';
          }

        }else{
          this.listQuery.orderBy=null;
        }
        this.getList();
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
        this.listQuery.pageNum = val
        this.getList();
        /*window.scrollTo(0, 0)*/
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

  .epidemicSearch {
    width: 100%;
    overflow: hidden;
    min-height: calc( 100vh - 422px);
    /*padding-bottom: 52px;
    background: url("../../assets/images/epidemic/pic_zuo.png") no-repeat  #f9f7f2 left bottom;*/
    .topCont {
      width: 100%;
      min-width: 1200px;
      background: url("../../assets/images/epidemic/bg_top.png") no-repeat;
      height: 260px;
      margin-top: 0;
      padding-top: 0;

      ul {
        width: 1140px;
        margin: 0 auto;
        padding-top: 53px;
        display: flex;
        justify-content: space-between;

        li {
          width: 220px;
          height: 85px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            cursor: pointer;
            width: 201px;
            height: 85px;
            background: url("../../assets/images/epidemic/bg_lexing_nor.png") no-repeat;
            display: block;
            text-align: center;
            line-height: 85px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }

        li:after {
          content: '';
          width: 6px;
          height: 6px;
          background: rgba(199, 178, 147, 1);
          border-radius: 50%;
          float: right;
          display: block;
        }

        li:last-child {
          width: 201px;
        }

        li:last-child:after {
          display: none;
        }

        .active {

          span {
            font-weight: bold;
            background: url("../../assets/images/epidemic/bg_lexing_sel.png") no-repeat;
          }
        }
      }
    }

    .list {
      width: 1200px;
      margin: -75px auto 0;
      background: #fff;
      box-shadow: 0px 2px 8px 0px rgba(1, 2, 2, 0.04);
      padding-bottom: 50px;
      min-height: calc(100vh - 658px);
      .sort {
        padding: 0 12px 0 20px;
        height: 54px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(238, 238, 238, 1);

        ul {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(84, 84, 84, 1);

          li {
            float: left;
            display: block;
            padding-right: 19px;
            cursor: pointer;
            img {
              margin-left: 8px;
              width: 7px;
              height: 9px;
            }
          }

          .active {
            color: #9A2B34;
          }
        }

        h1 {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
        }

      }

      .page {
        width: 1160px;
        margin: 0 auto 39px;

        ul {
          li {
            height: 165px;
            padding: 25px 10px 0 10px;
            display: flex;
            justify-content: flex-start;
            border-bottom: 1px solid #EDEDED;
            .cover {
              width: 185px;
              height: 138px;
              padding-right: 20px;
              cursor: pointer;
              img{
                width: 185px;
                height: 138px;
              }
            }
            .word {

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
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:24px;
                margin-bottom: 15px;
              }

              .other {
                display: flex;
                justify-content: space-between;
                span {
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(153,153,153,1);
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
                  width:90px;
                  height:28px;
                  border:1px solid rgba(226,197,197,1);
                  border-radius:14px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  h2{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(154,43,52,1);
                  }
                  h2:before{
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
          li:hover{
            background: #FCFBF9;
            .other{
              .readNum{
                width:90px;
                height:28px;
                background:rgba(154,43,52,1);
                border-radius:14px;
                h2{
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:#fff;
                }
                h2:before{
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
