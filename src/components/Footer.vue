<template>
  <div class="page">
    <div class="footer">
      <!-- <div class="footerText">
          <p v-for="(item,index) in footerList" :key="item.id" style="display:inline">
            <router-link :to="{path:'/aboutUs',query:{id:item.id}}">
              <span>{{item.title}}</span>
            </router-link>
            <i v-if="index != footerList.length-1">|</i>
          </p>
      </div> -->
      <!-- <div class="footerText" v-html="dictionaryText"></div> -->
      <div class="aboutUs">
        <p v-for="(item,index) in footerList" :key="item.id" style="display: inline">
          <router-link :to="{path: '/aboutUs', query: {id: item.id}}" style="color: #333333;">
            <span>{{item.title}}</span>
          </router-link>
          <i v-if="index != footerList.length - 1">|</i>
          <!-- <span>关于我们</span>|<span>版权声明</span>|<span>联系我们</span>|<span>购买须知</span> -->
        </p>
      </div>
      <div class="footerText" style="cursor: auto" v-html="dictionaryText"></div>
      <div class="indexText"><span> 地　　址  ：</span>北京市东直门内南小街16号<span>电　　话：</span>010-64089446</div>
    </div>
    <div class="tips">温馨提示，为了获得最佳用户体验，建议您使用Chrome，Firefox，IE9+，360浏览器极速模式</div>
  </div>
</template>


<script>
import {  footerAPI , dictionaryAPI } from '@/api/common'

export default {
    data () {
      return {
        footerList: [],
        dictionaryText: null,
        footerQuery: {
          pageNum: 1,
          pageSize: 4
        }
      }
    },
    mounted () {
      this.getFooter()
      this.getdictionary()
    },
    methods: {
      getFooter () {//页脚
        footerAPI(this.footerQuery).then(res => {
          console.log(res);
          this.footerList = res.data.data.list
        })
      },
      // 底部版权
      getdictionary() {//底部版权
        dictionaryAPI().then(res => {
          this.dictionaryText = res.data.data.value
        })
      },
    }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
}
.footer{
  height: 200px;
  background-image: url(../../src/assets/images/homepage/footer_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.footerText,.aboutUs{
  text-align: center;
  margin: 20px 0;
  color:#333333;
}
.aboutUs{
  margin-top: 50px;
  span {
    display: inline-block;
    margin: 0 15px;
  }
}
.indexText{
  text-align: center;
  margin: 20px 0;
  color:#333333;
  margin-bottom: 50px;
  span{
    margin-left: 30px;
  }
}
.tips{
  height: 40px;
  background: #292929;
  text-align: center;
  color: #818181;
  line-height: 40px;
  font-size: 14px;
}
</style>

