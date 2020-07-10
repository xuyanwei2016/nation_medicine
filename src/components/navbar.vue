<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <img src="@/assets/images/medical/location.png" class="location_img">
    <span class='text active'>您的当前位置：</span>
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
      <span @click="changePage(item,index)" class="active" style="cursor: pointer;">{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'navbar',
  props: {
      message: String,
  },
  data() {
    return{
      levelList: null,
    }
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      let index = [{ path: '/index', meta: { title: '首页' }}]
      if (this.$route.query.arr) {
        matched = index.concat(this.$route.query.arr).concat(matched)
      } else{
        matched = index.concat(matched)
      }
      //console.log(this.$route.query,"hehehe")
      this.levelList = matched;
    },
    changePage(item,index) {
      if(index < this.levelList.length-1) {
        if(this.message != null){
          this.$router.push({path:item.redirect||item.path,query: { id: this.message }})
        } else{
          this.$router.push({path:item.redirect||item.path})
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .app-breadcrumb{
    height: 60px;
    line-height: 60px;
  }
  .location_img{
    float: left;
    margin-top: 19px !important;
    margin-right: 8px;
  }
  .text{
    float: left;
  }


  .el-breadcrumb{
    span:last-child{
      span:last-child{
        color:#2473D6
      }

    }
  }

  span {
    &.active {
      color: #999999;
    }
  }

</style>

