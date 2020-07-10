<template>
    <div id="user_other">
        <commonHeader v-on:childByValue="childByValue"></commonHeader>
        <div class='userother_content_bg'>
            <div class="userother_content_bg_banner"></div>
            <div class="userother_content_bg_flower1"></div>
            <div class="userother_content_bg_flower2"></div>
            <div class="userother_wrap">
                <div class="userother_top">
                    <div class="userother_top_opt">
                        <div class="userother_opt_list"><i class="el-icon-view"></i><span>关注度：{{form.concernedNum}}</span></div>
                        <div class="userother_opt_list" v-if="cancel" @click="question"><el-button size="mini" plain >向他提问</el-button></div>
                        <div class="userother_opt_list share_btn" style='position:relative'>
                            <div style="display:inline-block"><el-button size="mini" plain icon="el-icon-share">分享</el-button></div>
                            <div class="bdsharebuttonbox share_box" style="width:100px;right:50px;position:absolute;"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                            </div>
                            <div ref='share_wrap'></div>
                        </div>
                        <div class="userother_opt_list" v-if="cancel" >
                            <div v-if="form.isConcerned == 0" @click="attention()">
                                <el-button size="mini"  plain icon="el-icon-plus">关注</el-button>
                            </div>
                            <div v-else @click="cancelAtte()">
                                <el-button size="mini" plain>已关注</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="userother_top_more"  v-if="extend">
                        <span @click="clickShowBtn">展开</span>
                    </div>
                    <div class="userother_top_pic">
                        <img class="userother_top_img" :src="`${uploadUrl}file/?fileName=${form.faceImg}&isOnLine=true`" :onerror="errorImg()">
                        <!-- <img class="userother_top_img" src="@/assets/images/home/no-cover.jpg" v-else> -->
                    </div>
                    <div class="userother_top_content">
                        <div class="userother_top_content_tit">{{form.name}}</div>
                        <div class="userother_top_content_tag">
                            <el-tag v-if="on"><i class="userother_icon build_icon" v-if="on"></i>{{form.institutionName}}</el-tag>
                            <el-tag><i class="userother_icon doctor_icon"></i>{{form.title}}</el-tag>
                        </div>
                        <div class="userother_top_content_text">
                            <!--<p v-html="form.description?form.description.length>200?form.description.substring(0,200)+'...':form.description:''">{{form.description?form.description.length>200?form.description.substring(0,30)+'...':form.description:''}}</p>-->
                            <p v-html="form.description" :class="{'textDescShow':bindClass}">{{form.description}}</p>
                        </div>
                    </div>
                </div>
                <div class="userother_content">
                    <div class="userother_content_left">
                        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
                            <!-- 我要贡献按钮 -->
                            <router-link :to="{path: '/usoffer', query: { fatherId: fatherId}}" v-if="off">
                                <div class="my_contribute" v-if="id==authorId">我要贡献</div>
                            </router-link>
                            <el-tab-pane label="经典医案" name="first">
                                <div v-if="list.length != 0">
                                    <div class="userother_content_block" v-for="item in list" :key="item.id">
                                        <router-link :to="{path: '/articleread', query: {id: item.id}}">
                                            <div class="userother_content_block_tit">{{item.title?item.title.length>30?item.title.substring(0,30)+'...':item.title:''}}</div>
                                        </router-link>
                                        <div class="userother_content_block_text">{{item.synopsis?item.synopsis.length>180?item.synopsis.substring(0,180)+'...':item.synopsis:''}}</div>
                                        <div class="userother_content_block_tag">
                                            <el-tag size="mini" style="cursor: pointer;" v-for="item in item.keyword" :key="item.id">{{item}}</el-tag>
                                        </div>
                                    </div>
                                    <div class="pagination_box">
                                        <pagination @change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                                        <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
                                    </div>
                                </div>
                                <div v-else style="margin: 50px auto;width: 600px; height: 460px;">
                                    <img src="@/assets/images/home/no-content.jpg">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="相关分享" name="second">
                                <div v-if="shareList.length != 0">
                                    <div class="userother_content_block" v-for="item in shareList" :key="item.id">
                                        <router-link :to="{path: '/articleread', query: {id: item.id}}">
                                            <div class="userother_content_block_tit">{{item.title?item.title.length>15?item.title.substring(0,15)+'...':item.title:''}}</div>
                                        </router-link>
                                        <div class="userother_content_block_text" v-html="item.synopsis?item.synopsis.length>150?item.synopsis.substring(0,150)+'...':item.synopsis:''"></div>
                                        <div class="userother_content_block_tag">
                                            <el-tag size="mini" v-for="item in item.keyword" :key="item.id">{{item}}</el-tag>
                                        </div>
                                    </div>
                                    <div class="pagination_box">
                                        <pagination @change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" :total-page="lastPage1"></pagination>
                                        <!-- <el-pagination  @current-change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" layout="prev, pager, next, total, jumper" :total="total1"></el-pagination> -->
                                    </div>
                                </div>
                                <div v-else style="margin: 50px auto;width: 600px; height: 460px;">
                                    <img src="@/assets/images/home/no-content.jpg">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="医学著作" name="third">
                                <div v-if="ebookList.length != 0">
                                    <div class="userother_content_wrap" v-for="item in ebookList" :key="item.id">
                                        <div class="userother_content_img">
                                            <router-link :to="{path: '/medetails', query: {id: item.id}}">
                                                <img class="userother_top_img" :src="`${uploadUrl}file/?fileName=${item.bookCover}&isOnLine=true`" :onerror="errorImg()">
                                                <!-- <img class="userother_top_img" src="@/assets/images/home/no-cover.jpg" v-else> -->
                                            </router-link>
                                        </div>
                                        <div class="userother_content_text">
                                            <router-link :to="{path: '/medetails', query: {id: item.id}}">
                                                <div class="userother_content_block_tit">《{{item.name}}》</div>
                                            </router-link>
                                            <div class="userother_content_block_text" v-html="item.summary?item.summary.length>130?item.summary.substring(0,130)+'...':item.summary:''"></div>
                                        </div>
                                    </div>
                                    <div class="pagination_box">
                                        <pagination @change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" :total-page="lastPage1"></pagination>
                                        <!-- <el-pagination  @current-change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" layout="prev, pager, next, total, jumper" :total="total1"></el-pagination> -->
                                    </div>
                                </div>
                                <div v-else style="margin: 50px auto;width: 600px; height: 460px;">
                                    <img src="@/assets/images/home/no-content.jpg">
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="专家答疑" name="fourth">
                                <div v-if="expertList.length != 0">
                                    <div class="userother_content_wrap" v-for="item in expertList" :key="item.id">
                                        <div class="userother_content_block_top">
                                            <router-link :to="{path: '/answer', query: {id: item.id, arr:[{meta: { title: '专家答疑' },path:'/medicalother'}], fatherId: fatherId}}" v-if="item.auditStatus == 1">
                                                <img class="userother_content_block_img" src="@/assets/images/medical/ask-ico.png">
                                                <router-link :to="{path: '/expertsLeave', query: {id: item.id, arr:[{meta: { title: '专家答疑' },path:'/medicalother'}], fatherId: fatherId}}">
                                                    <div class="userother_content_block_title">{{item.title?item.title.length>30?item.title.substring(0,30)+'...':item.title:''}}</div>
                                                </router-link>
                                            </router-link>
                                            <router-link :to="{path: '/answer', query: {id: item.id, arr:[{meta: { title: '专家答疑' },path:'/medicalother'}], fatherId: fatherId}}" v-else>
                                                <img class="userother_content_block_img" src="@/assets/images/medical/ask-ico.png">
                                                <div class="userother_content_block_title">{{item.title?item.title.length>30?item.title.substring(0,30)+'...':item.title:''}}</div>
                                            </router-link>
                                            <div class="userother_content_block_time">{{item.releaseTime}}</div>
                                        </div>
                                        <div class="userother_content_block_bot" v-if="item.auditStatus == 2">
                                            <img class="userother_contnt_block_img" src="@/assets/images/medical/extern-ico.png">
                                            <div class="userother_content_block_syno" v-html="item.replyContent?item.replyContent.length>100?item.replyContent.substring(0,100)+'...':item.replyContent:''"></div>
                                        </div>
                                        <router-link :to="{path: '/expertsLeave', query: {id: item.id, doctorId: form.id, arr:[{meta: { title: '专家答疑' },path:'/medicalother'}], fatherId: fatherId}}">
                                            <div class="userother_content_block_ask" v-if="item.auditStatus == 1 && replyCancel">回复</div>
                                        </router-link>
                                    </div>
                                    <div class="pagination_box">
                                        <pagination @change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" :total-page="lastPage1"></pagination>
                                        <!-- <el-pagination  @current-change="handleChange" :current-page="query.pageNum" :page-size="query.pageSize" layout="prev, pager, next, total, jumper" :total="total1"></el-pagination> -->
                                    </div>
                                </div>
                                 <div v-else style="margin: 50px auto;width: 600px; height: 460px;">
                                    <img src="@/assets/images/home/no-content.jpg">
                                </div>
                            </el-tab-pane>
                        </el-tabs>

                    </div>
                    <div class="userother_content_right">
                        <div class="userother_content_right_tit">
                            相关名医
                        </div>
                        <div class="userother_content_right_cont">
                            <div class="userother_content_block" v-for="item in doctorList" :key="item.id">
                                <div class="userother_content_block_pic" @click="linkShowUser(item.id)">
                                    <img class="userother_top_img" :src="`${uploadUrl}file/?fileName=${item.faceImg}&isOnLine=true`" :onerror="errorImg()" alt="相关名医">
                                    <!-- <img class="userother_top_img" src="@/assets/images/home/no-cover.jpg" v-else alt="相关名医"> -->
                                </div>
                                <div>
                                    <div class="userother_content_block_tit" @click="linkShowUser(item.id)">{{item.name}}</div>
                                    <div class="userother_content_block_text" v-html="item.description.length > 150 ? item.description.substr(0,150) + '...' : item.description"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>
        <commentFoot></commentFoot>

        <el-dialog title="我要提问" :visible.sync="dialogFormVisible" width="30%" >
            <el-form :model="askForm" ref="askForm" :rules="rules">
                <el-form-item prop="title">
                    <el-input v-model="askForm.title" placeholder="写下你的问题"></el-input>
                </el-form-item>
                <el-form-item prop="question">
                    <el-input v-model="askForm.question" type="textarea" cols="10" rows="10" placeholder="详细说明你的问题,以便获得更好的答案"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog_foot" @click="onSubmit">
                <div class="dialog_footer">提交</div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import "@static/css/medical_information/userother.less"
import commonHeader from '@/components/commonHeader.vue';
import commentFoot from '@/components/commentFoot.vue';
import { getCheckAPI , classicalAPI , getShareAPI , getEbookAPI  , relevantMedicalAPI , getquestionAPI , attentionAPI, cancelAttentionAPI , getAskAPI} from '@/api/medical/medical'
import { uploadUrl } from '@/utils/global'
import Cookies from "js-cookie";

export default {
    name: 'userother',
    components: {  commonHeader , commentFoot },
    data(){
        return{
            id:null,
            authorId:null,
            uploadUrl: uploadUrl,
            tabPosition:"top",
            list: [],
            total: null,
            total1: null,
            pageIndex: '',
            shareList: [],
            ebookList: [],
            expertList: [],
            doctorList: [],
            form: {},
            askForm: {
                title:'',
                question: '',
                source: 2,
                proId: null
            },
            dialogFormVisible: false,
            listQuery: {
                pageNum: 1,
                pageSize: 20
            },
            query: {
                pageNum: 1,
                pageSize: 10
            },
            rules: {
                title: [{required: true, message: '请输入问题'}, { pattern: /^.{1,50}$/, trigger: 'change', message: '长度在50字以内' }],
                question: [{ message: '请输入问题描述'}, { pattern: /^.{1,1000}$/, trigger: 'change', message: '请输入1000字以内的问题描述'}]
            },
            resourceForm: {
                "goodsList": [
                    {
                    "id": this.$route.query.id,
                    "type": "2"
                    }
                ],
                "memberType": Cookies.get('userType')
            },
            activeName: 'first',
            cancel: true,
            off: false,
            fatherId: this.$route.query.id,
            userType: '',
            authorId: null,
            replyCancel: true,
            extend: false,
            on: true,
            lastPage:0,
            lastPage1:0,
            total1:null,
            isShowAlert:false,
            bindClass:false
        }
    },
    created() {
        // 判断是专家用户还是普通用户，普通用户userType为0，专家用户userType为1
        if(Cookies.get('userType')) {
            this.userType = Cookies.get('userType')
            if(this.userType == 1  || this.userType == 2) {
                this.cancel = false
            }
        }
        this.id = this.$route.query.id;
        if(Cookies.get('authorId')) {
            this.authorId = Cookies.get('authorId')
            if(this.authorId == this.id) {
                this.replyCancel = true
            } else {
                this.replyCancel = false;
            }
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.checkDoctor(this.id)
        this.getShare()
        this.getclassical()
        this.getEbook()
        this.getExpert()
        this.$nextTick(()=>{
            this.relevantMedical();
        })
        
        this.authorId=Cookies.get("authorId")//判断是否是医家本人
        window._bd_share_main ? window._bd_share_main.init() : this.setShare()
        // if(this.id == this.id) {
        //     this.activeName = 'fourth'
        // }
    },
    methods: {
        sendSonData(val){
            let self=this;
            self.isShowAlert=false;
        },
        // 查询名医
        checkDoctor(id) {
            getCheckAPI(id).then(res => {
                console.log(res,'25252525');
                this.form = res.data.data;
                if(this.form.description.length > 200) {
                    this.extend = true
                } else {
                    this.extend = false
                }
                if(this.form.institutionName == null || this.form.institutionName == '') {
                    this.on = false
                } else {
                    this.on = true
                }
                this.$nextTick(()=>{
                    this.relevantMedical()
                })
                
            })
        },
        //展开按钮的事件
        clickShowBtn() {
            this.bindClass = true;
            this.extend = false;
        },
        // 提问
        question() {
            if(Cookies.get("Y-Token")){
                this.$nextTick(() => {
                this.$refs['askForm'].resetFields();
            })
            if(this.form.isConcerned == 1) { 
                this.dialogFormVisible = true;
            } else {
                this.$message.warning('关注后可向专家提问')
            }
            }else{
                this.isShowAlert=true;
            }  
        },
        onSubmit() {
            this.$refs['askForm'].validate((valid) => {
                if(valid) {
                    this.askForm.proId = this.id
                    getAskAPI(this.askForm).then(res => {
                        if(res.data.code === 0) {
                            this.$message.success('提问成功');
                            this.dialogFormVisible = false;
                            this.$refs['askForm'].resetFields();
                            this.getList()
                        }
                    })
                }
            })
            
        },
        // 关注
        attention() {
            if(Cookies.get("Y-Token")){
                this.resourceForm.goodsList[0].id = this.id
                attentionAPI(this.resourceForm).then(res => {
                    if(res.data.code == 0) {
                        this.$message.success('关注成功')
                        this.checkDoctor(this.id)
                    }
                })
            }else{
                this.isShowAlert=true;
            }
            
        },
        // 取消关注
        cancelAtte() {
            this.resourceForm.goodsList[0].id = this.id
            cancelAttentionAPI(this.resourceForm).then(res => {
                console.log(res);
                if(res.data.code == 0) {
                    this.$message.warning('已取消关注')
                    this.checkDoctor(this.id)
                }
            })
        },
        // 经典医案
        getclassical() {
            this.listQuery = {
                authorId: this.id,
                resourceType: 35
            }
            classicalAPI(this.listQuery).then(res => {
                this.list = res.data.data.list
                this.total = res.data.data.total;
                let regex = /,|，|\\s+/;
                res.data.data.list.map(node => {
                    if(node.keywords == null || node.keywords == '') {
                        return
                    } else {
                        return node.keyword = node.keywords.split(regex)
                    }
                })
            })
        },
        // 相关分享
        getShare() {
            // this.query = {
            //     creater: this.id
            // }
            this.query.creater= this.id
            getShareAPI(this.query).then(res => {
                console.log(res.data.data,8888888)
                this.shareList = res.data.data.list||[];
                this.total1 = res.data.data.total||null;
                this.lastPage1 = Math.ceil(Number(res.data.data.total) / Number(this.query.pageSize));
                let regex = /,|，|\\s+/;
                this.shareList.map(node => {
                    if(node.keywords == null || node.keywords == '') {
                        return 
                    } else {
                        return node.keyword = node.keywords.split(regex);
                    }
                })
            })
        },
        // 医学著作
        getEbook() {
            // this.query = {
            //     authorId: this.id
            // }
            this.query.authorId= this.id
            getEbookAPI(this.query).then(res => {
                this.ebookList = res.data.data.list;
                this.total1 = res.data.data.total;
                this.lastPage1 = Math.ceil(Number(res.data.data.total) / Number(this.query.pageSize));
            })
        },
        // 专家答疑
        getExpert() {
            // this.query = {
            //     proId: this.id
            // }
            this.query.proId= this.id
            getquestionAPI(this.query).then(res => {
                console.log(res.data.data,33333325)
                this.expertList = res.data.data.list;
                this.total1 = res.data.data.total;
                console.log(res.data.data.total)
                console.log(this.query.pageSize)
                this.lastPage1 = Math.ceil(Number(res.data.data.total) / Number(this.query.pageSize));
                
            })
        },
        // 相关名医
        relevantMedical () {
            relevantMedicalAPI({
                num: 5,
                nationsType: this.form.nationsType
            }).then(res => {
                this.doctorList = res.data.data;
            })
        },
        /*接受搜索传过来的值*/
        childByValue(childValue) {
            this.searchVal = childValue;
        },
        handleClick(tab, event) {
            console.log(tab,'123123123');
            
            this.pageIndex = tab.index;
            this.query = {
                pageNum: 1,
                pageSize: 10
            }
            if(tab.index == 1) {
                this.query
                this.off = true
                this.getShare()
            }else if(tab.index == 2)  {
                this.query
                this.off = false
                this.getEbook()
            } else if(tab.index == 3) {
                this.query
                this.off = false
                this.getExpert()
            } else {
                this.off = false
            }
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            this.getclassical()
            window.scrollTo(0, 0)
        },
        handleChange(val) {
            this.query.pageNum = val
            if(this.pageIndex == 1) {
                this.getShare()
            } else if(this.pageIndex == 2) {
                this.getEbook()
            } else if(this.pageIndex == 3) {
                this.getExpert()
            }
            window.scrollTo(0, 0)
        },
        linkShowUser(id){//展示其他医家内容
            let Id=id;
            this.id = Id
            this.checkDoctor(Id);
            this.getclassical()
            this.getShare()
            this.getEbook()
            this.getExpert()
            this.relevantMedical()
        },
        setShare(){//分享插件
            //console.log(this.$refs.share_wrap,"666666666")
            window._bd_share_config={
                "common":{
                    "bdSnsKey":{},
                    "bdText":"",
                    "bdMini":"2",
                    "bdMiniList":false,
                    "bdPic":"",
                    "bdStyle":"0",
                    "bdSize":"16"
                },
                "share":{},
                // "selectShare":{
                //     "bdContainerClass":null,
                //     "bdSelectMiniList":["weixin","tsina","douban","qzone"]
                // }
            };
            //const $el = document.querySelector('#baiduShare')
            //console.log($el,"$elllllllll")
            //$el&&this.$refs.share_wrap.removeChild($el)
            const shareDome = document.createElement('script');
            shareDome.type = 'text/javascript';
            shareDome.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
            //console.log(shareDome,"document.body")
            this.$refs.share_wrap.appendChild(shareDome);
            // 百度分享有自动销毁的逻辑，加这么一段代码   重新初始化就没问题了。
            if (window._bd_share_main) {
                window._bd_share_main.init();
            }
        },
    }

}
</script>

<style lang="less" scoped>
.userother_top_content_text{
    p{
        height:60px;
        overflow:hidden;
    }
    .textDescShow{
        overflow:initial;
    }
}

</style>
