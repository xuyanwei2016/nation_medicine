<template>
    <div id="message-details">
        <Header></Header>
        <div class="message_content">
            <div class="message_wrap">
                <!--面包屑-->
                <navbar></navbar>
                <div class="message_main">
                    <div class="message_main_top">
                        <div class="message_main_top_left">
                            <div class="message_main_top_left_info" @click="infoMessage" :class="cancel == true ? 'fontSize' : ''">
                                系统消息
                                <div class="message_main_top_left_num is-fixed" v-if="form.total != 0">{{form.total}}</div>
                            </div>
                            <span class="message_main_top_line" v-if="!open">/</span>
                            <div class="message_main_top_left_info" v-if="!open" @click="infoAnswer" :class="cancel == true ? '' : 'fontSize'">向我提问</div>
                        </div>

                        <div class="message_main_top_right" v-if="off"  @click="delInfo">清空消息</div>
                    </div>

                    <!-- 系统消息列表 -->
                    <div class="message_main_bot" v-if="cancel">
                        <div class="message_main_bot_wrap">
                            <div v-if="list.length != 0">
                                <div class="message_main_bott_wrap" @mouseenter="showHide(item.id)" @mouseleave="hide" v-for="item in list" :key="item.id">
                                    <router-link :to="{path: '/messageDetails', query: {id: item.id,arr:[{meta: { title: '消息' },path:'/message'}]}}">
                                        <div class="message_main_bot_circle" v-if="item.status == 0"></div>
                                        <div class="message_main_bot_title" >{{item.title}}</div>
                                    </router-link>
                                    <div class="message_main_bot_time">{{item.sendTime}}</div>
                                    <div class="message_main_bot_text">{{item.content}}</div>
                                    <div class="message_main_bot_del" @click="del(item.pmmId)" v-if="show && item.id == id"><img src="@/assets/images/personal/del_ico.png">删除</div>
                                </div>
                            </div>
                            <div class="message_main_no_message" v-else>
                                <img src="@/assets/images/home/no-message.jpg">
                            </div>
                        </div>
                        
                        <div class="pagination_box" v-if="list.length > 0">
                            <pagination  class="paddingTop" @change="pageChange"
                                :current-page="listQuery.pageNum"
                                :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                            <!-- <el-pagination  :page-size="listQuery.pageSize" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"   layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
                        </div>
                    </div>
                        
                    <!-- 向我提问列表 -->
                    <div class="message_main_bot" v-if="!cancel">
                        <div class="message_main_bot_wrap">
                            <div v-if="answerList.length != 0">
                                <div class="message_main_bott_main" v-for="item in answerList" :key="item.id" @mouseenter="showHide(item.id)" @mouseleave="hide">
                                    <div class="message_main_bot_title">
                                        {{item.userName}}向您提问，
                                        <router-link v-if="item.replyContent == null" :to="{path: '/expertsLeave', query: {id: item.id}}">{{item.title}}</router-link>
                                        <router-link v-else :to="{path: '/leave', query: {id: item.id}}">{{item.title}}</router-link>
                                    </div>
                                    <div class="message_main_bot_time">{{item.releaseTime}}</div>
                                </div>
                            </div>
                            <div class="message_main_no_message" v-else>
                                <img src="@/assets/images/home/no-record.jpg">
                            </div>
                        </div>
                        <div class="pagination_box" v-if="answerList.length > 0">
                            <pagination  class="paddingTop" @change="pageChangeList"
                                :current-page="query.pageNum"
                                :page-size="query.pageSize" :total-page="lastPage1"></pagination>
                            <!-- <el-pagination  :page-size="query.pageSize" @current-change="handleChange" :current-page="query.pageNum"   layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- 清空消息对话框 -->
            <el-dialog title="提示" :visible.sync="DialogVisible" width="20%">
                <div class="el-dialog_text">确定清空全部消息？</div>
                
                <div class="dialog_foot">
                    <div class="dialog_confirm" @click="confirm">确定</div>
                    <div class="dialog_cancel" @click="DialogVisible = false">取消</div>
                </div>
            </el-dialog>

            <!-- 删除对话框 -->
            <el-dialog title="提示" :visible.sync="delDialogVisible" width="20%">
                <div class="el-dialog_text">确定要删除当前记录吗?</div>
                <div class="dialog_foot">
                    <div class="dialog_confirm" @click="confir">确定</div>
                    <div class="dialog_cancel" @click="delDialogVisible = false">取消</div>
                </div>
            </el-dialog>
        </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import navbar from '@/components/navbar.vue';
import Footer from '@/components/Footer' 
import '@static/css/personal/message.less'
import '@static/css/common.less'
import { getListAPI , delInfoAPI , deleAPI , getListsAPI, getunreadAPI} from '@/api/home/message'
import Cookies from "js-cookie";


export default {
    components: { Header,  Footer, navbar },
    data () {
        return {
            listQuery: {
                pageNum: 1,
                pageSize: 15
            },
            query: {
                pageNum: 1,
                pageSize: 15
            },
            list: [],
            answerList: [],
            show: false,
            id: null,
            pmmId: null,
            DialogVisible: false,
            delDialogVisible: false,
            cancel: true,
            open: true,
            off: true,
            form: {
                total: null
            },
            message: null,
            userType: null,
            userId: null,
            total:null,
            lastPage:0,
        }
    },
    created() {
        // 判断是专家用户还是普通用户，普通用户userType为0，专家用户userType为1
        if(Cookies.get('userType')) {
            this.userType = Cookies.get('userType')
            if(this.userType == 1) {
                this.open = false
            } else {
                this.open = true
            }
        }
        this.getList()

    },
    mounted() {
      this.infoMessage()
      this.getunread()
    },
    methods: {
        // 系统消息
        infoMessage() {
            this.getList()
            this.listQuery = {
                pageNum: 1,
                pageSize: 15
            }
            this.cancel = true
        },
        // 未读消息
        getunread() {
            getunreadAPI().then(res => {
                console.log(res,'vvvvvvv');
                this.form.total = res.data.data;
            })
        },
        // 获取系统消息列表
        getList() {
            getListAPI(this.listQuery).then(res => {
                this.list = res.data.data.list
                this.total = res.data.data.total
                this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
                this.message = this.list.length;
                res.data.data.list.map(el => {
                el.sendTime=el.sendTime.slice(0,el.sendTime.length-5)
                })
                if(this.total == 0) {
                this.off = false
                }
            })
        },
        //  向我提问
        infoAnswer() {
            this.off = false
            this.query = {
                pageNum: 1,
                pageSize: 15,
                proId: Cookies.get('authorId')
            }
            this.getAnswerList()
            this.cancel = false;
        },
        //  获取向我提问列表
        getAnswerList() {
            getListsAPI(this.query).then(res => {
                console.log('bbbbbbbbbbbbbbb',this.query);
                
                this.answerList = res.data.data.list;
                this.total = res.data.data.total;
                this.lastPage1 = Math.ceil(Number(res.data.data.total) / Number(this.query.pageSize));
                res.data.data.list.map(el => {
                    el.releaseTime=el.releaseTime.slice(0,el.releaseTime.length-3)
                })
            })
        },
        //  清空消息
        delInfo() {
            this.DialogVisible = true
        },
        
        confirm() {
            delInfoAPI().then(res => {
                if(res.data.code === 0) {
                    this.$message.success('清空成功');
                    this.DialogVisible = false
                    this.getList()
                    // this.off = true
                }
            })
        },

        // 删除
        del(pmmId) {
            this.pmmId = pmmId
            this.delDialogVisible = true
        },

        confir() {
            deleAPI(this.pmmId).then(res => {
                console.log("bbbbbbbb",this.pmmId);
                if(res.data.code === 0) {
                    this.$message.success('删除成功');
                    this.delDialogVisible = false
                    this.getList()
                
                }
            })
        },
        
        // 删除标签显示或隐藏
        showHide(id) {
            this.show = true;
            this.id = id
        },

        hide() {
            this.show = false;
        },

        // // 翻页
        // handleCurrentChange(val) {
        //     this.listQuery.pageNum = val
        //     this.getList()
        //     window.scrollTo(0, 0)
        // },

        // handleChange(val) {
        //     this.query.pageNum = val
        //     // this.query.pageNum = 1;
        //     console.log(this.query.pageNum);

        //     this.getAnswerList()
        //     window.scrollTo(0, 0)
        // },

        linkHref(id){
            // this.$rou
        },
        // 分页
        pageChange(val) {
            console.log('切换page')
            this.listQuery.pageNum = val
            this.getList();
            window.scrollTo(0, 0)
        },
        pageChangeList(val) {
            console.log('切换page')
            this.query.pageNum = val
            this.getAnswerList();
            window.scrollTo(0, 0)
        },
    }
}

</script>

<style>

</style>
