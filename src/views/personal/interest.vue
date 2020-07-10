<template>

<div class="interestCss">
    <div class="interest_title">我的关注</div>
    <div class="interest_list">
        <dl v-if="collectList.length>0" v-for="(item,index) in collectList" :key="index">
            <dt @click="lookIntro(item)"><img  :src=fileUrl(item.faceImg)></dt>
            <dd>
                <div class="interestlist_title"><i @click="lookIntro(item)">{{item.name}}</i><span>{{item.department ==0?'骨科':item.department==1?'内科':'外科'}}</span></div>
              <!--职称0:主任医师1:副主任医师2:主治医师3:医师4:教授5:副教授6:研究员7：副研究员9：其他 ,-->
                <div class="interestlist_technical">职称：
                  {{item.title==0?'主任医师':item.title==1?'副主任医师':item.title==2?'主治医师':item.title==3?'医师':item.title==4?'教授':item.title==5?'副教授':item.title==6?'研究员':item.title==7?'副研究员':'其他'}}
                </div>
                <div class="interestlist_organization">机构：{{item.institutionName}}</div>
                <div class="interest_btn">
                    <a @click="cancelCol(item)">取消关注</a>
                    <a @click="lookIntro(item)">查看简介</a>
                </div>
            </dd>
        </dl>
        <!--<dl>
            <dt><img src="../../assets/images/personal/关注pic2.png"></dt>
            <dd>
                <div class="interestlist_title">巴·吉格木德<span>中医儿科</span></div>
                <div class="interestlist_technical">职称：医药学家、研究生导师</div>
                <div class="interestlist_organization">机构：国家卫生计生委脑卒中防治工程委员会</div>
                <div class="interest_btn">
                    <a href="#">取消关注</a>
                    <a href="#">查看简介</a>
                </div>
            </dd>
        </dl>-->
      <div class="noHave" v-if="collectList.length==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
    </div>
  <div class="pagination_box"  v-if="collectList.length>0">
    <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
    <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
  </div>
    </div>
</template>

<script>
import '@static/css/personal/interest.less';
import {myCollectAPI,cancelcollectionAPI} from '../../api/comment/comments'

export default {
    name: 'interest',
  data(){
      return {
        pageNum:1,
        pageSize:10,
        collectList:[],
        total:0,
        lastPage:0,

    }
  },
  created(){
    this.myCollect();
  },
  methods:{
    /*获取关注列表*/
    myCollect(){
      myCollectAPI({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        type: 2
      }).then(res=>{
        this.collectList=res.data.data.list;
        this.total=res.data.data.total;
        this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.pageSize));
        console.log('我的关注',res.data)
      })
    },
    /*取消关注*/
    cancelCol(val){
      cancelcollectionAPI({
        goodsList:[{
          id:val.id,
          type:val.goodsType
        }] ,
        goodsType: this.type,/*
          memberId (string, optional): 用户id ,*/
        memberType:this.userType+1
      }).then(res=>{
        if(res.data.status){
          this.$message.success("已取消关注")
          this.myCollect();

        }else{
          this.$message.error(res.data.msg)
        }
      })

    },
    /*查看简介*/
    lookIntro(val){
      console.log("查看详情")
      this.$router.push({path:'/medicalother',query:{id:val.id}})
    },
    // 分页
    pageChange(val) {
      console.log('切换page')
      this.pageNum = val
      this.myCollect()
    },
    // handleCurrentChange(val) {
    //   this.pageNum = val
    //   this.myCollect()

    // }
  },
}
</script>
<style lang="less" scoped>
  .interestCss{
    width:100%;

    .interest_list{
      width:100%;min-height: 863px;
      dl{
        dt{
          cursor: pointer;
        }

        dd{
          .interestlist_title{
            i{
              cursor: pointer;
              font-style: normal;
            }
            i:hover{
              color:#1F77F2;
            }
          }
          .interest_btn a{
            float: left;
            display: block;
            margin-right: 12px;
            width:94px;
            height:34px;
            line-height: 34px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(187,187,187,1);
            border-radius:4px;
            text-align: center;
            cursor: pointer;
          }
          .interest_btn a:hover{
            color:#1F77F2;
            border: 1px solid #1F77F2;
          }
        }
      }
      .noHave{ height: 863px; background: #fff; display: flex; justify-content: center; align-items: center}
    }
    .pagination_box {
      background-color: inherit;
      padding: 20px 0;
      width: 100%;
      text-align: center;
    }
  }
</style>
