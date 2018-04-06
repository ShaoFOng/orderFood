<template>
    <div class="restContainer">
        <head-top headTitle="账户信息" :searboxShow='false'></head-top>
        <div>
        <ul class="main-22cQX">
            <li class="main-3Idiu main-2OSrE">
                <span>头像</span>
                    <span class="main-nwHdE">
                    <input type="file" class="main-1mfZE">
                    <img class="main-27dMr" src="static/img/people.jpg">
                    <svg class="main-1kNSK">
                        <!-- <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use> -->
                    </svg>
                </span>
            </li>
            <li>
                <router-link to='##' class="main-3Idiu">
                    <span>用户名</span>
                    <span>
                        <span class="main-2cJz_">{{this.accountName}}</span>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'changeInfo', params: {'userInfo':this.nickName,'target':'name'}}" class="main-3Idiu">
                    <span>昵称</span>
                    <span>
                        <span class="main-2cJz_">{{this.nickName}}</span>
                        <i class="fa fa-fw fa-angle-right main-1kNSK"></i>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'changeSex', params: {'userInfo':this.sex,'target':'name'}}" class="main-3Idiu">
                    <span>性别</span>
                    <span>
                        <span class="main-2cJz_">{{this.sex}}</span>
                        <i class="fa fa-fw fa-angle-right main-1kNSK"></i>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'changePhone', params: {'userInfo':this.phone,'target':'name'}}" class="main-3Idiu">
                    <span>电话</span>
                    <span>
                        <span class="main-2cJz_">{{this.phone}}</span>
                        <i class="fa fa-fw fa-angle-right main-1kNSK"></i>
                    </span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'changeEmail', params: {'userInfo':this.email,'target':'name'}}" class="main-3Idiu">
                    <span>邮箱</span>
                    <span>
                        <span class="main-2cJz_">{{this.email}}</span>
                        <i class="fa fa-fw fa-angle-right main-1kNSK"></i>
                    </span>
                </router-link>
            </li>
        </ul>
      <button type="button" class="main-aGw6s" @click='qiuck'>退出登录</button></div>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import {delCookie,setCookie,getCookie} from '../../assets/js/cookie.js'
    
    export default {
        data(){
            return {
                accountName:'',//用户名
                nickName:'',//昵称
                sex:'',//性别
                phone:'',//电话
                email:'',//邮箱
            }
        },
        created(){
            this.getUserInfo();
        },
        components: {
            'head-top': main_head,
        
        },
        methods: {
            //获取用户信息
            getUserInfo(){
                this.accountName = getCookie("user_name");
                this.nickName = getCookie("nick_name");
                this.sex = getCookie("sex");
                this.phone = getCookie("phone");
                this.email = getCookie("email");
            },
            qiuck(){
                delCookie('user_name');
                delCookie('user_passwd');
                this.$router.push('/login');
                window.localStorage.removeItem('_sell_user_id');
            }
        },
        watch: {
            '$route' (to, from) {
                if (from.path === '/changeInfo'||from.path === '/changeSex'||from.path === '/changePhone'||from.path === '/changeEmail') {
                    this.getUserInfo()
                }
            }
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    button, input {
        outline: none;
        border: none;
        font-size: inherit;
        font-family: inherit;
    }
    .main-22cQX {
        background-color: #fff;
        width: 100%;
        font-size: .7rem;
        color: #333;
        margin-top: .4rem;
        font-weight: 700;
    }
    .main-2OSrE {
        position: relative;
    }
    
    .main-3Idiu {
        border-top: 1px solid #ddd;
        padding: .4rem .373333rem;
        cursor: pointer;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        color:#666;
    }
    .main-nwHdE {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .main-1mfZE {
        display: block;
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .main-27dMr {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: .6rem;
    }
    img {
        max-width: 100%;
    }
    .main-1kNSK {
        fill: #ddd;
        height: .48rem;
        width: .48rem;
        display: inline-block;
        line-height: 1.2rem;
        padding-top: .133333rem;
    }
    .main-3Idiu:last-child {
        border-bottom: 1px solid #ddd;
    }
    .main-2cJz_ {
        color: #999;
    }
    .main-1OkSR {
        margin: .346667rem 0 0 .4rem;
        color: #666;
        font-weight: 400;
    }
    .main-2X7GQ {
        background-color: #10aeff;
        padding: .053333rem;
        border-radius: .106667rem;
        margin-right: .133333rem;
    }
    .main-aGw6s {
        display: block;
        text-align: center;
        padding: .293333rem 0;
        margin: .4rem auto;
        color: #fff;
        border-radius: .08rem;
        font-size: .7rem;
        font-weight: 800;
        background-color: #ff5339;
        width: 90%;
    }
</style>
