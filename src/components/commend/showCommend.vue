<template>
    <div>
        <head-top :headTitle="getfoodName" :searboxShow='false'></head-top>
        <div id="widget-shopcomment-info">
            <div class="info-num">
                <div class="num">4.8</div>
                <div>整体评价</div>
            </div>
            <div class="info-arrow">
                <div class="info-list">
                    <span class="info-list-txt">服务评价</span>
                    <span class="info-list-arrow">
                        <span class="arrow-select" style="width:88.2px"></span>
                    </span>
                    <span class="info-list-num">4.9</span>
                </div>
                <div class="info-list">
                    <span class="info-list-txt">菜品质量</span>
                    <span class="info-list-arrow">
                        <span class="arrow-select" style="width:86.4px"></span>
                    </span>
                    <span class="info-list-num">4.8</span>
                </div>
            </div>
        </div>
        <p v-if="no_comment" class="comment_tip">该菜品暂时没有评价</p>
        <div id="widget-shopcomment-list">
            <ul class="comment-list-all">
                <li v-for="item in this.comments">
                    <div class="comment-img">
                        <img src="static/img/people.jpg">
                    </div>        
                    <div class="comment-content">
                        <div class="comment-list-title">
                            <span class="comment-left">{{item.account}}</span>
                            <span class="comment-right">{{item.time | formatDate}}</span>
                        </div>
                        <div class="comment-container">{{item.content}}</div>                                                       
                    </div>  
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import main_head from 'components/header/main_head';
    export default {
    	data(){
            return{
                no_comment:false,
                foodName:null,//菜品名称
                getCommentUrl:'getComment',//获取菜品评价接口
                comments:[],//存储评论数据

            }
        },
        components: {
            'head-top': main_head
        },
        filters:{
            formatDate(time){
                var data = new Date(time);
                return formatDate(data,'yyyy-MM-dd hh:mm:ss');
            }
       },
        created(){
           
        },
        mounted(){
            this.getComment();
        },
        computed: {
            getfoodName(){
                return this.$route.params.foodName;
            }
        },
        methods: {
            //获取菜品评价
            getComment(){
                this.foodName = this.$route.params.foodName;
                var data = {
                    'name':this.foodName
                };
                let url = publicDom.base_url+this.getCommentUrl;
                this.$http.post(url,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        if(list.object.length == 0){
                            this.no_comment = true;
                        }
                        else{
                            this.no_comment = false;
                        }
                        this.comments = list.object;
                    }
                    else {
                        layer.open({
                            style: 'top: 0px;'
                            ,content: '未知错误！'
                            ,skin: 'msg'
                            ,time: 1 //1秒后自动关闭
                          });
                    }
                })
            },

        },
        watch: {
            '$route':'getComment'
        }

    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
#widget-shopcomment-info {
    background: #fff;
    padding: 20px;
    height: 74px;
    position: relative;
    padding-top: 2.89rem;
}
#widget-shopcomment-info .info-num {
    width: 3.2rem;
    position: absolute;
    left: 20px;
    top: 2.89rem;
    color: #4d4d4d;
    font-weight: 700 !important;
    text-align: center;
    font-size: 0.66rem;
    margin-top: 5px;
}
#widget-shopcomment-info .info-num .num {
    font-size: 36px;
    color: #fe2947;
    font-weight: 400;
}
#widget-shopcomment-info .info-arrow {
    margin-left: 3.6rem;
    color: #333;
    padding: 0 0 10px 20px;
    border-left: solid 1px #ccc;
}
#widget-shopcomment-info .info-arrow .info-list {
    padding-top: 10px;
    font-size: 0.7rem;
}
#widget-shopcomment-info .info-arrow .info-list-arrow {
    display: inline-block;
    width: 90px;
    background: url(//static.waimai.baidu.com/static/mwaimai/images/comment/evaluation_normal@2x_dd1eef2.png) repeat-x;
    background-size: 18px;
    height: 18px;
    position: relative;
    top: 3px;
}
#widget-shopcomment-info .info-arrow .info-list-arrow .arrow-select {
    display: inline-block;
    height: 18px;
    width: 90px;
    background: url(//static.waimai.baidu.com/static/mwaimai/images/comment/evaluation_selected@2x_8c28d85.png) repeat-x;
    background-size: 18px;
}
#widget-shopcomment-info .info-arrow .info-list-num {
    color: #fe2947;
}
#widget-shopcomment-info .info-arrow .info-list {
    padding-top: 10px;
}
#widget-shopcomment-info .info-arrow .info-list-arrow {
    display: inline-block;
    width: 90px;
    background: url(//static.waimai.baidu.com/static/mwaimai/images/comment/evaluation_normal@2x_dd1eef2.png) repeat-x;
    background-size: 18px;
    height: 18px;
    position: relative;
    top: 3px;
}
#widget-shopcomment-info .info-arrow .info-list-arrow .arrow-select {
    display: inline-block;
    height: 18px;
    width: 90px;
    background: url(//static.waimai.baidu.com/static/mwaimai/images/comment/evaluation_selected@2x_8c28d85.png) repeat-x;
    background-size: 18px;
}
#widget-shopcomment-info .info-arrow .info-list-num {
    color: #fe2947;
}
#widget-shopcomment-list{
    background: #fff;
    margin-top:20px;
}
#widget-shopcomment-list ul {
    padding: 0 15px 15px;
}
#widget-shopcomment-list ul li {
    position: relative;
    border-bottom: solid 1px #dbdcde;
    padding: 15px 0 10px;
}
#widget-shopcomment-list ul li .comment-img {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 10px;
    top: 10px;
}
#widget-shopcomment-list ul li .comment-img img {
    width: 100%;
    border-radius: 40px;
}
#widget-shopcomment-list ul li .comment-content {
    margin-left: 60px;
    line-height: 0.66rem;
}
#widget-shopcomment-list ul li .comment-content .comment-list-title {
    color: #333;
}
#widget-shopcomment-list ul li .comment-content>div {
    display:flex;
    margin-bottom: 10px;
}
.comment-left{
    flex:1;
    font-size:0.62rem;
}
#widget-shopcomment-list ul li .comment-content .comment-list-title .comment-right {
    flex:1;
    text-align:right;
    font-size:0.62rem;
    color: #999;
}
.comment-container{
    font-size: 0.62rem;
}
.comment_tip{
    text-align: center;
    padding-top:15px;
}
</style>
