<template>
    <div class="head_container">
        <div id='head_top'>
            <section class="head_goback"></section>
            <section class="title_head ellipsis">
                <span class="title_text">{{headTitle}}</span>
            </section>
            <section class="user_img">
                <img src="../../../static/img/user.png">
            </section>
        </div>
        <a v-if="searboxShow" href="#/search"><input type="text" value="大家都在搜" aria-label="搜索商家、商品" class="searchbox"></a>
    </div>
</template>

<script>

  export default {
    data(){
        return{

        }
    },
    props: ['headTitle','searboxShow'],
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .head_container{
    background-color: $blue;
    width:100%;
    // height: 3.67rem;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }
  #head_top{
        background-color: $blue;
        position: absolute;
        left: 0;
        top: 0;
        wh(100%, 1.95rem);
    }
    .head_goback{
        left: 0.4rem;
        wh(0.6rem, 0.8rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .fa-angle-left{
        color:#fff;
    }
    .head_login{
        right: 0.55rem;
        sc(0.65rem, #fff);
        ct();
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            wh(.8rem, .8rem);
        }
    }
    .title_head{
        center();
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
    .head_container a{
        display:block;
        background-color:$blue
        padding: 0 .373333rem;
        margin-top: 2.05rem;
        margin-bottom: .25rem;
    }
    .searchbox{
        display: block;
        width: 100%;
        height: 1.46rem;
        text-align: center;
        border-radius: .96rem;
        box-shadow: 0 0.026667rem 0.066667rem 0 rgba(0,0,0,.2);
        color: #666;
        font-size: .546rem;
    }
    .user_img{

        img{
            position:absolute;
            right: 0.5rem;
            top: 0.5rem;
            width:1rem;
            height:1rem;
        }
    }
</style>
