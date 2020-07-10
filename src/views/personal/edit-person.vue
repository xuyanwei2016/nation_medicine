<template>
    <div class="edit">
      <el-form :model="resourceForm" ref="resourceForm" :rules="rules" label-position="right" label-width="120px" class="ib">
      <div class="editpreson_title">基础信息</div>
      <div class="editpreson_listInfo">
        <el-form-item prop="nickName" label="昵称" label-width="80px">
          <el-input v-model="resourceForm.nickName" clearable placeholder="请输入昵称" style="width:200px"></el-input>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="头像" label-width="80px">
          <!-- {{imageUrl}} -->
          <el-upload class="avatar-uploader" :action="`${uploadUrl}file/${uploadPath}`" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img  v-if="imagePath" :src="imageUrl" class="avatar">
            <img v-else src="@/assets/images/home/avatar.jpg" class="avatar-uploader-icon" style="width: 130px; height: 130px;">
          </el-upload>
          <div style="color:#999999;">建议尺寸122*122px, 支持jpg, gif, png或bmp格式的图片，文件大小不超过2M</div>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="性别" prop="sex" label-width="80px" >
          <el-radio-group v-model="resourceForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="resourceForm.email" clearable placeholder="请输入邮箱" style="width:300px"></el-input>
        </el-form-item>
      </div>
      <p class="editpreson_tip">用于接收来自系统给您发送的邮件通知或找回密码使用</p>
      <div class="editpreson_title editpreson_infoTitle">完善信息</div>
      <div class="editpreson_listInfo">
        <el-form-item label="真实姓名" prop="name" label-width="80px">
          <el-input v-model="resourceForm.name" clearable placeholder="请输入真实姓名" :disabled="cancel" style="width:300px"></el-input>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="学历" prop="academic"  label-width="80px">
          <el-select v-model="resourceForm.academic" placeholder="请选择" style="width: 300px;" :disabled="cancel">
            <el-option v-for="item in academic" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="机构名称" prop="organName" label-width="80px">
          <el-input v-model="resourceForm.organName" clearable placeholder="请输入机构名称" :disabled="cancel" style="width:300px"></el-input>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="科室" prop="dept" label-width="80px">
          <el-select v-model="resourceForm.dept" placeholder="请选择" style="width:300px" :disabled="cancel">
            <el-option v-for="item in dept" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="editpreson_listInfo">
        <el-form-item label="职称" prop="title" label-width="80px" >
          <el-select v-model="resourceForm.title"  placeholder="请选择" style="width:300px" :disabled="cancel">
            <el-option v-for="item in title" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="editpreson_save" @click="save">保存信息</div>
      </el-form>
    </div>
</template>

<script>
import "@static/css/personal/edit-personal.less";
import { editAPI , detailsAPI } from '@/api/personal/personal_information'
import { uploadUrl, uploadPath, requestPath } from '@/utils/global.js';
import Cookies from "js-cookie";

export default {
  name: 'edit',
  data(){
    const validateName=(rule, value, callback) => {
      
      if (value === null||value === ''|| value.replace(/(^\s*)|(\s*$)/g, "")=="") {
        callback(new Error('请输入真实姓名'));
      } else{
        if(value.length>10){
          callback(new Error('不能超过10个字符'));
        }
        callback()
      }
    };
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      uploadPath: uploadPath,
      cancel: false,
      resourceForm:{
        sex: 1,
        img: '',
        name:null,
        organName:null
      },
      academic: [{
          value: 0,
          label: '大专'
        }, {
          value: 1,
          label: '本科'
        }, {
          value: 2,
          label: '硕士'
        }, {
          value: 3,
          label: '博士'
        }],
        dept: [{
          value: 0,
          label: '骨科'
        }, {
          value: 1,
          label: '内科'
        }, {
          value: 2,
          label: '外科'
        }],
        title: [{
          value: 0,
          label: '主任医师'
        }, {
          value: 1,
          label: '副主任医师'
        }, {
          value: 2,
          label: '主治医师'
        }, {
          value: 3,
          label: '医师'
        }, {
          value: 4,
          label: '教授'
        }, {
          value: 5,
          label: '副教授'
        }, {
          value: 6,
          label: '研究员'
        }, {
          value: 7,
          label: '副研究员'
        }, {
          value: 8,
          label: '其他'
        }],
        imageUrl: '',
        imagePath: '',
        value: '',
        rules:{
          title:[
            { required: true , message: '请选择职称', trigger: 'blur' },
          ],
          nickName: [
            { required: false, pattern: /^.{1,8}$/, message: '长度不超过8个字' , trigger: 'change' }
          ],
          name: [
            { required: true,validator: validateName,trigger: 'change' }
          ],
          dept: [
            { required: true , message: '请选择科室', trigger: 'blur'}
          ],
          academic: [
            { required: true , trigger: 'blur', message: '请选择学历'}
          ],
          organName: [
            { required: true,  pattern: /^.{1,20}$/, message: '请输入机构名称，长度不超过20字', trigger: 'blur' }
          ],
          email: [{required: false, pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '请输入正确的邮箱', trigger: 'change'  }]
        },
    }
  },
  created(){
    console.log(111);
    this.getDetails()
    this.uploadUrl = uploadUrl;
    // 判断是专家用户还是普通用户，普通用户userType为0，专家用户userType为1, 机构用户userType为2
    if(Cookies.get('userType')) {
        this.userType = Cookies.get('userType')
        console.log(this.userType, 'aaaaaa');
        if(this.userType == 1 ) {
            this.cancel = true
        } 
    }
  },
  methods:{
    // 详情
    getDetails() {
       const id = Cookies.get('userId');
      detailsAPI({id: id}).then(res => {
        console.log('个人信息',res);
        this.resourceForm = res.data.data;
        this.imageUrl = `${this.domain}${this.requestPath.file}?fileName=${this.resourceForm.img}&isOnLine=true`;
        this.imagePath = this.resourceForm.img
      })
    },
    // 保存
    save() {
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {//必填名称--规则 （pdf和正文内容至少填一项）
          editAPI(this.resourceForm).then(res => {
            if(res.data.code === 0) {
              this.$message.success('保存成功');

              if(this.resourceForm.nickName!=''){
                Cookies.set('userName',this.resourceForm.nickName);
                let userObj={
                  userName:this.resourceForm.nickName,
                  userImg:Cookies.get("userImg"),
                  userToken:Cookies.get("Y-Token"),
                };
                this.$store.commit('increment',userObj)
              }

              if(this.resourceForm.img){
                Cookies.set('userImg',this.resourceForm.img);
                let userObj={
                  userName:Cookies.get("userName"),
                  userImg:this.resourceForm.img,
                  userToken:Cookies.get("Y-Token"),
                };
                this.$store.commit('increment',userObj)
              }
            }
          })
        }
      })
    },

    handleAvatarSuccess(res, file, fileList) {
      console.log(res);
      this.$message.success('上传成功')
      this.imageUrl = `${this.domain}${this.requestPath.file}?fileName=${res}&isOnLine=true`;
      this.resourceForm.img = res;
      this.imagePath = res
    },
    beforeAvatarUpload(file) {
      console.log(file.type,"file.typefile.type")
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片可以是 JPG, JPEG, PNG, GIF, BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },


  }
}
</script>
