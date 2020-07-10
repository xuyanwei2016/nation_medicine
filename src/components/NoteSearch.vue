<template>
    <div class="search_left">
        <div class="search_input">
            <input type="text" class="search" placeholder="输入内容搜索">
        </div>
        <div class="search_btn">
            <a href="#" class="btn">搜索</a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
     .search_left {
        width: 292px;
        height: 32px;
        float: left;
        .search_input {
            width: 230px;
            height: 30px;
            border: 1px solid rgba(238,238,238,1);
            border-radius:3px 0px 0px 3px;
            float: left;
            border-right: none;
            .search {
                width: 220px;
                height: 28px;
                padding-left: 10px;
            }
        }
        .search_btn {
            float: left;
            width: 60px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            background:rgba(70,146,251,1);
            border-radius:0px 3px 3px 0px;
            .btn {
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        input {
            outline: none;
            border: none;
        }
        
    }
</style>
