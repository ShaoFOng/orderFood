<template>
    <div class="restContainer">
        <head-top headTitle="注册界面" :searboxShow='false'></head-top>
        <form class="restForm">
            <section class="input_container">
                <input type="text" placeholder="请输入昵称" name="uname" maxlength="8" v-model="uname">
            </section>
            <section class="input_container phone_number">
                <input type="text" placeholder="账号/手机号/邮箱" name="account" maxlength="20" v-model="account">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请输入密码" minlength="6" name="newPassWord" maxlength="12" v-model="newPassWord">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请确认密码" minlength="6" maxlength="12" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="性别" name="sex" maxlength="20" v-model="sex">
            </section>
            <section class="input_container">
                <input type="email" placeholder="邮箱" name="email" v-model="email">
            </section>
            <section class="input_container">
                <input type="text" placeholder="电话" maxlength="11" name="phone" v-model="phone">
            </section>
        </form>
        <div class="login_container" @click="resetButton">注册</div>
        
        <alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    import alertTip from 'components/errorTip/errorTip';
    export default {
        data(){
            return {
                account: null, //账号
                newPassWord: null, //新密码
                uname: null,//昵称
                sex:null,//性别
                email:null,//邮箱
                phone:null,//电话
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                confirmPassWord: null, //确认密码
                captchaCodeImg: null, //验证码地址
                mobileCode: null, //短信验证码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile',//注册方式
                url: 'register',//
            }
        },
        components: {
            'head-top': main_head,
            'alertTip': alertTip
        },
        methods: {
            //前端验证是否输入正确
            async resetButton(){
                if(!this.uname){
                    this.showAlert = true;
                    this.alertText = '昵称不能为空';
                    return
                }
                else if (!this.account) {
                    this.showAlert = true;
                    this.alertText = '账号不能为空';
                    return
                }
                else if(!this.newPassWord){
                    this.showAlert = true;
                    this.alertText = '密码不能为空';
                    return
                }
                else if(this.newPassWord.length<6){
                    this.showAlert = true;
                    this.alertText = '密码至少为6位';
                    return
                }
                else if(!this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '确认的密码不能为空';
                    return
                }else if(this.newPassWord !== this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '两次输入的密码不一致';
                    return
                }
                else if(!this.sex){
                    this.showAlert = true;
                    this.alertText = '请输入性别';
                    return
                }
                else if(!this.email){
                    this.showAlert = true;
                    this.alertText = '请输入邮箱';
                    return
                }
                else if(!this.phone){
                    this.showAlert = true;
                    this.alertText = '请输入电话';
                    return
                }
                else{
                    this.register();
                }
                // 发送重置信息
                // let res = await sendMobile(this.phoneNumber, this.mobileCode, this.accountType, this.newPassWord);
                // if (res.message) {
                //     this.showAlert = true;
                //     this.alertText = res.message;
                //     return
                // }else{
                //     this.showAlert = true;
                //     this.alertText = '密码修改成功';
                // }
            },
            //注册请求
            register(){
                var data = {
                    'account':this.account,
                    'name':this.uname,
                    'pwd':this.newPassWord,
                    'sex':this.sex,
                    'email':this.email,
                    'phone':this.phone
                }
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        this.showAlert = true;
                        this.alertText = '注册成功,请登录!';
                        setTimeout(function(){
                              this.showAlert = false;
                              this.$router.push('/login');
                          }.bind(this),100);
                    }
                    else {
                        this.showAlert = true;
                        this.alertText = list.msg;

                    }
                })
            },
            closeTip(){
                this.showAlert = false;
            }   
        }
    }


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .restContainer{
        padding-top: 1.95rem;
    }
    .restForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
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
    .login_container{
        margin: 1rem .5rem;
        sc(.7rem, #fff);
        background-color: rgba(0, 160, 220, 0.63);
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>
