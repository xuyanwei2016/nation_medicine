<template>
  <!--添加视频-->
  <div class="addCont">
    <div class="title">
      <h1>{{$route.query.lookId?'查看':$route.query.editId?'编辑':'添加'}}视频</h1>
      <span @click="$router.go(-1)">返回<<</span>
    </div>

    <div class="formCss">
      <el-form :model="resourceForm" ref="resourceForm" :rules="rules" label-position="right" label-width="180px" class="ib">
        <div class="formtitle">基本信息</div>

        <el-form-item label="资源标题：" prop="name">
          <el-input v-model="resourceForm.name" clearable placeholder="建议在14个字以内，最多不超过50个字" style="width: 430px" :disabled="isShow"></el-input>
        </el-form-item>


        <el-form-item label="简介：">
          <my-editor ref="child" @passVal="passVal"  :value="resourceForm.synopsis"></my-editor>
          <span v-if="isSynopsis" style="color: #F56C6C;font-size: 12px;line-height: 30px;padding-top: 4px;">简介限制50字以内</span>
        </el-form-item>


        <el-form-item label="视频封面：" class="resCover">
          <el-upload :action="`${uploadUrl}/file/upload`" :show-file-list="false" :on-preview="handlePicPreview" :on-success="handlePicSuccess" :before-upload="beforePicUpload" :disabled="isShow">

            <!--http://122.14.50.6:2018/file/file/?fileName=83ecfceae5104738ad88854f23425262&isOnLine=true-->
            <img :src="`${uploadUrl}file/?fileName=${resourceForm.cover}&isOnLine=true`" v-if="resourceForm.cover" class="avatar" style="width:200px; height: 150px;object:fit;border:dashed 1px #ccc" >
            <img src="../../assets/images/resources/zanwu.png" v-if="!resourceForm.cover" class="avatar-uploader-icon" style="width:200px; height: 150px;">
            <el-button size="small" type="primary" v-if="!isShow">上传图片</el-button>
            <div slot="tip" class="el-upload__tip" v-if="!isShow">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>


        <el-form-item label="视频文件：" prop="video"   ref="image" class="changeTip">
          <div v-if="!resourceForm.video&&isShow" style="color:#606266">暂无文件</div>
          <div class="videoCss" v-if="(resourceForm.video&&isShow)||(resourceForm.video&&!isShow&&!$route.query.editId)||(resourceForm.video&&!isShow&&$route.query.editId)">
            <div class="hover" v-if="!isShow">
              <i class="el-icon-close" @click="deleteVideo"></i>
            </div>
            <video  :src="`${uploadUrl}file/?fileName=${resourceForm.video}&isOnLine=true`" controls v-if="resourceForm.video">
              抱歉，您的浏览器不支持内嵌视频，你可以<a :href="`${uploadUrl}file/?fileName=${resourceForm.video}&isOnLine=true`" style="text-decoration:underline;">点击下载</a>查看
            </video>
          </div>
          <el-upload
            class="upload-demo"
            drag
            :action="`${uploadUrl}/file/upload/video`" :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeVideoUpload"
            v-if="!resourceForm.video&&!isShow">
            <!--<video :src="`${uploadUrl}file/?fileName=${resourceForm.video}&isOnLine=true`"></video>-->

            <i class="el-icon-upload"></i>
            <div class="el-upload__text" :loading="uploadingVideo">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传Mp4/Avi文件，且不超过500Mb</div>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!isShow">
        <el-button type="primary" @click="dataSubmit(1)">发布</el-button>
        <el-button @click="dataSubmit(0)" v-if="resourceForm.status!=3">保存</el-button>

      </div>
    </div>

  </div>
</template>

<script>
  import "@static/css/addCont.css";
  import {saveVideoAPI,getTypeListAPI,getVideoDetailAPI,editVideoAPI} from '../../api/resources';
  import {uploadUrl} from '../../utils/global';
  import myEditor from "@/components/editor"
  export default {
    data () {
      return {
        uploadUrl:uploadUrl,
        resourceForm:{},
        uploading:false,
        uploadingVideo:false,
        isShow:false,
        playTime:0,
        isSynopsis:false,
        rules:{
          name: [
          { required: true, message: '请输入资源标题', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
          video: [
          {required: true, message: '请上传视频资源', trigger: 'change'},
        ],
        }

      }
    },
    components: {myEditor},
    created(){
      if(this.$route.query.lookId||this.$route.query.editId){
        let id=this.$route.query.lookId||this.$route.query.editId;
        this.getDetail(id);
        this.isShow=this.$route.query.lookId?true:false;
      }else{

      }


    },
    methods: {
      getDetail(id){

        getVideoDetailAPI(id).then(res=>{
          console.log('获取详情',res.data)
          this.resourceForm=res.data.data;

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

      //图片
      beforePicUpload(file){
        /*jpg、jpeg、png、gif、png*/
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' ||file.type == 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/JPEG/PNG/GIF 格式!');
          return isJPG
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
          return isLt2M
        }
        this.uploading = true
        /*this.$message.warning('上传中');*/
      },
      handlePicSuccess(response, file, fileList){
        this.$set(this.resourceForm,'cover',response);
        this.uploading = false;
        this.$message.success('上传成功');

        /*this.resourceForm.cover = response;*/
      },
      handlePicPreview(file){ // 图片预览
        /*this.dialogImage = file
        this.dialogPvVisible = true*/
      },
      handleRemove(){ // 图片删除
        this.resourceForm.img = ''
      },


//视频
      beforeVideoUpload(file){
        let self=this;
        let type = file.name.slice(file.name.lastIndexOf('.')+1).toLowerCase();
        const isLt500M = file.size / 1024 / 1024 < 500;
        const isVideo = type === 'mp4'||type === 'avi';
        if (!isVideo) {
          this.$message.error('上传视频只能是 mp4 或 Avi 格式!');
          return isVideo
        }
        if (!isLt500M) {
          this.$message.error('上传视频大小不能超过 500MB!');
          return isLt500M
        }

        this.$message.warning('上传中');
        this.uploadingVideo=true;
      },
      handleVideoSuccess(response, file, fileList){

        this.$set(this.resourceForm,'video',response.fileName);
        this.$refs.image.clearValidate();
        this.uploadingVideo=false;
        this.$message.success('上传成功');
        // 转换时间
        var fileTime = response.time
        var hours = Math.floor(fileTime / 3600000)
        var fileTimeHours = fileTime % 3600000
        var minutes = Math.floor(fileTimeHours / 60000)
        var fileTimeMinutes = fileTimeHours % 60000
        var second = Math.floor(fileTimeMinutes / 1000)
        if(hours == '0' && minutes == '0') {
          var time =  second + '秒'
        } else if(hours == '0') {
          var time =  minutes + '分' + second + '秒'
        } else {
          var time = hours + '时'+ minutes + '分' + second + '秒'
        }

        // 转换大小
        var fileSize = response.size
        var convertFileSize = Math.round((fileSize / 1024 / 1024) * 100)/100.0
        var size =  convertFileSize + 'M'

        this.resourceForm.size = size;
        this.resourceForm.timeLength = time;

      },
      deleteVideo(){
        this.resourceForm.video='';
      },

      dataSubmit(opsType){

        this.$refs['resourceForm'].validate((valid) => {
          if (valid) {
            if(this.isSynopsis){
              this.$message.error('简介限制50字以内');
              return false;}
            this.resourceForm.opsType=opsType;
            let API=this.$route.query.editId?editVideoAPI:saveVideoAPI;
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
      min-height: 973px;
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
