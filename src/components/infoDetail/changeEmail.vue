<template>
    <div>
        <head-top headTitle="账户信息" :searboxShow='false'></head-top>
        <div style="padding-top:1.95rem;">
            <section>
                <ul class="changepw-3LrxS">
                    <li class="changepw-lCnqr">
                        <input type="text" placeholder="请输入修改的新邮箱" class="changepw-3bmr-" v-model="email" v-on:input ="checkInput">
                    </li>
                    
                </ul>
                <button type="button" :disabled="Btndisabled" class="changepw-1GfOJ" @click="postEmail">确认并保存</button>
            </section>
        </div>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import {getCookie,setCookie} from '../../assets/js/cookie.js'
    import alertTip from 'components/errorTip/errorTip';
    export default {
        data(){
            return {
                email:null,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                Btndisabled:true,
                url:'updateEmail',//修改昵称接口
                user_name:'',
                user_passwd:'',
                userInfo:{},//保存的用户信息
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
        created(){
            console.log(this.$route.params.userInfo);
        },
        methods: {
            //获取用户密码
            passwdChange(){
                
            },
            //用户输入验证控制器
            inputCheck(){
                
            },
            //btn显示的控制器
            checkInput(){
                if (this.email) {
                    this.Btndisabled = false;
                }
                else{
                    this.Btndisabled = true;
                }
            },
            postEmail(){
                if(this.email.length>30){
                    layer.open({
                        style: 'top: 0px;'
                        ,content: '邮箱格式不规范'
                        ,skin: 'msg'
                        ,time: 1 //1秒后自动关闭
                      });
                }
                else{
                    this.changeEmail();
                }
            },
            //修改电话接口
            changeEmail(){
                var email = this.$route.params.userInfo;
                this.user_name = getCookie('user_name');
                var data = {
                    'account':this.user_name,
                    'email':this.email
                };
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,data,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
                        layer.open({
                            style: 'top: 0px;'
                            ,content: list.msg
                            ,skin: 'msg'
                            ,time: 1 //1秒后自动关闭
                          });
                        setCookie('email',this.email,1000*60);
                        this.email = '';
                        this.Btndisabled = true;
                    }
                    else {
                        layer.open({
                            style: 'top: 0px;'
                            ,content: '未知错误!'
                            ,skin: 'msg'
                            ,time: 1 //1秒后自动关闭
                          });
                        this.email = '';
                        this.Btndisabled = true;
                    }
                })
            },
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
