<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress('/home')" class="guide_item">
            <i class="fa fa-fw fa-home icon_style" :class='{active:index==0}'></i>
            <span>首页</span>
        </section>
        <!-- <section @click = "gotoAddress('/search/')" class="guide_item"> 
            <i class="fa fa-fw fa-search icon_style" :class="{active:index==1}"></i>
            <span>搜索</span>
        </section> -->
        <section @click = "gotoAddress('/order')" class="guide_item">
            <i class="fa fa-fw fa-calendar-o icon_style" :class="{active:index==2}"></i>
            <span>订单</span>
        </section>
        <!--<section @click = "gotoAddress('/shoppingCart')" class="guide_item">
            <i class="fa fa-fw fa-shopping-cart icon_style" :class="{active:index==3}"></i>
            <span>购物车</span>
        </section>-->
        <section @click = "gotoAddress('/center')" class="guide_item">
            <i class="fa fa-fw fa-male icon_style" :class="{active:index==4}"></i>
            <span>我的</span>
        </section>
    </section>
</template>

<script>
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            
        },
        props: ['index'],
        methods: {
        	gotoAddress(path){
                this.$router.push(path);
                
            }
        },

    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			wh(.8rem, .8rem);
			margin-bottom: .2rem;
			margin-top: .3rem;
			color: #666;
		}
        .active{
            color:#5bc0de;
        }      
		span{
			sc(.45rem, #666);
		}
    }
   
</style>
