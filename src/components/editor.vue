<template>
  <div class="editor_wrap">
      <editor v-model='tinymceHtml' :init='init'  :disabled="isShow" ></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
  export default {
    name:"myeditor",
    props: {
      value: {
        type: String,
        default: ''
      },},
    data() {
        return {
            tinymceHtml:this.value,
            init: {
              width: this.$route.name=='addCont'||'addLesson'||'addVideo'?700:'',
                language_url: '/static/tinymce/zh_CN.js',
                // language_url: '/static/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/static/tinymce/skins/lightgray',
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                toolbar:'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false,
                plugins : ""
            },
          isShow:false,
        }
    },
    mounted () {
       tinymce.init({});
      if(this.$route.query.lookId){
        this.isShow=true;
      }
    },
    watch:{
      value(n,o){
        this.tinymceHtml=n;
      },
      tinymceHtml(n,o){
        this.$emit("passVal",this.tinymceHtml)
      },
    },
    methods: {
      passVal(){
        console.log('传值',this.tinymceHtml)
        this.$emit("passVal",this.tinymceHtml)
      },
      pass() {
        this.$emit("pass",this.tinymceHtml);
      },
    passvalx() {
        this.$emit("passvalx",this.tinymceHtml);
      },

    },
    components:{
        Editor
    }
  }
</script>

<style lang="less" scoped>

</style>
