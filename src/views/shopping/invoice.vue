<template>
<div>
    <div class="my_form_wrap">
        <el-form ref="invoiceForm" :model="invoiceForm" :rules="rules" :label-position="rightPos" label-width="100px">
            <el-form-item label="发票类型:" prop="type">
                <span class="invoice_type_tag">电子发票<span class="invoice_tag_good "><i class="el-icon-check"></i></span>
                </span>
            </el-form-item>
            <el-form-item label="发票抬头:" prop="invoiceType">
                <el-radio-group v-model="invoiceForm.invoiceType">
                    <el-radio :label="0">个人</el-radio>
                    <el-radio :label="1">单位</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label=""  v-if="invoiceForm.invoiceType==0" prop="invoiceTitle">
                <el-input v-model="invoiceForm.invoiceTitle" placeholder="请填写姓名"></el-input> 
            </el-form-item>
            <el-form-item label=""  v-if="invoiceForm.invoiceType==1" prop="invoiceTitle">
                <el-input v-model="invoiceForm.invoiceTitle" placeholder="请填写单位名称"></el-input> 
            </el-form-item>
            <el-form-item label="" v-if="invoiceForm.invoiceType==1"  prop="taxpayerIdentificationNumber">
                <el-input v-model="invoiceForm.taxpayerIdentificationNumber" placeholder="纳税人识别号"></el-input>
            </el-form-item>
            <el-form-item label="发票内容:"  prop="invoiceContext">
                <el-select v-model="invoiceForm.invoiceContext" placeholder="请选择">
                    <el-option label="图书" value="1"></el-option>
                    <el-option label="明细" value="2"></el-option>
                    <el-option label="资料" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号:"  prop="invoiceTel">
                <el-input v-model="invoiceForm.invoiceTel"></el-input>
            </el-form-item>
            <el-form-item style="" class="my-button-bar">
                <el-button type="primary" @click="onSubmit('invoiceForm')">保存</el-button>
                <el-button class="cancle-btn" @click="cancel()">取消</el-button>
            </el-form-item>
         </el-form>
    </div>
    <div class="bottom_tip">
             <p>1. 电子发票为增值税普通发票，与纸质普通发票具备同等法律效力，可支持报销入账。 </p>
             <p>2. 实体商品收货后1天可进入【我的订单】-【订单详情】下方【发票信息】处点击下载；电子商品支付成功24小时后即可下载。
            </p>
             <p>3. 查看<a href="#" class='invoice_detils'>发票信息相关问题</a>说明了解更多</p>
    </div>
</div>
</template>

<script>
import '@static/css/personal/invoice_open.less'
import Cookies from 'js-cookie';
export default {
  name: 'invoiceOpen',
  props:['formValue'],
  data() {
      return {
        rightPos:"right",
        dialogFormVisible: false,
        invoiceForm: {
            invoiceContext:"1",//图书,明细，资料
            invoiceTel:"",
            invoiceTitle:"",//人、公司
            invoiceType: 0,//发票抬头
            taxpayerIdentificationNumber: ""//纳税人识别号
        },
        rules: { 
          invoiceTitle:[
            { required: true, message: '请输入名称'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符'} 
          ],
          taxpayerIdentificationNumber: [
            { required: true, message: '请输入纳税人识别号' }
          ],
          invoiceTel: [
            { required: true, message: '请输入手机号'},
            { pattern: /^1[34578]\d{9}$/, message: '手机格式不正确' }
          ],
          invoiceContext: [
            { required: true, message: '请选择发票内容' }
          ],
          invoiceType: [
            { required: true, message: '请选择发票抬头' }
          ] 
        }
      }
  }, 
  mounted() { 
      this.invoiceForm.invoiceTel = Cookies.get('userPhone')
      console.log(this.formValue);
      
    //   this.invoiceForm = this.formValue
  },
  created() {
  },
  methods: {
    onSubmit(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$emit("change-data", this.invoiceForm)
          }
        });
    },
    cancel() {
        this.$emit("change-cancel")
    }
  }
}
</script>

<style lang="less">
    .my_invoice_cover{
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        margin-right:0px;
        img{
            max-width: 100px;
            max-height: 100px
        }
    }
    p.info_con_make{
        color: #03B19F !important;
    }
    .my_invoice_btn{
        .el-button--warning.is-plain{
                color: #F4494A;
                background: transparent;
                border-color: #F4494A;
        }
    }
</style>
