import Vue from 'vue'
import Router from 'vue-router'
import PersonHeader from '@/components/PersonHeader.vue'
import LoginHeader from '@/components/LoginHeader.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/epidemic',
      name: 'epidemic',
      title: '疫情首页',
      meta: {title: '疫情首页'},
      component: () =>
        import ('@/views/epidemic/index')
    },
    {
      path: '/epidemicCom',
      name: 'epidemicCom',
      meta: {title: ''},
      redirect: '/',
      component: () =>
        import ('@/views/epidemic/component.vue'),
      children: [

        {
          path: '/epidemicRead',
          name: 'epidemicRead',
          title: '疫情详情',
          meta: {title: '疫情详情'},
          component: () =>
            import ('@/views/epidemic/read')
        },{
          path: '/epidemicSearch',
          name: 'epidemicSearch',
          title: '疫情全文搜索',
          meta: {title: '疫情全文搜索'},
          component: () =>
            import ('@/views/epidemic/search')
        },{
          path: '/epidemicMessage',
          name: 'epidemicMessage',
          title: '资讯',
          meta: {title: '资讯',keepAlive: true },
          component: () =>
            import ('@/views/epidemic/message')
        },{
          path: '/epidemicForum',
          name: 'epidemicForum',
          title: '防疫讲堂',
          meta: {title: '防疫讲堂'},
          component: () =>
            import ('@/views/epidemic/forum')
        },{
          path: '/epidemicDetail',
          name: 'epidemicDetail',
          title: '文章详情',
          meta: {title: '文章详情'},
          component: () =>
            import ('@/views/epidemic/detail')
        },{
          path: '/epidemicList',
          name: 'epidemicList',
          title: '新冠肺炎防控知识',
          meta: {title: '新冠肺炎防控知识'},
          component: () =>
            import ('@/views/epidemic/list')
        },{
          path: '/epidemicBook',
          name: 'epidemicBook',
          title: '图书',
          meta: {title: '图书'},
          component: () =>
            import ('@/views/epidemic/book')
        },{
          path: '/epidemicBookDetail',
          name: 'epidemicBookDetail',
          title: '图书详情',
          meta: {title: '图书详情'},
          component: () =>
            import ('@/views/epidemic/bookDetail')
        },
        {
          path: '/epidemicEbook',
          name: 'epidemicEbook',
          meta: { title: '阅读器' },
          component: () =>
            import ('@/views/epidemicEbook/ebook')
        },
        {
          path: '/epidemicAbout',
          name: 'epidemicAbout',
          meta: { title: '关于我們' },
          component: () =>
            import ('@/views/epidemic/aboutUs')
        },
      ],
    }, {
      path: '/index',
      name: 'defaultPage',
      meta: {title: '主页面'},
      component: () =>
        import ('@/views/home/index')
    }, {
      path: '/',
      name: 'index',
      meta: {title: '主页面'},
      component: () =>
        import ('@/views/home/index')
    }, {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {title: '关于我们'},
      component: () =>
        import ('@/views/home/aboutUs')
    },
    {
      path: '/personal',
      name: 'personal',
      meta: {title: '个人中心'},
      component: PersonHeader,
      children: [{
        path: '/personalIndex',
        name: 'personalIndex',
        meta: {title: '个人中心'},
        component: () =>
          import ('@/views/personal/index')
      }, {
        path: '/invoice',
        name: 'invoice',
        meta: {title: '我的发票'},
        component: () =>
          import ('@/views/personal/invoice')

      }, {
        path: '/editPerson',
        name: 'editPerson',
        component: () =>
          import ('@/views/personal/edit-person')
      },
        {
          path: '/invoiceDetails',
          name: 'invoiceDetails',
          component: () =>
            import ('@/views/personal/invoice-details')
        },
        {
          path: '/bookshelf',
          name: 'bookshelf',
          component: () =>
            import ('@/views/personal/my-bookshelf')
        },
        {
          path: '/favorite',
          name: 'favorite',
          component: () =>
            import ('@/views/personal/favorite')
        },
        {
          path: '/order',
          name: 'order',
          meta: {title: '我的订单'},
          component: () =>
            import ('@/views/personal/my-order')
        },
        {
          path: '/interest',
          name: 'interest',
          component: () =>
            import ('@/views/personal/interest')
        },
        {
          path: '/note',
          name: 'note',
          meta: {title: '我的笔记'},
          component: () =>
            import ('@/views/personal/my-note')
        },
        {
          path: '/contribute',
          name: 'contribute',
          component: () =>
            import ('@/views/personal/my-contribute')
        },
        {
          path: '/browsing',
          name: 'browsing',
          meta: {title: '浏览记录'},
          component: () =>
            import ('@/views/personal/browsing')
        },
        {
          path: '/set',
          name: 'set',
          meta: {title: '账户安全'},
          component: () =>
            import ('@/views/personal/set')
        },
        {
          path: '/question',
          name: 'question',
          component: () =>
            import ('@/views/personal/question')
        }, {
          path: '/comment',
          name: 'comment',
          meta: {title: '我的评论'},
          component: () =>
            import ('@/views/personal/my-comment')
        }, {
          path: '/account',
          name: 'account',
          component: () =>
            import ('@/views/personal/account')
        },

      ]
    },
    {
      path: '/organization',
      name: 'organization',
      meta: {title: '机构中心'},
      component: () =>
        import ('@/views/personal/organization'),
      children: [{
        path: '/organizationIndex',
        name: 'organizationIndex',
        meta: {title: '机构中心'},
        component: () =>
          import ('@/views/personal/organizationIndex')
      },

        {
          path: '/organizationFavorite',
          name: 'organizationFavorite',
          component: () =>
            import ('@/views/personal/favorite')
        },
        {
          path: '/organizationBookshelf',
          name: 'organizationBookshelf',
          component: () =>
            import ('@/views/personal/my-bookshelf')
        },
        {
          path: '/organizationBrowsing',
          name: 'organizationBrowsing',
          meta: {title: '浏览记录'},
          component: () =>
            import ('@/views/personal/browsing')
        }, {
          path: '/organizationSet',
          name: 'organizationSet',
          meta: {title: '账户安全'},
          component: () =>
            import ('@/views/personal/set')
        }
      ]
    }, {
      path: '/commentReply',
      name: 'commentReply',
      title: '评论回复',
      component: () =>
        import ('@/views/personal/commentReply')
    },
    {
      path: '/wechat',
      name: 'wechat',
      title: '微信支付',
      component: () =>
        import ('@/views/personal/wechat-pay')
    },
    {
      path: '/messageDetails',
      name: 'messageDetails',
      title: '消息详情',
      meta: {title: '消息详情'},
      component: () =>
        import ('@/views/home/message-details')
    }, {
      path: '/message',
      name: 'message',
      title: '消息',
      meta: {title: '消息'},
      component: () =>
        import ('@/views/home/message')
    },
    { /*全部回复*/
      path: '/comments',
      name: 'comments',
      title: '全部评论',
      meta: {title: '全部评论'},
      component: () =>
        import ('@/views/personal/comments')
    },
    {
      path: '/failure',
      name: 'failure',
      component: () =>
        import ('@/views/personal/failure')
    },
    {
      path: '/review',
      name: 'review',
      meta: {title: '商品评价'},
      component: () =>
        import ('@/views/personal/review')
    },
    {
      path: '/recharge',
      name: 'recharge',
      meta: {title: '账户余额'},
      component: () =>
        import ('@/views/personal/recharge')
    },
    {
      path: '/pay',
      name: 'pay',
      meta: {title: '支付订单'},
      component: () =>
        import ('@/views/personal/pay')
    },
    {
      path: '/success',
      name: 'success',
      meta: {title: '支付成功'},
      component: () =>
        import ('@/views/personal/pay-success')
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      meta: {title: '订单详情'},
      component: () =>
        import ('@/views/personal/order-details')
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      meta: {title: '购物车'},
      component: () =>
        import ('@/views/shopping/index')
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      meta: {title: '确认订单'},
      component: () =>
        import ('@/views/shopping/confirm-order')
    },
    {
      path: '/loginIndex',
      name: 'loginIndex',
      meta: {title: '登录'},
      component: LoginHeader,
      children: [{
        path: '/login',
        name: 'login',
        component: () =>
          import ('@/views/login/index')
      },
        {
          path: '/register',
          name: 'register',
          component: () =>
            import ('@/views/login/register')
        },
        {
          path: '/number',
          name: 'number',
          component: () =>
            import ('@/views/login/account-number')
        },
        {
          path: '/create',
          name: 'create',
          component: () =>
            import ('@/views/login/account-create')
        },
        {
          path: '/password',
          name: 'password',
          component: () =>
            import ('@/views/login/reset-password')
        }
      ]
    },
    {
      path: '/medical',
      name: 'medical',
      component: () =>
        import ('@/views/medical_information/index'),
      children: [{
        path: '/information',
        name: 'information',
        meta: {title: '医药资讯'},
        component: () =>
          import ('@/views/medical_information/information')
      }, {
        path: '/column',
        name: 'column',
        meta: {title: '考试专栏'},
        component: () =>
          import ('@/views/medical_information/column')
      }, {
        path: '/online',
        name: 'online',
        meta: {title: '在线咨询'},
        component: () =>
          import ('@/views/medical_information/online')
      }, {
        path: '/leave',
        name: 'leave',
        meta: {title: '留言内容'},
        component: () =>
          import ('@/views/medical_information/leave')
      }, {
        path: '/medicalDetails',
        name: 'medicalDetails',
        meta: {title: '医药资讯详情'},
        component: () =>
          import ('@/views/medical_information/medical_details')
      }]
    }, {
      path: '/article',
      name: 'article',
      component: () =>
        import ('@/views/medical_information/article')

    }, {
      path: '/answer',
      name: 'answer',
      meta: {title: '答疑详情'},
      component: () =>
        import ('@/views/experts_answer/index')
    }, {

      path: '/expertsLeave',
      name: 'expertsLeave',
      meta: {title: '留言内容'},
      component: () =>
        import ('@/views/experts_answer/expert_leave')
    }, {

      path: '/nation',
      name: 'nation',
      meta: {title: '民族列表'},
      component: () =>
        import ('@/views/home/nation_list')
    },
    {
      path: '/mongolia',
      name: 'mongolia',
      meta: {title: '民族主页'},
      component: () =>
        import ('@/views/home/mongolia')
    }, {
      path: '/medicalother',
      name: 'medicalother',
      meta: {title: '医家详情'},
      component: () =>
        import ('@/views/medical_information/user_other')
    }, {
      path: '/usoffer',
      name: 'usoffer',
      meta: {title: '在线投稿'},
      component: () =>
        import ('@/views/home/us_offer')
    }, {
      path: '/medetails',
      name: 'medetails',
      meta: {title: '医著详情'},
      component: () =>
        import ('@/views/home/me_details')
    }, {
      path: '/pdfread',
      name: 'pdfread',
      meta: {title: 'PDF文章'},
      component: () =>
        import ('@/views/home/pdf_read')
    }, {
      path: '/articleread',
      name: 'articleread',
      meta: {title: '文章阅读'},
      component: () =>
        import ('@/views/home/article_read')

    }, {
      path: '/mongoliaArticle',
      name: 'mongoliaArticle',
      meta: {title: '蒙文文章'},
      component: () =>
        import ('@/views/home/mongolia_article')

    },
    {
      path: '/theory',
      name: 'theory',
      meta: {title: '全文检索'},
      component: () =>
        import ('@/views/home/theory')
    }, {
      path: '/ebook',
      name: 'ebook',
      meta: { title: '阅读器' },
      component: () =>
        import ('@/views/Ebook/ebook')
    },

    {
      path: '/resources',
      name: 'resources',
      meta: {title: '资源管理'},
      component: () =>
        import ('@/views/resources/index'),
      children: [
        {
          path: '/content',
          name: 'content',
          meta: {title: '内容管理'},
          component: () => import('@/views/resources/content')
        },
        {
          path: '/addContList',
          name: 'addContList',
          meta: {title: '添加内容'},
          component: () => import('@/views/resources/addContList')
        },
        {
          path: '/addCont',
          name: 'addCont',
          meta: {title: '添加内容'},
          component: () => import('@/views/resources/addCont')
        },
        {path: '/lesson', name: 'lesson', meta: {title: '课程管理'}, component: () => import('@/views/resources/lesson')},
        {
          path: '/addLesson',
          name: 'addLesson',
          meta: {title: '添加课程'},
          component: () => import('@/views/resources/addLesson')
        },
        {path: '/video', name: 'video', meta: {title: '视频管理'}, component: () => import('@/views/resources/video')},
        {
          path: '/addVideo',
          name: 'addVideo',
          meta: {title: '添加视频'},
          component: () => import('@/views/resources/addVideo')
        },
      ],

    },
    {
      path: '*',
      name: 'index',
      component: () =>
        import ('@/views/home/index'),
    }
  ]
})
