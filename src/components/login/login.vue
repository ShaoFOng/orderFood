<template>
    <div class="loginContainer">
        <head-top :headTitle="loginWay? '登录界面':'注册界面'" :searboxShow='false'></head-top>
        <form class="loginForm">
            <section style="display:none;"><input id="validate" name="cacheValidate" v-model='cacheValidate'></section>
            <section class="input_container border-1px">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input_container border-1px">
                <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
                <input v-else type="text" placeholder="密码"  v-model="passWord">
                <div class="button_switch border-1px" :class="{change_to_text: showPassword}">
                    <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                    <span>显示</span>
                    <span>隐藏</span>
                </div>
            </section>
            <section class="input_container captcha_code_container border-1px">
                <input id="code_input" type="text" placeholder="验证码" maxlength="4" name="verifyCode" v-model="verifyCode">
                <div class="img_change_img">
                    <div id="v_container" style="width: 3.5rem;height: 1.5rem;margin-right: .2rem;"></div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册账号的用户，请先进入注册界面进行账号注册，并同意
            <a href="#">《校园订餐用户服务协议》</a>
        </p>
        <div class="login_container border-1px" @click="mobileLogin">登录</div>
        <router-link to="/register" class="to_forget">忘记密码/注册？</router-link>
        <errorTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></errorTip>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head'
    import errorTip from 'components/errorTip/errorTip'
    import {setCookie,getCookie} from '../../assets/js/cookie.js'

    export default {
        data(){
            return {
                loginWay: true, //登录方式，默认为登录状态
                showPassword: false, // 是否显示密码
                userInfo: null, //获取到的用户信息
                userAccount: '', //用户名
                passWord: '', //密码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                verifyCode: null,//验证码
                cacheValidate: null,//缓存的验证码
                url:'userLogin',//登录接口
                verifyCodeObject:'',
            }
        },
        created(){
            //dom元素还未开始加载前执行
        },
        components: {
            'head-top': main_head,
            'errorTip':errorTip
        },
        computed: {
            //当绑定值改变的时候自动执行

        },
        mounted(){
            //dom元素加载完成后执行
            this.init();
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(getCookie('user_name')){
                // this.$router.push('/home')
            }
        },
        watch: {
            '$route': 'turnback'
        },
        methods: {
            //还原
            turnback(){
                this.userAccount = '';
                this.passWord = '';
                this.verifyCode = '';
            },
            //初始化函数
            init(){  
                    this.verifyCodeObject = new GVerify("v_container");
            },
            //是否显示密码
            changePassWordType(){
                this.showPassword = !this.showPassword;
            },
            //发送登录信息
            async mobileLogin(){
                var res = this.verifyCodeObject.validate(document.getElementById("code_input").value);
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入账号';
                    return
                }else if(!this.passWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }else if(!this.verifyCode){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                else if(!res){
                    this.showAlert = true;
                    this.alertText = '验证码输入错误';
                }
                else {
                    this.login();
                }
                
            },
            closeTip(){
                this.showAlert = false;
            },
            login(){
                let data = {'account':this.userAccount,'pwd':this.passWord};
                console.log(data);
                /*接口请求*/
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res)=>{
                    let list = res.data;
                  if(list.code == 200){
                      /*路由跳转this.$router.push*/
                    setCookie('user_name',this.userAccount,1000*60);//设置1天
                    setCookie('user_passwd',this.passWord,1000*60);
                    //setCookie('user_id',list.list.id,1000*60);
                    // window.localStorage._sell_user_id = list.list.id;//拦截器的判断
                    window.localStorage.setItem('_sell_user_id',list.object.account);
                      setTimeout(function(){
                          this.$router.push('/home');
                      }.bind(this),100);
                  }else{
                      this.showAlert = true;
                      this.alertText = list.msg;
                  }
                });
            }
          
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/base.styl"
    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        ct();
        right: 0.75rem;
        sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            // border-bottom: 1px solid #f1f1f1;
            border-1px(#f1f1f1);
            input{
                sc(.7rem, #666);
            }
            button{
                sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        sc(.5rem, #999);
        padding: .4rem .6rem;
        line-height: .7rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        sc(.7rem, #fff);
        background-color: rgba(0, 160, 220, 0.63);
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;

    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        wh(2rem, .9rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        transition: all .3s;
        .circel_button{
            transition: all .3s;
            position: absolute;
            z-index: 1;
            wh(1.2rem, 1.2rem);
            left: -.1rem;
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;

        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
    #verifyCanvas{
        height:100%;
        width:100%;
    }
</style>
