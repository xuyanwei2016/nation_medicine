<template>
  <!--添加课程-->
  <div class="addCont">
    <div class="title">
      <h1>{{$route.query.lookId?'查看':$route.query.editId?'编辑':'添加'}}课程</h1>
      <span @click="$router.go(-1)">返回<<</span>
    </div>

    <div class="formCss">
      <el-form :model="resourceForm" ref="resourceForm" :rules="rules" label-position="right" label-width="180px" class="ib">
        <div class="formtitle">基本信息</div>
        <el-form-item label="课程名称：" prop="name">
          <el-input v-model="resourceForm.name" clearable placeholder="建议在14个字以内，最多不超过50个字" style="width: 430px" :disabled="isShow"></el-input>
        </el-form-item>

        <el-form-item label="课程简介：">
          <my-editor ref="child" @passVal="passVal"  :value="resourceForm.synopsis"></my-editor>
          <span v-if="isSynopsis" style="color: #F56C6C;font-size: 12px;line-height: 30px;padding-top: 4px;">课程简介限制50字以内</span>
        </el-form-item>


        <el-form-item label="详情封面：" class="resCover">
          <el-upload :action="`${uploadUrl}/file/upload`" :show-file-list="false" :on-preview="handlePicPreview" :on-success="handlePicSuccess" :before-upload="beforePicUpload" :disabled="isShow">

            <!--http://122.14.50.6:2018/file/file/?fileName=83ecfceae5104738ad88854f23425262&isOnLine=true-->
            <img :src="`${uploadUrl}file/?fileName=${resourceForm.cover}&isOnLine=true`" v-if="resourceForm.cover" class="avatar" style="width:200px; height: 150px;object:fit;border:dashed 1px #ccc" >
            <img src="../../assets/images/resources/zanwu.png" v-if="!resourceForm.cover" class="avatar-uploader-icon" style="width:200px; height: 150px;">
            <el-button size="small" type="primary" v-if="!isShow">上传图片</el-button>
            <div slot="tip" class="el-upload__tip" v-if="!isShow">用于课程详情页面展示，750*420像素或16：9，支持PNG、JPG|CIF格式，小于5M</div>
          </el-upload>

        </el-form-item>


        <el-form-item label="宣传图：" class="imgUpload">
          <div class="imgCss" v-if="isShow">
            <img :src="img.url" alt="" v-for="(img,i) in imgList" :key="i" v-if="imgList.length>0">
            <span  v-if="imgList.length==0" style="font-size: 14px;color: #606266;line-height: 40px;">未上传宣传图</span>
          </div>
          <el-upload
            class="upload-demo"
            :action="`${uploadUrl}/file/upload`"
            :before-upload="beforeImgsUpload" :on-success="handleImgsSuccess"
            :on-remove="handleImgsRemove"
            list-type="picture"
            :limit="2" :file-list="imgList" v-if="!isShow">
            <el-button size="" type="primary"  :loading="uploadingImgs">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">用于内容列表缩略图展示，420*350像素或4：3，支持PNG、JPG|CIF格式，小于5M</div>
            <!--<img :src="`${uploadUrl}file/?fileName=${item}&isOnLine=true`" alt="" v-for="(item,index) in resourceForm.imgs" :key="index">-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--<div class="button">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">仅支持jpg、jpeg、png格式，单张不超过10M</div>
            </div>-->

          </el-upload>


        </el-form-item>


        <el-form-item label="课程详情：">
          <my-editor ref="child" @passVal="passVal2" :value="resourceForm.details"></my-editor>
        </el-form-item>


        <el-form-item label="总课时：" prop="classHour">
          <el-input v-model.number="resourceForm.classHour" clearable  style="width: 430px" :disabled="isShow"></el-input>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!isShow">

        <el-button type="primary" @click="dataSubmit(0)">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import "@static/css/addCont.css";
  import {saveLessonAPI,getLessonDetailAPI,editLessonAPI} from '../../api/resources';
  import {uploadUrl} from '../../utils/global';
  import myEditor from "@/components/editor"
  export default {
    data () {
      return {
        uploadUrl:uploadUrl,
        resourceForm:{},

        uploading:false,
        uploadingPDF:false,
        uploadingImgs:false,
        uploadingVideo:false,
        uploadingAudio:false,
        isShow:false,
        imgList: [],
        fileList:[],
        audioList:[],
        isSynopsis:false,
        rules:{
          name: [
          { required: true, message: '请输入课程名称', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
          classHour: [
            { type:'number',min:1, message: '请输入大于 0 整数值', trigger: 'change' }
        ],}

      }
    },
    components: {myEditor},
    created(){
      if(this.$route.query.lookId||this.$route.query.editId){
        let id=this.$route.query.lookId||this.$route.query.editId;
        this.getDetail(id);
        this.isShow=this.$route.query.lookId?true:false;
      }


    },
    methods: {
      getDetail(id){
        this.imgList=[];
        getLessonDetailAPI(id).then(res=>{
          this.resourceForm=res.data.data;
          if(res.data.data.img){
              let imgLink={url:`${this.uploadUrl}file/?fileName=${res.data.data.img}&isOnLine=true`,response:res.data.data.img};
              this.imgList=[imgLink];

          }

        })
      },

      /*传过来的值*/
      passVal(val){
        this.resourceForm.synopsis =val;
        let value=val.replace(/<\/?[^>]*>/g, '');
        if(value.length>50){
          this.isSynopsis=true;
        }else{
          this.isSynopsis=false;
        }
      },
      passVal2(val){
        this.resourceForm.details = val;
      },
      //图片
      beforePicUpload(file){
        /*jpg、jpeg、png、gif、png*/
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' ||file.type == 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/JPEG/PNG/GIF 格式!');
          return isJPG
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return isLt2M
        }
        this.uploading = true
        /*this.$message.warning('上传中');*/
      },
      handlePicSuccess(response, file, fileList){
        this.uploading = false;
        this.$message.success('上传成功');
        this.$set(this.resourceForm,'cover',response);
      },
      handlePicPreview(file){ // 图片预览
        /*this.dialogImage = file
        this.dialogPvVisible = true*/
      },
      handleRemove(){ // 图片删除
        this.resourceForm.img = ''
      },

      //图片集
      beforeImgsUpload(file){
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/JPEG/PNG/GIF 格式!');/*PNG、JPG|CIF*/
          return isJPG
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return isLt5M
        }
        this.uploadingImgs=true;
      },
      handleImgsSuccess(response, file, fileList){
        this.imgList=[file];
        this.$message.success('上传成功');
        /*this.imgList=fileList;*/
        this.uploadingImgs=false;
      },
      handleImgsRemove(file, fileList){
        console.log('移除图片集',file, fileList)
        this.imgList=fileList;
      },


      dataSubmit(opsType){
        this.resourceForm.imgs=[];

        this.imgList.forEach((item,index)=>{

          this.resourceForm.img=item.response;
        })
        this.$refs['resourceForm'].validate((valid) => {
          if (valid) {
            if(this.isSynopsis){
              this.$message.error('课程简介限制50字以内');
              return false;}
            this.resourceForm.opsType=opsType;
            let API=this.$route.query.editId?editLessonAPI:saveLessonAPI;
            API(this.resourceForm).then(res=>{
              this.$message.success(`${this.$route.query.editId?'编辑成功':'添加成功'}`);
              this.$router.go(-1);

            })
          } else {
            this.$message.error('请填写必填项');
            return false;
          }
        });

      },


    }
  }
</script>

<style scoped lang="less">
  .addCont{
    width: 980px;
    float: right;
    .title {
      padding: 0 28px;
      height: 60px;
      display: flex;
      align-items: center;
      background: #fff;
      justify-content: space-between;
      h1{
        color: #333333;
        font-size: 20px;
        font-weight: normal;
      }
      span{
        font-size: 14px;
        color: #4692FB;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .formCss{
      background: #fff;
      margin-top: 8px;
      padding-bottom: 20px;
      .formtitle{
        color: #333333; font-size: 16px; font-weight: bold;padding: 30px 0px 54px 30px;}
      .dialog-footer{ text-align: center;padding: 0px 0 50px 0}
    }
    .videoCss{
      position: relative;
      width: 300px;
      height: 280px;
      border: 1px solid #ccc;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      margin-right: 20px;

      video{
        width: 300px;
        max-height: 200px;
        padding: 30px 0;
      }

      .hover{width: 50px;height: 50px;position: absolute;top:0px;right:5px; text-align:right; display: none;
        i{font-size: 16px;font-weight: bold;cursor: pointer}}
    }
    .videoCss:hover{
      .hover{ display: block;}

    }
    .imgCss{
      /*width: 146px;
      height: 146px;*/
      padding: 0;
      margin: 0;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      img{
        width: 146px;
        height: 146px;
        padding: 0;
        margin: 0 20px 0 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
      }
    }
    .pdfCss{height: 40px; line-height: 40px;}

  }
</style>
