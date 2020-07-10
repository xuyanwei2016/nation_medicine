<template>
    <div class="epidemicCom">
      <epidemicHeader v-if="$route.name!='epidemicEbook'"></epidemicHeader>
      <div class="epidemicBg" :style="{paddingBottom:$route.name=='epidemicEbook'?'0px':true}">
        <div class="rightBg">
      <router-view></router-view>
        </div>
      </div>
      <epidemicFoot v-if="$route.name!='epidemicEbook'"></epidemicFoot>

    </div>
</template>

<script>
  import '@/assets/css/font.css';
  import epidemicFoot from '../../components/epidemicFoot';
  import epidemicHeader from '../../components/epidemicHeader';
  export default {
    name: 'HelloWorld',
    data () {
      return {}
    },
    components:{epidemicFoot,epidemicHeader},
    created () {
    },
    watch: {},
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul,li,h1,h2,h3,h4,h5,p,span,div{margin: 0;padding: 0;list-style: none}
  .epidemicCom{ width: 100%;
    .epidemicBg {
      width: 100%;
      overflow: hidden;
      padding-bottom: 52px;
      background: url("../../assets/images/epidemic/pic_zuo.png") no-repeat  #f9f7f2 left bottom;
    }
    .rightBg{
      width: 100%;
      background: url("../../assets/images/epidemic/pic_you.png") no-repeat right;
      background-position-y: 90%;
    }
  }

</style>
