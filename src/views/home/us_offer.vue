<template style="height:100%">
  <div>
    <commonHeader></commonHeader>

    <div class="medical_content" id="medical_content" style="position: relative; z-index: 0; padding-bottom: 20px; ">
      <img src="@/assets/images/medical/emblazonry-left.png" class="emblazonry_left">
      <div class="medical_main">
        <!-- <navbar :message="parentMsg"></navbar> -->
        <div class="usoffer_location" style="padding: 20px 0;">
          <img src="@/assets/images/medical/location.png" alt="">
          <span style="color: #999">您的当前位置:</span>
          <span style="color: #999">&nbsp;<router-link to="index" style="color: #999">首页</router-link>&nbsp;&gt;</span>
          <span style="color: #1F77F2">在线投稿</span>
        </div>
        <div class="sub_rightLine"></div>
        <div class="medical_sub useroffer_content">
          <div class="user_left">
            <div class="usoffer_title">我要投稿</div>
            <div class="usoffer_form_wrap">
              <el-form ref="usofferform" :model="usofferform" label-width="90px" :rules="rules">
                <el-form-item label="标题:" prop="title">
                  <el-input v-model="usofferform.title"></el-input>
                </el-form-item>
                <el-form-item label="作者:" prop="author">
                  <el-input v-model="usofferform.author" disabled></el-input>
                </el-form-item>
                <el-form-item label="关键词:" prop="keywords">
                  <el-input v-model="usofferform.keywords" placeholder="多个关键词用，隔开"></el-input>
                </el-form-item>
                <el-form-item label="简介:" prop="synopsis">
                  <my-editor ref="editor" @pass="pass" v-model="usofferform.synopsis"></my-editor>
                  <input type="hidden" v-model="usofferform.synopsis">
                </el-form-item>
                <el-form-item label="正文:" prop="text">
                  <my-editor ref="myeditorx" @passvalx="passvalx" v-model="usofferform.text"></my-editor>
                  <input type="hidden" v-model="usofferform.text">
                </el-form-item>
                <el-form-item class="mag-bot-20" label="音视频:">
                  <el-upload
                    :action="`${uploadUrl}/file/${uploadPath}/info`"
                    :show-file-list="false"
                    :limit="1"
                    :on-success="handleAudioSuccess"
                    :before-upload="beforeAudioUpload"
                    style="display: inline-block;"
                  >
                    <el-button type="primary">上传</el-button>
                    <span>{{name}}</span>
                  </el-upload>
                  <span class="us_offer_del" v-if="name != ''" @click="del">删除</span>
                </el-form-item>
                <el-form-item class="mag-bot-20" label="参考附件:">
                  <el-upload
                    :action="`${uploadUrl}/file/${uploadPath}/info`"
                    :show-file-list="false"
                    :limit="1"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                  >
                    <el-button type="primary">选择文件...</el-button>
                    <span>{{accessories_zh}}</span>
                    <span class="tip">支持上传word、pdf或压缩包文件，大小不超过100MB.</span>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="user_right">
            <div class="useroffer_know">
              <div class="useroffer_know_tit">投稿须知</div>
              <div class="useroffer_know_content">
                <p class="know_content_list">根据国家有关部门对期刊管理和编辑规范化、标准化、现代化的规定，本刊对作者稿件的结构、格式及有关问题作如下说明：</p>
                <p class="know_content_list">1、来稿要求论点鲜明、论据充分、精炼、数据可靠，篇幅在2300字为宜。</p>
                <p class="know_content_list">2、来稿格式要规范，内容要严谨，严禁抄袭、一稿多投，不涉及政治性，维护良好的学术风气，文责自负。</p>
                <p class="know_content_list">3、来稿请务必注明作者详细的联系方式，以便针对随时查询核对。</p>
                <p class="know_content_list" >4、本刊实行无纸化办公，来稿一律通过电子邮件（WORD文档附件）发送，来稿必复，来稿不退，审核通过后7日内下录用，30日未见通知可自行处理。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/images/medical/emblazonry-right.png" class="emblazonry_right">
    </div>

    <commentFoot></commentFoot>
  </div>
</template>

<script>
import "@static/css/home/usoffer.less";
import "@static/css/medical_information/userother.less";
import "@static/css/index.less";
import "@static/css/medical_information/index.less";
import navbar from "@/components/navbar.vue";
import myEditor from "@/components/editor";
import commonHeader from "@/components/commonHeader";
import commentFoot from "@/components/commentFoot";
import { uploadUrl, uploadPath, requestPath } from "@/utils/global";
import { saveAPI, detailAPI } from "@/api/home/contribute";
import { detailsAPI } from '@/api/personal/personal_information'//获取用户名
import Cookies from "js-cookie";
export default {
  name: "usoffer",
  components: { myEditor, commonHeader, commentFoot, navbar },
  data() {
    return {
      usofferform: {
        title: '',
        author: "",
        keywords: "",
        synopsis: "",
        text: "",
        accessories: "",
        audio: "",
        video: ""
      },
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur'},
            { required: true, pattern:/^.{1,50}$/,message: '标题长度必须小于50位', trigger: 'blur'}
          ],
          author: [{ required: true, pattern:/^[\w\u4e00-\u9fa5]{1,10}$/, message: '请输入作者', trigger: 'blur'}],
          keywords: [{ required: true, pattern: /^.{1,30}$/,message: '请输入关键词,30字以内', trigger: 'blur'}],
          synopsis: [{ required: true, pattern: /^.{1,500}$/, message: '请输入简介,500字以内', trigger: 'change'}],
          text: [{ required: true, pattern: /^.{1,500}$/, message: '请输入正文', trigger: 'blur'}]
      },
      uploadUrl: uploadUrl,
      uploadPath: uploadPath,
      childVal: "",
      childvalx: "",
      name: "",
      accessories_zh: "",
      audio_zh: "",
      video_zh: "",
      id: null,
      parentMsg: this.$route.query.fatherId
    };
  },
  created() {
    console.log(this.parentMsg);
    // this.$refs.editor.pass();
    // this.$refs.myeditorx.passvalx();
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id, 'vvvvvvvv');
    
    this.getTruename();//获取用户真实姓名
    if(this.id){
      this.getDetails(this.id);
    }
    
  },
  methods: {
    // 详情
    getDetails(id){
      detailAPI(id).then(res => {
        console.log(res,'bbbbbbbbbbbbbbb');
        if(res.data.code===0){
          
          this.usofferform = res.data.data;
        }else{
          this.$message.error(res.data.msg)
        }
      });
    },
    //获取用户名
    getTruename(){
      console.log('111111111111111111');
      
      const id = Cookies.get('userId');
      detailsAPI({id: id}).then(res => {
        if (res.data.code === 0) {
          //console.log(res.data.data.name)
          this.usofferform.author=res.data.data.name||"";
        }
      })
    },
    // 保存
    onSubmit() {
      this.$refs.editor.pass();
      this.$refs.myeditorx.passvalx();
      this.$refs["usofferform"].validate(valid => {
        if (valid) {
          saveAPI(this.usofferform).then(res => {
            console.log(res,'5555555555');
            if (res.data.code === 0) {
              this.$message.success("投稿成功");
              this.$router.push({ path: "/medicalother", query: { id: Cookies.get('authorId')}});
            }
          });
        }
      });
    },
    /*传过来的值*/
    pass(val) {
      this.childVal = val;
      this.usofferform.synopsis = val;
    },
    passvalx(val) {
      this.childvalx = val;
      this.usofferform.text = val;
    },

    // 上传音视频有关
    beforeAudioUpload(file) {
      //beforePDFUpload、handlePDFSuccess上传音频相关
      let type = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
      const isAudio = type === "mp3" || type === "mp4";
      if (!isAudio) {
        this.$message.error("上传只能是 mp3 mp4 格式!");
        return isAudio;
      }
      this.$message.warning("上传中");
    },

    handleAudioSuccess(response, file, fileList) {
      console.log(response);
      this.$message.success("上传成功");
      this.name = response.originalFileName;
      this.usofferform.audio = response.fileName
      this.usofferform.video = response.fileName
    },

    // 上传附件有关
    beforeUpload(file) {
      let type = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
      const isType = type == "doc" || type == "docx" || type == "pdf" || type == "zip";
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isType) {
        this.$message.error("上传附件格式工为doc, docx, pdf, zip!");
        return isType;
      }
      if (!isLt100M) {
        this.$message.error("上传附件大小不能超过100M!");
        return isLt100M;
      }
      this.$message.warning("上传中");
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.$message.success("上传成功");
      this.accessories_zh = response.originalFileName
      this.usofferform.accessories = response.fileName
    },

    // 删除
    del() {
      // console.log('1111111111111111111111111111')
      this.name = ""
    }
  }
};
</script>

<style lang="less">
#medical_content .el-input__inner {
  border: 1px solid #449CFE!important;
}

.usoffer_form_wrap .el-button {
  // width: 0 !important;
}

.el-menu {
  margin-top: 36px;
  border-right: none;
}

.el-menu-item {
  padding: 0 !important;
  background-image: url(../../../src/assets/images/medical/list-li.png);
  text-align: center;
  height: 30px;
  line-height: 28px;
  font-size: 20px;
  font-family: FZFSK--GBK1-0;
  color: #333;
  cursor: pointer;
}
.medical_main{
  .el-form{
    .el-input__inner:focus-within{
        border-color: #449CFE !important ;
    }
  }
}
.el-menu-item + .el-menu-item {
  margin-top: 20px;
}

.el-menu-item:focus,
.el-menu-item:hover,
.el-menu-item.is-active {
  background-image: url(../../../src/assets/images/medical/list-li-hover.png) !important;
  color: #095fca !important;
  background-color: #fff !important;
}
</style>
