<template>
    <div class="restContainer">
        <head-top headTitle="我的购物车" :searboxShow='false'></head-top>
        <div class="container">
            <p v-if="none" class="noMessage">您没有购物车空空如也~快去添加吧！</p>
            <a v-for="item in this.shoppingChart" data-v-e8380afc="" data-v-08f9d9b7="" href="javascript:" class="ordercard">
                <div data-v-e8380afc="" class="ordercard-body">
                    <div data-v-e8380afc="" class="ordercard-avatar">
                        <img data-v-e8380afc="" src="https://fuss10.elemecdn.com/d/aa/ca5c84424ac1b929cdb35c745b7b0jpeg.jpeg?imageMogr/format/webp/">
                    </div>
                    <div data-v-e8380afc="" class="ordercard-content">
                        <div data-v-e8380afc="" class="ordercard-head">
                            <div data-v-e8380afc="" class="title">
                                <p data-v-e8380afc="" class="name">
                                    <span data-v-e8380afc="" class="content">{{item.rname}}</span>
                                    <i class="fa fa-fw fa-angle-right main-1kNSK"></i>
                                </p>
                                <p data-v-e8380afc="" :class="status" @click='delChart'><i class="fa fa-fw fa-trash-o"></i></p>
                            </div>
                        </div>
                        <div data-v-e8380afc="" class="ordercard-detail">
                            <p data-v-e8380afc="" class="detail">
                                <span data-v-e8380afc="" class="productname ellipsis">{{item.dname}}</span>
                                <span data-v-e8380afc="">等{{item.num}}件商品</span>
                            </p>
                            <p data-v-e8380afc="" class="price">¥{{item.total}}</p>
                        </div>
                    </div>
                </div>
                <div data-v-e8380afc="" class="ordercard-bottom">
                    <button data-v-e8380afc="" class="cardbutton alert">去结算</button>
                </div>
            </a>
        </div>
        <footer-box index="3"></footer-box>
        <alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import {getCookie} from '../../assets/js/cookie.js'
    import footer from 'components/footer/footer';
    import alertTip from 'components/errorTip/errorTip';
    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                url:'loadshoppingcar',
                delUrl:'deleteshoppingcar',
                uid:'',
                shoppingChart:{},//购物车信息保存
                none: false,
            }
        },
        created(){
            // console.log(this.$route.params.userInfo);
            this.getChart();
        },
        components: {
            'head-top': main_head,
            'footer-box':footer,
            'alertTip': alertTip
        },
        methods: {
            //删除购物车
            delChart(event){
                console.log(event.currentTarget);
                var param = {
                    'uid':this.uid,
                    'rname':'华莱士',
                    'dname':'中可'
                };
                let myurl = publicDom.base_url+this.delUrl;
                this.$http.post(myurl,param,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        this.shoppingChart = list.list;
                        this.showAlert = true;
                        this.alertText = list.msg;
                        // this.userInfo = list.list;
                        // console.log(this.userInfo);
                        // setTimeout(function(){
                        //       this.showAlert = false;
                        //       this.$router.push('/login');
                        //   }.bind(this),500);
                    }
                    else {
                        this.none = true;
                        this.showAlert = true;
                        this.alertText = list.msg;
                    }
                })
            },
            //获取购物车
            getChart(){
                this.uid = getCookie("user_id"); 
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,{"uid":this.uid},{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        this.shoppingChart = list.list;
                        // this.userInfo = list.list;
                        // console.log(this.userInfo);
                        // setTimeout(function(){
                        //       this.showAlert = false;
                        //       this.$router.push('/login');
                        //   }.bind(this),500);
                    }
                    else {
                        this.showAlert = true;
                        this.alertText = list.msg;
                    }
                })
            },
            delShoppingChart(){
                let myurl = publicDom.base_url+this.url;
            },
            closeTip(){
                this.showAlert = false;
            }
        },
        watch: {
            '$route':'getChart'
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .noMessage{
        width:100%;
        text-align: center;
        display:inline-block;
        font-size:1rem;
        // height:100%;
        margin:0 auto;
        // margin-left:-50%;
        margin-top:1.95rem;
    }
    .main-1kNSK {
        margin-left: .133333rem;
        width: .133333rem;
        height: .186667rem;
    }
        .ordercard .ordercard-head .name .content[data-v-e8380afc] {
        display: inline-block;
        max-width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .ordercard[data-v-e8380afc] {
        display: block;
        margin-top: .266667rem;
        background-color: #fff;
        padding: .373333rem 0 0 .4rem;
    }
    .ordercard-bottom[data-v-e8380afc] {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .ordercard .ordercard-bottom[data-v-e8380afc] {
        border-top: 1px solid #eee;
        padding: .266667rem .426667rem;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
        justify-content: flex-end;
    }
    .ordercard .cardbutton[data-v-e8380afc] {
        padding: .133333rem .266667rem;
        border: 1px solid #2395ff;
        border-radius: .053333rem;
        background-color: transparent;
        outline: none;
        font-size: .56rem;
        color: #2395ff;
        margin-left: .2rem;
    }
    .container{
        margin-bottom:2.1rem;
    }
</style>
