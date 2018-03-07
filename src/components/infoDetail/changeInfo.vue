<template>
    <div>
        <head-top headTitle="账户信息" :searboxShow='false'></head-top>
        <div style="padding-top:1.95rem;">
            <section>
                <ul class="changepw-3LrxS">
                    <li class="changepw-lCnqr">
                        <input type="text" placeholder="请输入修改的东西" class="changepw-3bmr-" v-model="oldPasswd" v-on:input ="checkInput">
                        <span class="changepw-1OY0R" v-if="oldPasswdTip">请输入正确格式</span>
                    </li>
                    
                </ul>
                <button type="button" :disabled="Btndisabled" class="changepw-1GfOJ" @click="postNewpasswd">确认并保存</button>
            </section>
        </div>
        <alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    </div>
</template>

<script>
    import main_head from 'components/header/main_head';
    // import alertTip from 'components/errorTip/errorTip';
    import {getCookie} from '../../assets/js/cookie.js'
    import alertTip from 'components/errorTip/errorTip';
    export default {
        data(){
            return {
                oldPasswd:null,
                newPasswd:null,
                comfirePasswd:null,
                oldPasswdTip:false,
                oldPasswdError:false,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                Btndisabled:true,
                url:'update',//修改用户接口
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
            // console.log(this.$route.params.userInfo);
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
                
                if (this.oldPasswd) {
                    this.Btndisabled = false;
                }
                else{
                    this.Btndisabled = true;
                }
            },
            //修改密码对接
            postNewpasswd(){
                this.inputCheck();
                
                var user = this.$route.params.userInfo;//获取上一层传过来的用户信息
                var target = this.$route.params.target;//获取修改的内容
                
                for(var p in user){//遍历json对象的每个key/value对,p为key
                   if (p===target) {
                        user[p] = this.oldPasswd
                   }
                   else if(p==='birthday') {
                        user[p] = '2017/10/20';
                   }
                }
                let myurl = publicDom.base_url+this.url;
                this.$http.post(myurl,user,{emulateJSON:true}).then((res) =>{
                    let list = res.data;
                    if (list.code == 200) {
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
