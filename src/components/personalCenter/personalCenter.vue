<template>
    <div class="restContainer">
        <head-top headTitle="个人中心" :searboxShow='false'></head-top>
        <section class="profile-number">
            <router-link to='/vipcard' class="profile-link">
                <!-- <img :src="imgpath" class="privateImage" v-if="this.avatar">
                <span class="privateImage" v-else>
                    <svg class="privateImage-svg">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                    </svg>
                </span> -->
                <div class="comment-img"><img src="static/img/people.jpg"></div>
                <div class="user-info">
                    <p>昵称：{{this.name}}</p>
                    <p>
                        <span class="user-icon">
                            <i class="mobile fa fa-fw fa-mobile-phone"></i>
                        </span>
                        <span class="icon-mobile-number">电话:{{this.accountName}}</span>
                    </p>
                </div>
                <span class="arrow">
                    <i class="fa fa-fw fa-angle-right arrow-svg"></i>
                </span>
            </router-link>
        </section>
        <section class="profile-1reTe">
                <!-- 我的订单 -->
                <!--<router-link to='/order' class="myorder">
                    <aside>
                        <i class="fa fa-fw fa-calendar-o" style="color:#4aa5f0;"></i>
                    </aside>
                   
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                    </div>
                </router-link>-->
                <!-- 积分商城 -->
                <a href='#' class="myorder">
                    <aside>
                        <i class="fa fa-fw fa-key"></i>
                    </aside>
                    
                    <router-link to='/passwdChange' class="myorder-div">
                        <span>修改密码</span>
                        <span class="myorder-divsvg">
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                    </router-link>
                </a>
                <!-- 饿了么会员卡 -->
                <router-link to='/vipcard' class="myorder">
                    <aside>
                        <i class="fa fa-fw fa-user"></i>
                    </aside>
                    <div class="myorder-div">
                        <span>修改个人资料</span>
                        <span class="myorder-divsvg">
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='' class="myorder">
                    <aside>
                        <i class="fa fa-fw fa-archive"></i>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                    </div>
                </router-link>

            </section>
        <footer-box index="4"></footer-box>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    import alertTip from 'components/errorTip/errorTip';
    import footer from 'components/footer/footer';
    import {getCookie} from '../../assets/js/cookie.js';
    export default {
        data(){
            return {
                accountName:'',//账户
                name:'',//昵称
            }
        },
        props:['index'],
        components: {
            'head-top': main_head,
            'alertTip': alertTip,
            'footer-box':footer
        },
        created(){
            this.init();
        },
        methods: {
            //初始化
            init(){
                this.accountName = getCookie("user_name");
                this.name = getCookie("nick_name");
            },
            toOrder(){
                this.$router.push("/passwdChange");
            }
        },
        watch: {
            '$route' (to, from) {
                if (from.path === '/vipcard') {
                    this.init()
                }
            }
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .fa-fw{
        width:1em;
    }
    .arrow-svg{
        width:auto;
    }
    .profile-number{
        
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:$blue;
            padding: .666667rem .6rem;
            .privateImage{
                display:inline-block;
                wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.48rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    margin-top: 6px;
                    sc(.8rem,$fc);
                    .user-icon{
                        wh(0.5rem,0.75rem);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem;
                        .mobile{
                            wh(100%,100%);
                            color:#fff;
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        sc(.57333rem,$fc);

                    }
                }

            }
            .arrow{
                wh(.46667rem,.98rem);
                display:inline-block;
                svg{
                   wh(100%,100%);
                }
            }
            .arrow-svg{
                color:#fff;
            }
        }
   }
   .comment-img {
        width: 60px;
        height: 60px;
    }
    .comment-img img {
        width: 100%;
        border-radius: 40px;
    }
    .profile-1reTe{
        margin-top:.4rem;
        background:$fc;
        .myorder{
            box-sizing:border-box;
            padding-left:1.6rem;
            display:flex;
            align-items: center;
            aside{
                wh(.7rem,.7rem);
                margin-left:-.866667rem;
                margin-right:.266667rem;
                display:flex;
                align-items: center;
                svg{
                    wh(100%,100%);
                }
            }
            .myorder-div{
                width:100%;
                border-bottom:1px solid #f1f1f1;
                padding:.433333rem .266667rem .433333rem .266667rem;
                sc(.7rem,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                }
                .myorder-divsvg{
                   wh(.46667rem,.466667rem);
                    svg{
                        wh(100%,100%);
                    }
                }
            }
        }
        .myorder:nth-of-type(3) .myorder-div{
            border:0;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
