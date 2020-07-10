<template>
    <div id="message-details">
        <Header></Header>
        <div class="message_content">
            <div class="message_wrap" style="margin-bottom: 20px;">
                <!--面包屑-->
                <navbar></navbar>
                <div class="message_wrap_con" style=" min-height: 550px;">
                    <div class="message_wrap_s">
                        <div class="message_wrap_title">{{resourceForm.title}}</div>
                        <div class="message_wrap_source">
                            <span class="message_wrap_source_tip">来源：中医古籍出版社</span>
                            <span class="message_wrap_source_time">发布于：{{resourceForm.sendTime}}</span>
                        </div>
                    </div>
                    <div class="message_wrap_text">{{resourceForm.content}}</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header'
import navbar from '../../components/navbar.vue';
import Footer from '@/components/Footer'
import '@static/css/personal/message.less'
import { getDetailsAPI } from '@/api/home/message'

export default {
    components: { Header,  Footer, navbar },
    data() {
        return {
            resourceForm: {
                title: null,
                content: null
            }
        }
    },
    mounted() {
        // this.isEdit()
        this.details()
    },
    methods: {
        // isEdit() {
        //     this.$route.meta.title = '消息详情';
        //     const id = this.$route.query.id;
        //     if(id) {
        //         this.$route.meta.title = '消息详情';
        //         this.details(id)
        //     }
        // },
        // 详情页
        details() {
            const id = this.$route.query.id;
            getDetailsAPI(id).then(res => {
                this.resourceForm = res.data.data;
            })
        }
    }
}
</script>

<style>

</style>
