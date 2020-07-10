<template style="height:100%">
    <div class="sub_right">
        <div class="sub_rightLine"></div>
        <div class="article_details">
            <div class="article_details_title">蒙医药学——理论体系的形成和发展</div>
            <div class="article_details_subtitle">
                <span class="article_origin">来源：《蒙族医药发展史》</span>
                <span>分享:<i class='article_weixinshare'></i></span>
            </div>
            <div class="article_content">
                <p class="article_content_line">
        
                蒙医药是蒙古族人民多年与疾病作斗争过程中总结出的一套完整的系统的医药，具有显著的地区特色和民族特色，具有悠久的历史、独特的理论及丰富的临床经验，除多用天然药物以外，还有灸疗、火针、药浴、放血等多种特色疗法。蒙医药特有的治病法则、天然和安全等特性赋予的潜在市场利润使其在医药领域受到广泛关注，为蒙医药的传承和发展提供了良好的机遇。但是，目前蒙医药发展还存在规模小、人才短缺、需求量少等问题。为了更好地促进蒙医药发展，加强蒙医药文献资源的信息化管理，加强蒙医药科研工作及蒙医药相关宣传工作，充分开发利用蒙医药饮食等，以适应时代的新要求，满足人们日益增长的安全有效医疗服务要求，笔者提出促进蒙医药


                        
                </p>

            </div>
        </div>

    </div>
</template>

<script>
import "@static/css/medical_information/index.less"


export default {
    name: 'article',
    data () {
        return {
        }
    },
    mounted () {
        
    },
    methods: {
       
    }
}
</script>

<style lang="less">
    .article_details{
        .article_details_title{
            color: #000;
            font-size: 24px;
            margin-top:54px;
            margin-bottom: 29px;
            text-align: center;
        }
        .article_details_subtitle{
            text-align: center;
            color:#999;
        }
        .article_weixinshare{
            width: 20px;
            height: 20px;
            display: inline-block;
            background-image: url(../../assets/images/medical/article_weixin_icon.png);
            background-repeat: no-repeat;
            vertical-align: bottom;
            margin-left: 2px
        }
        .article_origin{
            // margin-left: 4px;
        }
        .article_content{
            color: #555;
            font-size: 14px;
            padding: 30px;
            .article_content_line{
                line-height: 30px;
                text-indent: 28px;
            }
        }
        
    }
</style>
