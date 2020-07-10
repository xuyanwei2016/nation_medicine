// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@static/css/common.less'
import App from './App'
import Cookies from 'js-cookie';
import { uploadUrl } from '@/utils/global'
import loginAlert from '@/components/loginAlert.vue';
import store from './store';
import pagination from '@/components/pagination.vue';

Vue.use(ElementUI)
Vue.component('loginAlert', loginAlert)
Vue.component('pagination', pagination);




// router.beforeEach(({ meta, path }, from, next) => { //to: Route:即将要进入的目标路由对象//from: Route:当前导航正要离开的路由//next: Function: 一定要调用该方法来resolve 这个钩子执行效果依赖 next 方法的调用参数。
//     if (Cookies.get('X-Token') && Cookies.get('X-Token') != 'undefined' && Cookies.get('X-Token') != 'null') {
//         next()
//     } else {
//         if (path === '/') {
//             next();
//         } else {
//             next({ path: '/' })
//         }
//     }
//     window.scrollTo(0, 0)
// })

router.beforeEach(({ meta, path }, from, next) => {
    next();
    window.scrollTo(0, 0)
})

Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

/*图片路径*/
Vue.prototype.fileUrl = function(link) { //"http://192.168.2.231:8696/file/file/?fileName=3737b4397b9e4ec7ab3538c5b11ee6ea
        return `${uploadUrl}file/?fileName=` + link
    }
    /*音频路径*/
    // Vue.prototype.audioUrl = function (link) {//"http://192.168.2.231:8696/file/file/?fileName=3737b4397b9e4ec7ab3538c5b11ee6ea
    //   return `http://192.168.2.231/` + link
    // }
Vue.filter('limit', function(value) {


    if (value != undefined) {
        var value = value.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        value = value.replace(/[|]*\n/, '') //去除行尾空格
        value = value.replace(/&nbsp;/ig, ''); //去掉npsp

    }

    var val = value;
    if (value && value.length > 90) {
        var val = (value.replace(/\s+/g, "")).substr(0, 90) + " ..."
    }
    return val
})

Vue.prototype.errorImg = function(img) {
    let imgHref=null;
    imgHref='this.src="' + require('@/assets/images/home/no-cover.jpg') + '"';
    return imgHref
  }

Vue.prototype.Ellipsis = function(id, rows, str,lineH) {
  if (!str || str == '') {
    return ''
  }
  str = str.replace(/<\/?[^>]*>/g, '').replace(/&nbsp;/ig,'');
  if (!str || str == '') {
    return ''
  }
  this.$nextTick(function () {
    var text = document.getElementById(id);
    var lineHeight = lineH;
    var at = rows * parseInt(lineHeight);
    var tempstr = str;
    text.innerHTML = tempstr;
    var len = tempstr.length;
    var i = 0;
    if (text.offsetHeight <= at) {
    }else {
      var temp = "";
      text.innerHTML = temp;
      while (text.offsetHeight <= at) {
        temp = tempstr.substring(0, i + 1);
        i++;
        text.innerHTML = temp;
      }
      var slen = temp.length;
      tempstr = temp.substring(0, slen - 1);
      len = tempstr.length
      text.innerHTML = tempstr.substring(0, len - 3) + "...";
      text.height = at + "px";
    }
    return str
  })

}

Vue.prototype.changeTime = function(time) {
  console.log('时间',new Date(time));
  console.log(new Date(time).getFullYear())
  if(time){
    let year=new Date(time).getFullYear();
    let mouth=new Date(time).getMonth();
    return `${year}年${mouth}月出版`;
  }else{
    return null;
  }


}

import Router from 'vue-router'

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
