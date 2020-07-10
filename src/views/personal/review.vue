<template>
  <div id="review">
    <Header></Header>
    <div style="width:1200px;margin:0 auto;">
       <navbar></navbar>
    </div>
    <div class="review_content">
      
      <div class="review_topic">发表评论</div>
      <div class="review_list" v-for="item in list" :key="item.id">
        <div class="review_left">
          <img src="@/assets/images/personal-center/listimage.png" v-if="item.type == '2-1'">
          <p v-if="item.type == '2-1'">
            {{item.name.length >20 ?item.name:item.name.substr(0,20)}}
            <span v-if="item.name.length>20">...</span>
          </p>
          <p v-else class="review_name">
            <span style="display:inline-block;width:80%;">
              {{item.name.length >50 ?item.name:item.name.substr(0,50)}}
              <span v-if="item.name.length>50">...</span>
            </span>
          </p>
        </div>
        <div class="review_right">
          <div class="review_rightCon">
            <span class="review_title">商品评分</span><el-rate v-model="item.score"></el-rate>
          </div>
          <div class="review_rightCon">
            <span class="review_title">发表评论</span>
            <el-input type="textarea" :rows="5" placeholder="商品这么赞，快来评论吧~" v-model="item.content">
            </el-input>
          </div>
        </div>
      </div>
      <div class="review_btn" @click="submitReview">发表评论</div>
    </div>  
    <Footer></Footer>
  </div>
</template>

<script>
import "@static/css/personal/review.less";
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import navbar from '@/components/navbar.vue'
import { uploadUrl } from '@/utils/global'
import { getReviewAPI, reviewAPI } from '@/api/order/review'

export default {
  name: 'bookshelf',
  data(){
    return {
      reviewId: this.$route.query.id,
      uploadUrl: uploadUrl,
      list:[],
      textarea:null,
      value1:null,
      infoList:[],
    }
  },
  created(){
    this.getList()
  },
  components:{
    Footer,
    Header,
    navbar
  },
  methods:{
    getList() {
      getReviewAPI({id:this.reviewId}).then(res =>{
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('数据加载失败，请稍后再试')
        } else if(res.data.code == 0){
          res.data.data.map(el => {
            el.content = null,
            el.score = null
          })
          this.list = res.data.data
        }
      })
    },
    submitReview() {//发表评论
      let infoList = []
      this.list.map(el => {
        infoList.push({id: el.id,content: el.content,score: el.score})
      })
      reviewAPI({id:this.reviewId,infoList}).then(res => {
        if(res.data.code >0) {
          this.$message.warning(res.data.msg)
        } else if (res.data.code <0) {
          this.$message.error('发表失败，请稍后再试')
        } else if(res.data.code == 0){
          this.$message.success('发表成功')
          this.$router.push('/order')
        }
      })
    },
  }
}
</script>