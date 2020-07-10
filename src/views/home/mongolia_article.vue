<template>
    <div id="mongolia_article">
        <commonHeader :nationsType="this.nationsType"></commonHeader>
        <div class="mongolia_article_content">
            <!-- 右侧花 -->
            <div class="mongolia_article_rightbg"></div>

            <!-- 中间内容 -->
            <div class="mongolia_article_wrap">
                <navbar></navbar>
                <!-- <div class="mongolia_article_location">
                    <img src="@/assets/images/medical/location.png">
                    <span>您的当前位置:首页&nbsp;&nbsp;&gt;&nbsp;&nbsp;蒙古族&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
                    <span>蒙文文章</span>
                </div> -->
                <div class="mongolia_article_main">
                    <div class="mongolia_article_list" v-for="item in list" :key="item.id">
                        <router-link :to="{path: '/pdfread', query: {id: item.id, arr:[{meta: { title: '蒙文文章' },path:'/mongoliaArticle'}]}}">
                            <div class="whole_conTitle">
                                <img v-if="item.isPdf == 1" src="@/assets/images/home/pdf.png"> 
                                <img v-if="item.isVideo == 1" src="@/assets/images/home/video.png"> 
                                <img v-if="item.isAudio == 1" src="@/assets/images/home/audio.png"> 
                                {{item.title}}
                            </div>
                        </router-link>
                        <div class="whole_conText">{{item.synopsis&&item.synopsis.length>150?item.synopsis.substring(0,150)+'...':item.synopsis}}</div>
                        <div class="whole_conTip">
                            <div class="whole_contipLeft">
                                <div class="whole_realPrice" v-if="item.realPrice == null">未定价</div>
                                <div class="whole_free" v-if="item.realPrice == 0">免费</div>
                                <div v-else class="whole_price_count">
                                    <div class="whole_price">￥{{item.realPrice}}</div>
                                    <div class="whole_discount" v-if="item.price != null">￥{{item.price}}<span v-if="item.discount != null">({{item.discount}}折)</span></div>
                                </div>
                                <div class="whole_fax"><img src="@/assets/images/home/eye.png"><span>{{item.browseNum}}次浏览</span></div>
                                <div class="whole_source" v-if="item.bookName!=null||item.source!=null">
                                    来源:
                                    <router-link :to="{path: '/medetails', query:{id: item.id}}" v-if="item.bookId">
                                        <span class="whole_source_blue">《{{item.bookName}}》</span>
                                    </router-link>
                                    <span style="color: #999999" v-else>《{{item.source}}》</span>
                                </div>
                            </div>
                            <router-link :to="{path: '/pdfread', query: {id: item.id}}" >
                                <div class="whole_contRight" v-if="item.isStatus == 0">
                                    <i></i>
                                    阅读
                                </div>
                            </router-link>
                           <div class="whole_contRightcar" @click="addCart(item.id,item.goodsType)" v-if="item.isStatus === 1">
                                加入购物车
                            </div>
                            <div class="whole_contGray" v-if="item.isStatus === 2">加入购物车</div>
                        </div>
                    </div>
                     
                </div>

                <div class="pagination_box">
                    <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                    <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
                </div>
            </div>
            
            <!-- 左侧花 -->
            <div class="mongolia_article_leftbg"></div>
        </div>

        <commentFoot></commentFoot>

        
    </div>
</template>

<script>
import commonHeader from '@/components/commonHeader'
import commentFoot from '@/components/commentFoot'
import navbar from '@/components/navbar.vue';
import "@static/css/home/mongolia_article.less"
import "@static/css/common.less"
import { getListAPI } from '@/api/home/mongolia_article'
import { shopCartAPI } from '@/api/common'

export default {
    components: { commonHeader , commentFoot , navbar },
    data () {
        return {
            list: [],
            total: null,
            listQuery: {
                pageNum: 1,
                pageSize: 20,
                resourceType: 50
            },
            id: null,
            lastPage:0,
            nationsType:1
        }
    },
    created () {
        this.id = this.$route.query.id;
    },
    mounted () {
        this.getList()
    },
    methods: {
        // 获取列表
        getList() {
            getListAPI(this.listQuery).then(res => {
                if(res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));

                }
            })
        },
        // 加入购物车
        addCart(id,type) {
            if(this.$store.state.userToken){//判断是否登录
            shopCartAPI({
                goodsId: id,
                goodsType: type,
                num: 1
            }).then(res => {
                if(res.data.code>0) {
                this.$message.error(res.data.msg)
                } else if(res.data.code<0) {
                this.$message.error('添加购物车失败，请稍后再试')
                } else{
                this.$message.success('商品已加入购物车！')
                }
            })
            } else{
            this.isShowAlert=true;
            }
        },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNum = val
        //     this.getList()
        //     window.scrollTo(0, 0)
        // },
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

