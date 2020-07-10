<template>
    <!-- <div v-loading="loading"> -->
        <div class="sub_right" v-loading="loading">
            <div class="sub_rightsearch">
                <div class="sub_rightimg">
                    <input type="text" class="input" placeholder="———— 请输入要查询的关键字 ————" v-model="listQuery.search" @input="clear">
                    <img src="@/assets/images/medical/information-searchbutton.png"  @click="search">
                </div>
            </div>
            <div v-if="list.length != 0">
                <div class="sub_rightCon">
                    <div v-for="item in list" :key="item.id">
                        <router-link  :to="{path: '/medicalDetails', query: {id: item.id,arr:[{meta: { title: '医药资讯' },path:'/information'}]}}">
                            <div class="sub_rightcontent" >
                                <div class="sub_rightcontentimg"></div>
                                <div class="sub_rightcontenttop" v-if="item.topStatus == 1">置顶</div>
                                <div class="sub_rightcontentli">
                                    {{item.title?item.title.length>25?item.title.substring(0,25)+'...':item.title:''}}
                                </div>
                                <div class="sub_rightcontentdate">{{item.releaseTime}}</div>
                            </div>
                        </router-link>
                    </div>
                    
                </div>
                <div class="pagination_box">
                    <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                    <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
                </div>
            </div>
            <div v-if="total == 0" style="width: 600px; margin: 100px auto;">
                <img src="@/assets/images/home/no-content.jpg">
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import "@static/css/medical_information/index.less"
import "@static/css/common.less"
import { getListAPI } from '@/api/medical/medical'

export default {
    name: 'information',
    data () {
        return {
            total: null,
            listQuery: {
                pageNum: 1,
                pageSize: 15,
                name: '医药资讯',
                search: null
            },
            list: [],
            loading: true,
            lastPage:0,
        }
    },
    mounted () {
        this.getList();
        // if(this.listQuery.search == '') {
        //     this.getList()
        // }
    },
    methods: {
        // 搜索
        search() {
            this.getList()
        },
        
        clear() {
            if(this.listQuery.search == '') {
                this.getList()
            }
        },
       
        // 获取列表
        getList() {
            getListAPI(this.listQuery).then(res => {
                console.log(res.data.data.total,'oooooo');
                this.loading = true
                if(res.data.code === 0) {
                    this.list = res.data.data.list
                    this.total = res.data.data.total
                    this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
                } else {
                    this.$message.error('获取数据失败,请稍后重试!')
                }
                this.loading = false
            })
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

    },
}
</script>

<style>
    
</style>
