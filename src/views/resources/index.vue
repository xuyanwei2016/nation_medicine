<template>
    <div>
      <PersonHeader></PersonHeader>
    </div>
</template>

<script>
  import PersonHeader from '../../components/PersonHeader.vue';

  export default {
    data () {
      return {}
    },
    components: {PersonHeader},
    methods: {}
  }
</script>

<style lang="less">
  .okAlert{
    position: fixed;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
    z-index: 1111;
    .okCont{
      background: #fff;
      width:300px;
      height:190px;
      border-radius:3px;
      .okTit{
        padding: 0 15px;
        height:36px;
        background:rgba(244,244,244,1);
        border-radius:3px 3px 0px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1{
          font-size: 14px;
          color: #454545;
          font-weight: bold;
        }
        i{
          color: #AAAAAA;
          font-size: 14px;
          font-weight: bold;
        }
      }
      h2{
        text-align: center;
        color: #454545;
        font-size: 18px;
        font-weight: normal;
        height: 96px;
        line-height: 96px;
        padding-bottom: 8px;
      }
      button{
        width:76px;
        height:30px;
        background:rgba(240,124,125,1);
        border-radius:2px;
        font-size: 14px;
        color: #fff;
        margin: 0 auto;
        border: none;
        text-align: center;
        display: block;
        cursor: pointer;
      }
    }
  }
  .addCont{
    .el-upload-list{
      width: 88%;
    }
  }
</style>
