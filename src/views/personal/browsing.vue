<template>
    <div class="browsing my_browsing">
        <div class="browsing_title">
            <div class="title_left">浏览记录</div>
            <div class="title_right">
               <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <a @click="delRecord" style="cursor:pointer;">清空记录</a>
            </div>
        </div>
        <div class="browsing_article">
            <el-checkbox-group v-model="checkedId" @change="handleCheckedCitiesChange">
                <div class="browsing_list" v-if="recordList.length>0" v-for="item in recordList" :key="item.index">
                    <div class="browsing_input">
                       <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
                    </div>
                    <div class="browsing_left" :class="{'hiddeClass':item.img=='null'}"  v-if="item.img" >
                        <img :src="`${uploadUrl}file/?fileName=${item.img}&isOnLine=true`"  :onerror="errorImg(detail)" @click="linkToDetil(item.goodsType,item.goodsId)">
                        <!-- <img  src="@/assets/images/home/no-cover.jpg" v-else> -->
                    </div>
                    <div class="browsing_rightCon">
                        <div class="browsing_topic" v-if="item.name!=null" @click="linkToDetil(item.goodsType,item.goodsId)">{{item.name}}</div>
                        <div class="browsing_detail" v-if="item.text!=null" v-html="item.text.length > 100?item.text.substring(0,100)+'...' : item.text"></div>
                        <div class="browsing_time">浏览时间：{{item.createTime}}</div>
                    </div>
                </div>

              <div class="noHave" v-if="recordList.length<=0"><img src="@/assets/images/home/no-content.jpg" alt=""></div>

            </el-checkbox-group>
            <!-- 有图片的结构 -->
            <!-- <div class="browsing_list">
                <div class="browsing_input">
                    <el-checkbox></el-checkbox>
                </div>
                <div class="browsing_left">
                    <img src="">
                </div>
                <div class="browsing_rightCon">
                    <div class="browsing_topic">hhhhhhhh</div>
                    <div class="browsing_detail">jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</div>
                    <div class="browsing_time">浏览时间：555555555</div>
                </div>
            </div> -->
            <!-- 没有图片的结构 -->
            <!-- <div class="browsing_text">
                <div class="browsing_input">
                    <input type="checkbox">
                </div>
                <div class="browsing_rightConent">
                    <div class="browsing_topic">除湿解毒汤——方剂名称</div>
                    <div class="browsing_detail">运气学说内容庞杂玄妙，历代医家对此褒贬不一，但多数医家均认为此为中医学之大关键。至当代李阳波先生论运气，将内经中亢害承制之说落到了实处。当归中医学堂邀请到老师与大家分享此中奥妙，多数医家均认为兼论诸家得失</div>
                    <div class="browsing_time">浏览时间：2018-10-31  11:15:30</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { uploadUrl } from '@/utils/global'
import '@static/css/personal/browsing.less'
import { recordGetAPI,recordDelAllAPI } from '@/api/personal/myRecord'
export default {
    name: 'browsing',
    data(){
        return {
            checkAll: false,
            isIndeterminate: false,
            allId:[],//全部的id
            checkedId:[],//选中
            recordList:[],
            uploadUrl:uploadUrl,
            type:""//文章，图书

        }
    },
    mounted() {
        this.getRecordData();
    },
    methods: {
        getRecordData(){//获取浏览记录
            recordGetAPI().then(res=>{
                if(res.data.code==0){
                    this.recordList=res.data.data?res.data.data:[];
                    if(this.recordList.length>0){     
                      this.recordList.map((item,index,arr)=>{
                        this.allId.push(this.recordList[index]['id']);
                      });
                    }
                }else if(res.data.code<0){
                    this.$message('请求失败');
                }
            })
        },
        delRecord(){//删除浏览记录
            let arrId=this.checkedId;
            if(arrId.length<=0){
                this.$message.warning("您未选中要删除的列表");
                return;
            }
            this.$confirm('确定要批量删除浏览记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                recordDelAllAPI(arrId).then(res=>{
                    let Vue=this;
                    if (res.data.code > 0) {
                        this.$message.warning(res.data.msg)
                    } else if (res.data.code < 0) {
                        this.$message.error(`删除失败`)
                    } else {
                        this.$message.success(`删除成功`)
                        this.getRecordData();
                    }
                })
            })
        },
        linkToDetil(type,id){//点击封面进详情
            //电子书2-1 文章2-2 ,
            if(type=="2-2"){//文章
                this.$router.push({
                    name:"articleread",
                    path:"/articleread",
                    query:{
                        id:id,
                    }
                });
            }else if(type="2-1"){//图书
                this.$router.push({
                    name:"medetails",
                    path:"/medetails",
                    query:{
                        id:id,
                    }
                });
            }
            console.log(type,"点击封面进详情")
        },
        handleCheckAllChange(val) {//全选
            console.log(val,"val")
            //console.log(this.comment,"this.comment")
            this.checkedId = val ? this.allId : [];
            //console.log(this.checkedId,'this.checkedId')
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {//单选
            //console.log(value,"value")
           let checkedCount = value.length;
           this.checkAll = checkedCount === this.recordList.length;
           this.isIndeterminate = checkedCount > 0 && checkedCount < this.recordList.length;
        }

    },
}
</script>

<style lang="less">
    .my_browsing{
        .browsing_list .el-checkbox__label{
            font-size: 0 !important;
        }
        .hiddeClass{
            display: none;
        }
        .el-checkbox-group{
            font-size: inherit !important;
        }
        .browsing_left{
            width: 148px;
            height: 148px;
            text-align: center;
            line-height: 148px;
            margin-right:0;
            img{
                max-width: 148px;
                max-height: 148px
            }
        }
        .browsing_rightCon{
            min-width:705px;
            margin-left: 18px;
        }
    }
  .browsing{

    .browsing_article{
      padding:0 26px;
      box-sizing: border-box;
      min-height: 864px;
      background: #fff;
      margin-bottom: 20px;
      .noHave{height:863px;background: #fff; display: flex; justify-content: center; align-items: center}
    }

  }
</style>
