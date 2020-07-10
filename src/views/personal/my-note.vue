<template>
<div>
    <div class="note_title">我的笔记</div>
    <div class="note_list">
        <div class="note_search">
            <NoteSearch></NoteSearch>
            <div class="search_right">
                <input type="checkbox">全选
                <a href="#">批量删除</a>
                <a href="#">导出</a>
            </div>
        </div>
        <div class="note_wrap">
            <div class="note_article">
                <div class="note_checkbox"><input type="checkbox"></div>
                <div class="note_articlecon">
                    <div class="note_articlecon1">运气学说内容庞杂玄妙，历代医家对此褒贬不一，但多数医家均认为此为中医学之大关键。至当代李阳波先生论运气，将内经中亢害承制之说落到了实处。当归中医学堂邀请到老师与大家分享此中奥妙，历代医家对此褒贬不一多数医家均认为兼论诸家得失兼论诸家得失兼论诸家得失兼论诸家得失</div>
                    <div class="note_tip">
                        <p>笔记内容：</p>
                        <p>如果你拿着A+作品去面试，由于你的作品没有商业价值，在经验丰富的面试官面前，其实是毫无竞争力的。这个是绝大部分的设计师都忽视的通病，也是你常常面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因</p>
                    </div>
                    <div class="note_articlefot">
                        <div class="note_source">来源：<span class="note_mongolia">《蒙古族医药》</span></div>
                        <div class="note_time">
                            <div class="note_time_bot_del"><img src="@/assets/images/personal/del_ico.png">删除</div>
                            <div class="note_time_bot_time">2018-10-31 10:15:30</div>
                        </div>
                        <!-- <span><img src="@/assets/images/personal/del_ico.png">删除</span>
                        <span>2018-10-31 10:15:30</span> -->
                    </div>
                </div>
            </div>
            <div class="note_article">
                <div class="note_checkbox"><input type="checkbox"></div>
                <div class="note_articlecon">
                    <div class="note_articlecon1">运气学说内容庞杂玄妙，历代医家对此褒贬不一，但多数医家均认为此为中医学之大关键。至当代李阳波先生论运气，将内经中亢害承制之说落到了实处。当归中医学堂邀请到老师与大家分享此中奥妙，历代医家对此褒贬不一多数医家均认为兼论诸家得失兼论诸家得失兼论诸家得失兼论诸家得失</div>
                    <div class="note_tip">
                        <p>笔记内容：</p>
                        <p>如果你拿着A+作品去面试，由于你的作品没有商业价值，在经验丰富的面试官面前，其实是毫无竞争力的。这个是绝大部分的设计师都忽视的通病，也是你常常面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因面试碰壁的根本原因</p>
                    </div>
                    <div class="note_articlefot">
                        <div class="note_source">来源：<span class="note_mongolia">《蒙古族医药》</span></div>
                        <div class="note_time">
                            <div class="note_time_bot_del"><img src="@/assets/images/personal/del_ico.png">删除</div>
                            <div class="note_time_bot_time">2018-10-31 10:15:30</div>
                        </div>
                        <!-- <span><img src="@/assets/images/personal/del_ico.png">删除</span>
                        <span>2018-10-31 10:15:30</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination_box">
            <el-pagination  :page-size="listQuery.pageSize" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"   layout="prev, pager, next, total, jumper" :total="total"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import '@static/css/personal/my-note.less'  
import '@static/css/common.less'
import NoteSearch from '@/components/NoteSearch.vue' 

export default {
    name: 'note',
    components:{
        NoteSearch
    },
    data () {
        return {
            listQuery: {
                pageNum: 1,
                pageSize: 15
            }
        }
    },
    mounted() {
        
    },
    methods: {
        // 翻页
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            // this.getList()
            window.scrollTo(0, 0)
        },
    },
}
</script>

<style>

</style>
