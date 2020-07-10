<template>
  <div>
    <div class="header">
      <div class="login">
        <router-link to="/">
          <img src="@/assets/images/login/logo.png" class="login_image">
          <!--<img src="../assets/images/epidemic/logodl.png" class="login_image">-->
        </router-link>
        <router-link to="/">
          <span>返回首页</span>
          <img src="@/assets/images/login/right.png" class="login_right">
        </router-link>

      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  .header{
    width: 100%;
    overflow: hidden;
    height: 100px;
    line-height: 100px;
    background: #fff;
    border-bottom: 13px solid;
    border-image: url(../assets/images/login/border_bottom.png) 27 27 27 27 round round;
  }
  .login{
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    line-height: 100px;
    position: relative;
    .login_image{
      width: 260px;
      position: absolute;
      left: 0;
      top: 50%;
      transform:translateY(-50%); /*针对元素本身向左以及向上移动50%*/
    }
    span{
      float: right;
      color:#2473D6;
      margin-right: 20px;
    }
    .login_right{
      width: 14px;
      position: absolute;
      right: 0;
      top: 50%;
      transform:translateY(-50%); /*针对元素本身向左以及向上移动50%*/
    }
  }

</style>
