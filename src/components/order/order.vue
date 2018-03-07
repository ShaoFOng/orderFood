<template>
    <div class="restContainer">
        <head-top headTitle="我的订单" :searboxShow='false'></head-top>
            <div class="container">
                <p v-if="no_order">您还没有订单！</p>
                <div class="order_wrapper">
                    <ul class="order_list">
                        <li class="item-order-li">haha</li>
                        <li class="item-order-li">haha</li>
                        <li class="item-order-li">haha</li>
                        <li class="item-order-li">haha</li>
                        <li class="item-order-li">haha</li>
                    </ul>
                </div>
            </div>
        <footer-box index="2"></footer-box>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import footer from 'components/footer/footer';
    import {getCookie} from '../../assets/js/cookie.js'
    export default {
        data(){
            return {
                no_order:false,
                orders:[],
                user_id:'',
                url:'getorderdetail',//获取订单接口
                detailUrl:'queryOrderByOid',//查询订单详细
                oid:'',
            }
        },
        created(){
            this.getOrder();
        },
        components: {
            'head-top': main_head,
            'footer-box':footer
        },
        methods: {
            //获取订单信息
            getOrder(){
                this.user_id = getCookie("user_id");
                var data = {
                    'id':this.user_id
                };
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    console.log(data);
                    if (list.code == 200) {
                        this.orders = list.list;
                        for (var i = 0; i < list.list.length; i++) {
                            this.oid = list.list[i].id;
                            this.getDetail();
                        }
                        // this.showAlert = true;
                        // this.alertText = '密码修改成功!';
                        // setTimeout(function(){
                        //       this.showAlert = false;
                        //       this.$router.push('/login');
                        //   }.bind(this),500);
                    }
                    else {
                        this.no_order = true;
                        // this.showAlert = true;
                        // this.alertText = list.msg;
                    }
                })
            },
            getDetail(){
                let detail = publicDom.base_url+this.detailUrl;
                this.$http.post(detail,{'id':this.oid},{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        // this.orders = list.list;
                        this.orders.detail = list.list;
                        console.log(this.orders);
                        // this.showAlert = true;
                        // this.alertText = '密码修改成功!';
                        // setTimeout(function(){
                        //       this.showAlert = false;
                        //       this.$router.push('/login');
                        //   }.bind(this),500);
                    }
                    else {
                        this.no_order = true;
                        // this.showAlert = true;
                        // this.alertText = list.msg;
                    }
                })
            }
        },
        watch: {
            '$route':'getOrder'
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
.order-list {
    width: 100%;
}
ul, li {
    list-style: none;
}
.order-list li {
    background-color: #f9fdff;
    margin-bottom: 10px;
    border-bottom: 1px solid #dbdcde;
}
.container{
    margin-bottom:2.1rem;
}
</style>
