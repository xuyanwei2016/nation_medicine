<template>
  <!--添加内容-->
  <div class="addCont">
    <div class="title">
      <h1>{{$route.query.lookId?'查看':$route.query.editId?'编辑':'添加'}}内容</h1>
      <span @click="$router.go(-1)">返回<<</span>
    </div>

    <div class="formCss">
      <el-form :model="resourceForm" ref="resourceForm" :rules="rules" label-position="right" label-width="180px" class="ib">
        <div class="formtitle">基本信息</div>
        <el-form-item label="资源标题：" prop="title">
          <el-input v-model="resourceForm.title" clearable placeholder="建议在14个字以内，最多不超过50个字" style="width: 430px" :disabled="isShow"></el-input>
        </el-form-item>
        <el-form-item label="资源封面：" class="resCover">
          <el-upload :action="`${uploadUrl}/file/upload`" :show-file-list="false" :on-preview="handlePicPreview" :on-success="handlePicSuccess" :before-upload="beforePicUpload" :disabled="isShow">

            <!--http://122.14.50.6:2018/file/file/?fileName=83ecfceae5104738ad88854f23425262&isOnLine=true-->
            <img :src="`${uploadUrl}file/?fileName=${resourceForm.cover}&isOnLine=true`" v-if="resourceForm.cover" class="avatar" style="width:200px; height: 150px;object:fit;border:dashed 1px #ccc" >
            <img src="../../assets/images/resources/zanwu.png" v-if="!resourceForm.cover" class="avatar-uploader-icon" style="width:200px; height: 150px;">
            <el-button size="small" type="primary" v-if="!isShow">上传图片</el-button>
            <div slot="tip" class="el-upload__tip" v-if="!isShow">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
        <el-form-item label="分类：" prop="type">
          <el-select v-model="resourceForm.type " placeholder="请选择" :disabled="isShow">
            <el-option
              v-for="item in options"
              :key="item.enkey"
              :label="item.cnkey"
              :value="item.enkey"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="资源简介：">
          <my-editor ref="child" @passVal="passVal"  :value="resourceForm.synopsis"></my-editor>
          <span v-if="isSynopsis" style="color: #F56C6C;font-size: 12px;line-height: 30px;padding-top: 4px;">资源简介限制50字以内</span>
        </el-form-item>
        <el-form-item label="资源详情：">
          <my-editor ref="child" @passVal="passVal2" :value="resourceForm.text"></my-editor>
        </el-form-item>


        <el-form-item label="文章上传：" style="width:100%" class="imgUpload">
          <div class="pdfCss" v-if="isShow">{{resourceForm.pdf?resourceForm.pdfName:'暂无文章'}}         <!--<span class="download" @click="downFile(resourceForm.pdf)">点击下载</span>-->
          </div>
          <el-upload class="upload-demo video" :action="`${uploadUrl}/file/upload`" :before-upload="beforePdfUpload" :on-success="handlePdfSuccess"  multiple  :on-remove="handlePdfRemove" :file-list="fileList" v-if="!isShow">
            <el-button :loading="uploading" type="primary">选择文件</el-button>
            <!--<span>{{resourceForm.pdf_zh}}</span>-->
          </el-upload>
          <div class="el-upload__tip"  v-if="!isShow">格式支持pdf，Word，大小不超过1G</div>

        </el-form-item>
        <el-form-item label="图集上传：" class="imgUpload">
          <div class="imgCss" v-if="isShow">
            <img :src="img.url" alt="" v-for="(img,i) in imgList" :key="i" v-if="imgList.length>0">
            <div v-if="imgList.length==0" style="color:#606266">暂无文件</div>
          </div>
          <el-upload
            class="upload-demo"
            :action="`${uploadUrl}/file/upload`"
            :before-upload="beforeImgsUpload" :on-success="handleImgsSuccess"
            :on-remove="handleImgsRemove"
            list-type="picture" :file-list="imgList" v-if="!isShow">
              <el-button size="" type="primary"  :loading="uploadingImgs">点击上传</el-button>
            <!--<img :src="`${uploadUrl}file/?fileName=${item}&isOnLine=true`" alt="" v-for="(item,index) in resourceForm.imgs" :key="index">-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--<div class="button">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">仅支持jpg、jpeg、png格式，单张不超过10M</div>
            </div>-->

          </el-upload>

          <div class="el-upload__tip" v-if="!isShow">仅支持jpg、jpeg、png格式，单张不超过10M</div>
        </el-form-item>
        <el-form-item label="视频资源：" class="changeTip">
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
        <el-form-item label="音频资源：" class="changeTip">
          <div v-if="!resourceForm.audio&&isShow" style="color:#606266">暂无文件</div>
          <audio :src="`${uploadUrl}file/?fileName=${resourceForm.audio}&isOnLine=true`" controls v-if="resourceForm.audio&&isShow"></audio>
          <el-upload
            class="upload-demo"
            drag
            :action="`${uploadUrl}/file/upload/video`"
            :show-file-list="true" :on-success="handleAudioSuccess" :before-upload="beforeAudioUpload"
            :on-remove="handleAudioRemove"
            :file-list="audioList"
            v-if="!isShow"
          >
            <!--<audio  v-if="resourceForm.audio" :src="`${uploadUrl}?fileName=${resourceForm.audio}&isOnLine=true`" controls>
              抱歉，您的浏览器不支持内嵌视频，你可以<a :href="`${uploadUrl}?fileName=${resourceForm.audio}&isOnLine=true`" style="text-decoration:underline;">点击下载</a>查看
            </audio>-->

            <i class="el-icon-upload"></i>
            <div class="el-upload__text" :loading="uploadingAudio">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传Mp3文件，且不超过10Mb</div>
          </el-upload>
        </el-form-item>



      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!isShow">
        <el-button type="primary" @click="dataSubmit(1)">发布</el-button>
        <el-button @click="dataSubmit(0)"  v-if="resourceForm.status!=3">保存</el-button>

      </div>
    </div>

  </div>
</template>

<script>
  import "@static/css/addCont.css";
  import {saveContAPI,getTypeListAPI,getContDetailAPI,editContentAPI} from '../../api/resources';
  import {uploadUrl} from '../../utils/global';
  import myEditor from "@/components/editor"
  export default {
    data () {
      return {
        uploadUrl:uploadUrl,
        resourceForm:{
          synopsis:'',
        },
        options: [],
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
        rules:{title: [
          { required: true, message: '请输入资源标题', trigger: 'change' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
          type:[{ required: true, message: '请选择分类', trigger: 'change' },]
        }

      }
    },
    components: {myEditor},

    created(){
      if(this.$route.query.lookId||this.$route.query.editId){
        let id=this.$route.query.lookId||this.$route.query.editId;
        this.getDetail(id);
        this.isShow=this.$route.query.lookId?true:false;
      }
      this.getTypeList();

    },
    methods: {
      getDetail(id){
        this.imgList=[];
        getContDetailAPI(id).then(res=>{
          console.log('获取详情',res.data)
          this.resourceForm=res.data.data;
          if(res.data.data.imgs){
            res.data.data.imgs.forEach((item,index)=>{
              let imgLink={url:`${this.uploadUrl}file/?fileName=${item}&isOnLine=true`,response:item};
              this.imgList=[...this.imgList,imgLink];
            })
          }
          if(this.resourceForm.audio){
            this.audioList=[{url:`${this.uploadUrl}file/?fileName=${this.resourceForm.audio}&isOnLine=true`,name:this.resourceForm.audioName}];
            console.log(234,this.audioList)
          }
          if(this.resourceForm.pdf){
            this.fileList=[{url:`${this.uploadUrl}file/?fileName=${this.resourceForm.pdf}&isOnLine=true`,name:this.resourceForm.pdfName}];
            console.log(234,this.fileList)
          }


        })
      },
      getTypeList(){
        getTypeListAPI({
          code:'YDCCRESOURCETYPE',
          pageSize:100,
          pageNum:1,
        }).then(res=>{
          this.options=res.data.data.list;
        })
      },
      /*传过来的值*/
      passVal(val){
        this.resourceForm.synopsis =val;
        let value=val.replace(/<\/?[^>]*>/g, '');
        console.log(11111,value.length)
        if(value.length>50){
          this.isSynopsis=true;
        }else{
          this.isSynopsis=false;
        }
      },
      passVal2(val){
         this.resourceForm.text = val;
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

      //pdf上传
      beforePdfUpload(file){
        console.log(2222,file)
        const isPDF = file.type === 'application/pdf'||file.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||'application/msword';
        const isLtG1 = file.size / 1024 / 1024/ 1024 < 1;
        if (!isPDF) {
          this.$message.error('附件文件只能是 PDF 或 word 格式!')
          return isPDF;
        }
        if (!isLtG1) {
          this.$message.error('上传图片大小不能超过 1G!');
          return isLtG1
        }
        this.uploadingPDF = true
      },
      handlePdfSuccess(response, file, fileList){
        this.fileList=[file];
        console.log(555,response)
        this.resourceForm.pdf = response;
        this.uploadingPDF = false
      },
      handlePdfRemove() {//删除pdf
        this.resourceForm.pdf = null;
      },
      // 查看pdf
      queryPDF() {
        /*window.open(uploadUrl+"?fileName="+this.resourceForm.pdf+"&isOnLine=true")*/
      },
      //图片集
      beforeImgsUpload(file){
        const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/JPEG/PNG 格式!');
          return isJPG
        }
        if (!isLt10M) {
          this.$message.error('上传图片大小不能超过 10MB!');
          return isLt10M
        }
        this.uploadingImgs=true;
      },
      handleImgsSuccess(response, file, fileList){
        this.$message.success('上传成功');
        this.imgList=fileList;
        this.uploadingImgs=false;
      },
      handleImgsRemove(file, fileList){
        console.log('移除图片集',file, fileList)
        this.imgList=fileList;
      },

//视频
      beforeVideoUpload(file){
        let type = file.name.slice(file.name.lastIndexOf('.')+1).toLowerCase();
        const isLt500M = file.size / 1024 / 1024 < 500;
        console.log(type)
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
        console.log('上传视频',response.fileName, file, fileList)
        this.$set(this.resourceForm,'video',response.fileName);
        this.uploadingVideo=false;
        this.$message.success('上传成功');

      },
      deleteVideo(){
        this.resourceForm.video='';
      },

//音频
      beforeAudioUpload(file){
        if(this.resourceForm.audio){
          this.$message.error('音频只能上传一个！');
          return false
        };
        let type = file.name.slice(file.name.lastIndexOf('.')+1).toLowerCase();
        const isLt10M = file.size / 1024 / 1024 < 10;
        console.log(type)
        const isVideo = type === 'mp3';
        if (!isVideo) {
          this.$message.error('上传音频只能是 mp3 格式!');
          return isVideo
        }
        if (!isLt10M) {
          this.$message.error('上传音频大小不能超过 10MB!');
          return isLt10M
        }
        this.$message.warning('上传中');
        this.uploadingAudio=true;
      },
      handleAudioSuccess(response, file, fileList){
        this.$set(this.resourceForm,'audio',response.fileName);
        this.uploadingAudio=false;
        this.$message.success('上传成功');

      },
      handleAudioRemove(file, fileList){
        this.resourceForm.audio='';
      },

      handlePreview(file) {
        console.log(file);
      },
      dataSubmit(opsType){
        this.resourceForm.imgs=[];
        this.imgList.forEach((item,index)=>{
          this.resourceForm.imgs=[...this.resourceForm.imgs,item.response];
        })
        this.$refs['resourceForm'].validate((valid) => {
          if (valid) {
            if(this.isSynopsis){
              this.$message.error('资源简介限制50字以内');
              return false;}
            this.resourceForm.opsType=opsType;
            let API=this.$route.query.editId?editContentAPI:saveContAPI;
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
    .pdfCss{height: 40px; line-height: 40px; color: #606266;}


  }

</style>
