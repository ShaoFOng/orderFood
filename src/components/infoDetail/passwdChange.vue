<template>
    <div>
        <head-top headTitle="账户信息" :searboxShow='false'></head-top>
        <div style="padding-top:1.95rem;">
            <section>
                <ul class="changepw-3LrxS">
                    <li class="changepw-lCnqr">
                        <input type="password" placeholder="旧密码" class="changepw-3bmr-" v-model="oldPasswd" v-on:input ="checkInput">
                    </li>
                    <li class="changepw-lCnqr">
                        <input type="password" placeholder="新密码" class="changepw-3bmr-" v-model="newPasswd" v-on:input ="checkInput">   
                    </li>
                    <li class="changepw-lCnqr">
                        <input type="password" placeholder="确认密码" class="changepw-3bmr-" v-model="comfirePasswd" v-on:input ="checkInput">
                    </li>
                </ul>
                <button type="button" :disabled="Btndisabled" class="changepw-1GfOJ" @click="inputCheck">确认并保存</button>
            </section>
        </div>
        <alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    import alertTip from 'components/errorTip/errorTip';
    export default {
        data(){
            return {
                oldPasswd:null,
                newPasswd:null,
                comfirePasswd:null,
                oldPasswdTip:false,
                newPasswdTip:false,
                comfirePasswdTip:false,
                oldPasswdError:false,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                Btndisabled:true,
                user_name:'',
                user_passwd:'',
                url:'updatePwd',
            }
        },
        mounted(){
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            // var userpasswd = getCookie('user_passwd');
            // var username = getCookie('user_name');
            if(getCookie('user_name')){
                // this.$router.push('/home')
            }
        },
        components: {
            'head-top': main_head,
            'alertTip': alertTip
        
        },
        methods: {
            //获取用户密码
            passwdChange(){
                
            },
            //用户输入验证控制器
            inputCheck(){
                if(this.oldPasswd.length<6||this.oldPasswd.length>20){
                    this.oldPasswdTip = true;
                    layer.open({
                        style: 'top: 0px;'
                        ,content: '旧密码错误！'
                        ,skin: 'msg'
                        ,time: 1 //1秒后自动关闭
                      });
                }
                else{
                    this.oldPasswdTip = false;
                    if (this.oldPasswd!==this.user_passwd) {
                        this.oldPasswdError = true;
                        layer.open({
                            style: 'top: 0px;'
                            ,content: '旧密码错误！'
                            ,skin: 'msg'
                            ,time: 1 //1秒后自动关闭
                          });
                    }
                    else{
                        this.oldPasswdError = false;
                        if(this.newPasswd.length<6||this.newPasswd.length>20){
                            this.newPasswdTip = true;
                            layer.open({
                                style: 'top: 0px;'
                                ,content: '密码长度应为 6－20 位！'
                                ,skin: 'msg'
                                ,time: 1 //1秒后自动关闭
                              });
                        }
                        else {
                            this.newPasswdTip = false;
                            if (this.newPasswd!==this.comfirePasswd||!this.comfirePasswd) {
                                this.comfirePasswdTip = true;
                                layer.open({
                                    style: 'top: 0px;'
                                    ,content: '两次密码输入不一致！'
                                    ,skin: 'msg'
                                    ,time: 1 //1秒后自动关闭
                                  });
                            }
                            else{
                                this.comfirePasswdTip = false;
                                this.postNewpasswd();
                            }
                        }
                    }
                }
            },
            //btn显示的控制器
            checkInput(){
                this.user_passwd = getCookie('user_passwd');
                this.user_name = getCookie('user_name');
                if (this.oldPasswd&&this.newPasswd&&this.comfirePasswd) {
                    this.Btndisabled = false;
                }
                else{
                    this.Btndisabled = true;
                }
            },
            //修改密码对接
            postNewpasswd(){
                var data = {
                    'account':this.user_name,
                    'oldPwd':this.oldPasswd,
                    'newPwd':this.newPasswd
                }
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                       layer.open({
                            style: 'top: 0px;'
                            ,content: '修改密码成功！'
                            ,skin: 'msg'
                            ,time: 1.5 //1秒后自动关闭
                          });
                       setCookie('user_passwd',this.newPasswd,1000*60);
                       this.oldPasswd = '';
                       this.newPasswd = '';
                       this.comfirePasswd = '';
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
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .changepw-3LrxS {
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing:border-box;
    padding: .266667rem .266667rem 0;
}
.changepw-lCnqr {
    margin-bottom: .266667rem;
}
.changepw-3bmr- {
    display: block;
    margin-bottom: .133333rem;
    width: 100%;
    box-sizing:border-box;
    padding: .3rem .3rem;
    background: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: .026667rem;
    font-size: .7rem;
}

button, input {
    outline: none;
    border: none;
    font-size: inherit;
    font-family: inherit;
}
.changepw-1OY0R {
    color: #ea3106;
    font-size: .7rem;
    
}
.changepw-1GfOJ[disabled] {
    background-color: #ccc;
}
.changepw-1GfOJ {
    display: block;
    text-align: center;
    padding: .293333rem 0;
    margin: .4rem auto;
    color: #fff;
    border-radius: .08rem;
    font-size: .7rem;
    font-weight: 800;
    background-color: #3199e8;
    width: 95%;
}
</style>
