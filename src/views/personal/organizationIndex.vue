<template>
    <div class="organization_wrap" style="padding-top:102px;padding-left:110px;">
        <div>
          <img :src="`${uploadUrl}file/?fileName=${form.img}&isOnLine=true`" v-if="form.img" class="organization_pic">
          <img src="@/assets/images/home/avatar.jpg" v-else class="organization_pic">
        </div>
        <div class="list">
          <p>机构名称：{{form.name}}  </p>
          <p> 用户名：{{form.account}}</p>
          <p>使用时间： {{form.beginTime}}——{{form.endTime}}</p>
          <p v-if="form.version == 1"> 版本： 网络版</p>
          <p v-else> 版本： 镜像版</p>
        </div>
    </div>
</template>

<script>

import { getHotProductsAPI } from '@/api/personal/personal_information'
import { getInstitutionAPI } from '@/api/personal/index'
import { uploadUrl } from '@/utils/global'
 import Cookies from 'js-cookie';
export default {
  name: 'organizationIndex',
  data(){
    return {
      uploadUrl:uploadUrl,
      status:null,
      msg: '',
      list: [],
      form: {}
    }
  },
  created(){
    console.log(111);
  },
  mounted() {
    this.getHotProducts()
    this.getInstitution()
  },
  methods: {
    getHotProducts() {
      getHotProductsAPI().then(res => {
        this.list = res.data.data;
      })
    },
    getInstitution() {
      getInstitutionAPI({
        level: 2,
        id: Cookies.get('userId')
      }).then(res => {
        this.form = res.data.data;
      })
    },
  }
}
</script>
<style lang="less">
.organization_wrap{
  background-color: #fff;
  min-height: 636px;
  .organization_pic{
    width: 100px;
    height: 97px;
    border-radius: 50px;
    margin-bottom: 20px;
  }
  .list{
    line-height: 40px;
    color:#666;
    font-size: 16px;
  }
}
</style>



