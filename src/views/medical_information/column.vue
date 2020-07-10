<template>
    <div class="sub_right" v-loading="loading">
        <div class="sub_rightsearch">
            <div class="sub_rightimg">
                <input type="text" class="input" placeholder="———— 请输入要查询的关键字 ————" v-model="listQuery.search" @input="clear">
                <img src="@/assets/images/medical/information-searchbutton.png" @click="search">
            </div>
        </div>
        <div v-if="list.length != 0">
            <div class="sub_rightCon">
                <router-link :to="{path: '/medicalDetails', query: {id: item.id,arr:[{meta: { title: '考试专栏' },path:'/column'}]}}" v-for="item in list" :key="item.id">
                    <div class="sub_rightcontent" >
                        <div class="sub_rightcontentimg"></div>
                        <div class="sub_rightcontenttop" v-if="item.topStatus == 1">置顶</div>
                        <div class="sub_rightcontentli">{{item.title?item.title.length>25?item.title.substring(0,25)+'...':item.title:''}}</div>
                        <div class="sub_rightcontentdate">{{item.releaseTime}}</div>
                    </div>
                </router-link>
            </div>
            <div class="pagination_box" >
                <pagination @change="pageChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" :total-page="lastPage"></pagination>
                <!-- <el-pagination  @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageSize" layout="prev, pager, next, total, jumper" :total="total"></el-pagination> -->
            </div>
        </div>
        <div v-if="total == 0" style="width: 600px; margin: 100px auto;">
            <img src="@/assets/images/home/no-content.jpg">
        </div>
    </div>
</template>

<script>
import "@static/css/medical_information/index.less"
import "@static/css/common.less"
import { getListAPI } from '@/api/medical/medical'

export default {
    name: 'column',
    data () {
        return {
            total: null,
            list: [],
            listQuery: {
                pageNum: 1,
                pageSize: 15,
                name: '考试专栏',
                search: null
            },
            loading: true,
            lastPage:0,
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        // 获取列表 
        getList() {
            getListAPI(this.listQuery).then(res => {
                this.loading = true
                if(res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.lastPage = Math.ceil(Number(res.data.data.total) / Number(this.listQuery.pageSize));
                }
                this.loading = false
            })
        },
        // 搜索
        search() {
            this.getList()
        },
        // 清空
        clear() {
            if(this.listQuery.search == '') {
                this.getList()
            }
        },
        // handleCurrentChange(val) {
        //     this.listQuery.pageNum = val
        //     this.getList()
        // }
        // 分页
        pageChange(val) {
            console.log('切换page')
            this.listQuery.pageNum = val
            this.getList();
            // window.scrollTo(0, 0)
        },
    },
}
</script>

<style>

</style>
