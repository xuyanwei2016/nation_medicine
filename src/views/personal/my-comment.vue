<template>
<div class="myComment">
    <div class="comment_rightTitle">我的评论</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="医著" name="2-1">
            <div class="comment_con my-comment" v-if="comment.length>0">
                <el-checkbox-group v-model="checkedId" @change="handleCheckedCitiesChange">
                    <div class="comment_li" v-for="item in comment" :key="item.index">
                        <div class="info_input">
                            <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
                        </div>
                        <div class="comment_left">
                            <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`" v-if="item.img" alt="pic" @click="linkToComment(item.resourceId,item)">
                            <img  src="@/assets/images/home/no-cover.jpg" v-else>
                        </div>
                        <div class="comment_rightCon">
                            <div class="comment_topic" @click="linkToComment(item.resourceId,item)">{{item.resourceName}}</div>
                            <el-rate v-model="item.score" disabled text-color="#ff9900"></el-rate>
                            <div class=" comment_details more_show">{{item.content}}</div>
                            <div class="comment_time">
                                <span>{{item.releaseTime}}</span>
                                <div class="del" @click='delSingle(item.id)'>
                                    <img src="@/assets/images/personal/del_ico.png">
                                    <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
            <div class="pagination_box" v-if="total!=0">
                <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
                <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
            </div>
        </el-tab-pane>
        <el-tab-pane label="文章" name="2-2">
            <div class="comment_con my-comment" v-if="comment.length>0">
                <el-checkbox-group v-model="checkedId" @change="handleCheckedCitiesChange">
                    <div class="comment_li" v-for="item in comment" :key="item.index">
                        <div class="info_input">
                            <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
                        </div>
                        <div class="comment_left" :class="{'hiddeClass':item.img==null}">
                           <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`" @click="linkToComment(item.resourceId,item)">
                        </div>
                        <div class="comment_rightCon">
                            <div class="comment_topic" @click="linkToComment(item.resourceId,item)">{{item.resourceName}}</div>
                            <el-rate v-model="item.score" disabled text-color="#ff9900"></el-rate>
                            <div class="comment_details" :class="{'more_show':item.content&&item.content.length>100}">{{item.content}}</div>
                            <div class="comment_time">
                                <span>{{item.releaseTime}}</span>
                                <div class="del" @click='delSingle(item.id)'>
                                    <img src="@/assets/images/personal/del_ico.png">
                                    <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
            <div class="pagination_box" v-if="total!=0">
                <pagination @change="pageChange" :current-page="pageNum" :page-size="pageSize" :total-page="lastPage"></pagination>
                <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
            </div>
        </el-tab-pane>
    </el-tabs>
  <div class="noHave" v-if="comment.length==0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>
    <div class="comment_check">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <a @click="delAll" style="cursor: pointer">批量删除</a>
    </div>
</div>
</template>

<script>
import { uploadUrl } from '@/utils/global'
import '@static/css/personal/my-comment.less'
import { personAPI,personDelAPI,personDelAllAPI } from '@/api/personal/myCommit'
export default {
    name: 'comment',
    data() {
        return {
            checkAll: false,
            isIndeterminate: false,
            allId:[],
            checkedId:[],//选中
            comment:[],//评论列表
            type:"医著",
            data:null,
            status:null,
            activeName:'2-1',
            uploadUrl:uploadUrl,
            pageNum: 1,
            pageSize: 15,
            total:0,
            lastPage:0,
        }
    },
    mounted() {
        this.data={
            'goodsType':this.activeName,
            'pageNum':this.pageNum,
            'pageSize':this.pageSize
        }
        this.getCommentDate(this.data)
    },
    created(){

    },
    methods:{
        //渲染列表方法
        getCommentDate(data){
            personAPI(data).then(res => {
                let Vue=this;
                if(res.data.code==0){
                  console.log("!!!!!!!!",res.data.data.list||[])
                    Vue.comment=res.data.data.list||[];
                    Vue.total=res.data.data.total;
                    Vue.lastPage = Math.ceil(Number(res.data.data.total) / Number(Vue.pageSize));
                  if(Vue.comment.length>0){
                    Vue.allId=[];//清空id;
                    Vue.comment.map(function(item,index,arr){
                      Vue.allId.push(Vue.comment[index]['id']);
                    })
                  }
                console.log(Vue.allId,'res.data.code<0')
                }else if(res.data.code<0){
                    this.$message('请求失败');
                }
            })
        },
        delSingle(id){//删除单行
            //  console.log(this.checkedId,id,"del")
            // let Vue=this;
            // let fleg=this.checkedId.find(function(item){
            //     return item ===  id;
            // })
            //  console.log(fleg,"fleg")
            // if(!fleg){
            //     this.$message.warning("请选择要删除的列表")
            //     return;
            // }
            this.$confirm('确定删除此条评论吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                personDelAPI(id).then(res => {
                    console.log(id,"id")
                    if (res.data.code > 0) {
                        this.$message.warning(res.data.msg)
                    } else if (res.data.code < 0) {
                        this.$message.error(`删除失败`)
                    } else {
                        this.$message.success(`删除成功`)
                        this.getCommentDate(this.data)
                    }
                })
             })
        },
        delAll(){//删除全部
            let resId=this.checkedId;
            console.log(this.checkedId,"选中的id")
            if(resId.length<=0){
                this.$message.warning("您未选中要删除的列表");
                return;
            }
          this.$confirm('确定要批量删除评论内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            personDelAllAPI(resId).then(res => {
              if (res.data.code > 0) {
                this.$message.warning(res.data.msg)
              } else if (res.data.code < 0) {
                this.$message.error(`删除失败`)
              } else {
                this.$message.success(`删除成功`)
                this.getCommentDate(this.data)
              }
            })
          }).catch(()=>{

          })

        },
        handleClick(tab, event) {//切换tab
            this.type=tab.label;
            this.data.goodsType=tab.name;
            this.checkedId=[];//切换初始化选择状态
            this.isIndeterminate = false;
            this.checkAll=false;
            this.getCommentDate(this.data)

        },
        handleCheckAllChange(val) {//全选
            console.log(val,"val")
            this.checkedId = val ? this.allId : [];
            this.isIndeterminate = false;
            console.log(this.checkedId,"this.checkedId")
        },
        handleCheckedCitiesChange(value) {//单选
            //console.log(value,"value")
           let checkedCount = value.length;
           this.checkAll = checkedCount === this.comment.length;
           this.isIndeterminate = checkedCount > 0 && checkedCount < this.comment.length;
        },
        linkToComment(Id,val){//跳到全部评论页
            let id=Id;
            let type=this.type;
            this.$router.push({
                name:"comments",
                path:"/comments",
                query:{
                    id:id,
                    type:val.resourceClass
                }
            });
        },
        // handleCurrentChange(val) {//分页
        //     this.pageNum = val
        //     this.getCommentDate(this.data);
        // }
        // 分页
        pageChange(val) {
            console.log('切换page')
            this.pageNum = val
            this.getCommentDate(this.data);
        },

  }
}
</script>

<style lang="less" >
    .my-comment .el-checkbox-group{
        font-size: inherit
    }

    .my-comment .el-checkbox__label{
        display: none !important
    }
    .my-comment{
        .hiddeClass{
            display: none;
        }
        .comment_left{
            width: 148px;
            height: 148px;
            text-align: center;
            line-height: 148px;
            margin-right:0px;
            img{
                max-width: 148px;
                max-height: 148px;
                cursor: pointer;
            }
        }
        .comment_rightCon{
            margin-left: 18px;
        }
    }
  .myComment{
    min-height:932px;
    margin-bottom: 20px;
    .noHave{ min-height: 809px; background: #fff; display: flex; justify-content: center; align-items: center}
    .el-tabs__header .el-tabs__nav-wrap {
      width: 926px;
      margin-left: 27px;
    }
    .del{
        display: none;
    }
    .comment_li:hover{
        .del{
        display: block
        }
    }
  }

</style>
