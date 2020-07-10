<template>
    <div class="sub_right" v-loading="loading">
        <div class="online_ques">
            <div class="online_left" v-if="cancel">
                <div class="online_text" @click="question"></div>
            </div>
            <div class="online_right">
                <div class="sub_rightimg">
                    <input class="input" type="text" placeholder="———— 请输入要查询的关键字 ————" v-model="listQuery.search" @input="clear" maxlength="30">
                    <img src="@/assets/images/medical/information-searchbutton.png" @click="search">
                </div>
            </div>
        </div>
        <div v-if="list.length != 0">
            <div class="online_content">
                <router-link :to="{path: '/leave', query: {id: item.id,arr:[{meta: { title: '在线咨询' },path:'/online'}]}}"  v-for="item in list" :key="item.id">
                    <div class="online_li" >
                        <div class="online_liLeft">
                            <img :src="`${uploadUrl}file/?fileName=${item.createrFaceimg}&isOnLine=true`" v-if="item.createrFaceimg">
                        </div>
                        <div class="online_liRight">
                            <div class="online_liTop">
                                <img src="@/assets/images/medical/ask-ico.png">
                                <div class="online_liTopLeft">
                                    <div class="online_liTopTitle">{{item.title}}</div>
                                </div>
                                <div class="online_liTopRight">{{item.releaseTime}}</div>
                            </div>
                            <div class="online_liBot" v-html="item.replyContent"></div>
                        </div>
                    </div>
                </router-link>
                
            </div>
            <div class="pagination_box">
                <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
            </div>
        </div>
        <div v-if="total == 0" style="width: 600px; margin: 100px auto;">
            <img src="@/assets/images/home/no-content.jpg">
        </div>

        <loginAlert :isShowChild="isShowAlert"  @toFatherData="sendSonData"></loginAlert>

        <el-dialog title="我要提问" :visible.sync="dialogFormVisible" width="30%" :append-to-body="true">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="title">
                    <el-input v-model="form.title" placeholder="写下你的问题"></el-input>
                </el-form-item>
                <el-form-item prop="question">
                    <el-input v-model="form.question" type="textarea" cols="10" rows="10" placeholder="详细说明你的问题，以便获得更好的答案"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog_foot">
                <el-button class="online_dialog_footer" @click="onSubmit()"  :loading="saveLoading">保存</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import "@static/css/medical_information/index.less"
import { getListsAPI , getAskAPI } from '@/api/medical/medical'
import { uploadUrl } from '@/utils/global'
import Cookies from 'js-cookie';

export default {
    name: 'online',
    data () {
        return {
            uploadUrl:uploadUrl,
            dialogFormVisible: false,
            list: [],
            total: null,
            form: {
                title: '',
                question: '',
                source: 1
            },
            listQuery: {
                pageNum: 1,
                pageSize: 15,
                search: null
            },
            rules: {
                title: [{required: true, message: '请输入问题'}, { pattern: /^.{1,50}$/, trigger: 'change', message: '长度在50字以内' }],
                question: [{required: true, message: '请输入问题描述'}, { pattern: /^.{1,1000}$/, trigger: 'change', message: '请输入1000字以内的问题描述'}]
            },
            timeList:[],
            isShowAlert:false,
            userImg: "",
            userName: "",
            userToken: "",
            userType: "",
            cancel: true,
            saveLoading: false,
            loading: true,
            lastPage:0,
        }
    },
    created() {
        // 判断是专家用户还是普通用户，普通用户userType为0，专家用户userType为1
        this.userType = Cookies.get('userType')
        if(this.userType) {
            if(this.userType == 2) {
                this.cancel = false
            } else {
                this.cancel
            }
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        // 搜索
        search() {
            this.getList()
        },
        // 清空输入框
        clear() {
            if(this.listQuery.search == '') {
                this.getList()
            }
        },
        /*子传父*/
        sendSonData(val){
            let self=this;
            self.isShowAlert=false;
        },
        getList() {
            getListsAPI(this.listQuery).then(res => {
                this.loading = true
                if(res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
                    res.data.data.list.map(el => {
                       el.releaseTime=el.releaseTime.slice(0,el.releaseTime.length-3)
                       if(el.replyContent == null || el.replyContent == '') {
                           return 
                       } else {
                           el.replyContent = el.replyContent && el.replyContent.length > 60 ? el.replyContent.substr(0,60)+'...' : el.replyContent
                       }
                    })
                }
                this.loading = false
            })
        },
        // 提问
        question() {
            this.saveLoading = false;
            if(this.$store.state.userToken) {
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['form'].resetFields();
                })
            } else {
                this.isShowAlert = true
                
            }
        },
        onSubmit() {
            if(this.form.title != '' && this.form.question != '') {
                this.saveLoading = true;
            } 
            this.$refs['form'].validate((valid) => {
                if(valid) {
                    getAskAPI(this.form).then(res => {
                        if(res.data.code === 0) {
                            this.$message.success('留言成功');
                            this.dialogFormVisible = false;
                            this.getList()
                        }
                    })
                }
            })
        },
        // responsed() {
        //     this.$router.push({path: '/leave'});
        // },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNum = val
        //     this.getList()
        //     window.scrollTo(0, 0)
        // }
        // 分页
        pageChange(val) {
            console.log('切换page')
            this.listQuery.pageNum = val
            this.getList();
            window.scrollTo(0, 0)
        },
    }
}
</script>

<style>

</style>
