<template>
  <div class="listmafeny03">
    <div>
      <span class="svw">
        <a class="hfdover jumper" :class="{disabled:pstart}" @click="jumpPage(1)" title="首页"></a>
        <a class="hfdover2 jumper" :class="{disabled:pstart}" @click="jumpPage(pageNum-1)" title="上一页"></a>
      </span>
      <!-- <a class="hfover">1</a> -->
      <a v-show="efront" @click="jumpPage(1)">1</a>
      <i v-show="efront">...</i>
      <a v-for="num in indexs" :class="{hfover:pageNum==num}" @click="jumpPage(num)" :key="num">{{num}}</a>
      <i v-show="ebehind">...</i>

      <a v-show="ebehind" @click="jumpPage(lastPage)">{{lastPage}}</a>
      <span class="svw">
        <a class="hfdover3 jumper" :class="{disabled:pend}" @click="jumpPage(Number(pageNum)+1)" title="下一页"></a>
        <a class="hfdover4 jumper" :class="{disabled:pend}" @click="jumpPage(lastPage)" title="尾页"></a>
      </span>
      <i>共{{lastPage}}页，跳转至第</i>
      <input class="trere01" v-model="changePage" @keyup.enter="jumpPage(changePage)" name="" @blur="resetPage">
      <i>页</i>
      <!-- <input class="trere02 z-b-e" name="" type="button" value="确定"> -->
      <!-- <button class="trere02 z-b-e" @click="jumpPage(changePage)">确定</button> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      totalPage: Number,
      currentPage: {
        // type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        lastPage: this.totalPage,
        pageNum: this.currentPage,
        changePage: this.pageNum,
      }
    },
    watch: {
      currentPage:{
        immediate: true,
        handler(val, oldVal){
          this.pageNum=this.currentPage;
        },
      },
      totalPage(val, oldVal) {
        this.lastPage = val
      },
    },
    computed: {
      pstart() {
        return this.pageNum == 1;
      },
      pend() {
        return this.pageNum == this.lastPage;
      },
      efront() {
        if (this.lastPage <= 7) return false;
        return this.pageNum > 5
      },
      ebehind() {
        if (this.lastPage <= 7) return false;
        let nowAy = this.indexs;
        return nowAy[nowAy.length - 1] != this.lastPage;
      },
      indexs() {
        let left = 1,
          right = this.lastPage,
          arr = [];
        if (this.lastPage >= 7) {
          if (this.pageNum > 5 && this.pageNum < this.lastPage - 4) {
            left = Number(this.pageNum) - 3;
            right = Number(this.pageNum) + 3;
          } else {
            if (this.pageNum <= 5) {
              left = 1;
              right = 7;
            } else {
              right = this.lastPage;
              left = this.lastPage - 6;
            }
          }
        }
        while (left <= right) {
          arr.push(left);
          left++;
        }
        return arr;
      }
    },
    methods: {
      resetPage() {
        // if ( Number(changePage)<1) {

        // }
      },
      jumpPage(page) {

        if (page&&page !== this.pageNum && 0 < page&& page <= this.lastPage) {
            console.log(page)
          this.pageNum = page
          this.$emit('change', this.pageNum)
        }
      }
    }
  }
</script>
<style lang="less">
  /*分页*/

  .cpolist .listmafeny03 {
    margin-top: 6px;
    font-family: MicrosoftYaHei;
    font-weight: Regular;
  }

  .cpolister .listmafeny03 {
    border: 1px solid #e3e3e3;
    border-top: 0;
  }

  .listmafeny03 {
    height: 34px;
    text-align: center;
    padding: 22px 0;
    /*background-color: #fff;*//*4.27注销*/
  }

  .listmafeny03 .leftlissd {
    line-height: 34px;
    float: left;
    width: 50px;
    height: 34px;
  }

  .listmafeny03 .left {
    line-height: 34px;
  }

  .listmafeny03 .trere01 {
    width: 34px;
    height: 30px;
    line-height: 34px;
    text-align: center;
    border: 1px solid #dadada;
    float: left;
  }

  .listmafeny03 .trere02 {
    float: left;
    width: 50px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    // color: #7D7D7D;
    border: 1px solid #DADADA;
  }

  .listmafeny03 div {
    height: 34px;
    display: inline-block;
  }

  .listmafeny03 span {
    float: left
  }

  .listmafeny03 i {
    float: left;
    padding: 0 10px;
    line-height: 34px;
    font-family: MicrosoftYaHei;
    font-weight: Regular;
    font-style: inherit;
    color: #333333;
  }

  .listmafeny03 a{
    width: 32px;
    height: 32px;
    line-height: 32px;
    display: block;
    border: 1px #c3c3c3 solid;
    color: #333;
    float: left;
    font-size: 14px;
    cursor: pointer;
    background-color: #FFF;
    margin-left: 8px;
  }

  .listmafeny03 a:hover,
  .listmafeny03 a.hfover {
    /*疫情专题 4.28更改背景色*/
    background-color: #F4494A;
    /*background-color: #9E7B4B;*/
    color: #FFF;
    /*border: 1px #F4494A solid;*/
    border: 1px #9E7B4B solid;
  }

  .listmafeny03 a.hfover {
    pointer-events: none;
  }

  .listmafeny03 a.hfdover {
    font-size: 18px;
    font-weight: bold;
    background: url("../assets/images/jiantous01.png") #fff;
    border: 1px #c3c3c3 solid;
  }

  .listmafeny03 a.hfdover2 {
    font-size: 18px;
    font-weight: bold;
    background: url("../assets/images/jiantous02.png") #fff;
    border: 1px #c3c3c3 solid;
  }

  .listmafeny03 a.hfdover3 {
    font-size: 18px;
    font-weight: bold;
    background: url("../assets/images/jiantous04.png") #fff;
    border: 1px #c3c3c3 solid;
  }

  .listmafeny03 a.hfdover4 {
    font-size: 18px;
    font-weight: bold;
    background: url("../assets/images/jiantous03.png") #fff;
    border: 1px #c3c3c3 solid;
  }

  .listmafeny03 a.hfdover:hover:not(.disabled) {
    background: url("../assets/images/z-jiantous01.png") #F4494A;
    border: 1px #F4494A solid;
  }

  .listmafeny03 a.hfdover2:hover:not(.disabled) {
    background: url("../assets/images/z-jiantous02.png") #F4494A;
    border: 1px #F4494A solid;
  }

  .listmafeny03 a.hfdover3:hover:not(.disabled) {
    background: url("../assets/images/z-jiantous04.png") #F4494A;
    border: 1px #F4494A solid;
  }

  .listmafeny03 a.hfdover4:hover:not(.disabled) {
    background: url("../assets/images/z-jiantous03.png") #F4494A;
    border: 1px #F4494A solid;
  }

  .listmafeny03 .svw .jumper.disabled {
    // background-color: #c3c3c3;
    border: 1px #c3c3c3 solid;
    pointer-events: none;
  }
  .z-b-e {
    background-color: #fff;
  }
</style>
