<template>
    <div class="mint-indicator">
	    <div class="mint-indicator-wrapper">
		    <span class="mint-indicator-spin">
		    	<div class="mint-spinner-snake" style=""></div>
		    </span> 
		    <span class="mint-indicator-text">加载中...</span>
		</div> 
		<!-- 遮罩层 -->
	    <div class="mint-indicator-mask"></div>
    </div>
</template>

<script>


</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .mint-indicator {
	    -webkit-transition: opacity .2s linear;
	    transition: opacity .2s linear;
	}
	.mint-indicator-wrapper {
	    top: 50%;
	    left: 50%;
	    position: fixed;
	    padding:1rem;
	    -webkit-transform: translate(-50%,-50%);
	    transform: translate(-50%,-50%);
	    border-radius: 0.25rem;
	    background: rgba(0,0,0,.7);
	    color: #fff;
	    box-sizing: border-box;
	    text-align: center;
	}
	.mint-indicator-spin {
	    display: inline-block;
	    text-align: center;
	}
	.mint-spinner-snake {
		
	    -webkit-animation: mint-spinner-rotate .8s infinite linear;
	    animation: mint-spinner-rotate .8s infinite linear;
	    border-radius: 50%;
	    // 控制loading条，transparent是rgba(0,0,0,0)
	    border: 0.2rem solid transparent;
	    border-top-color: rgb(204, 204, 204); 
	    border-left-color: rgb(204, 204, 204); 
	    border-bottom-color: rgb(204, 204, 204);
	    height: 1.6rem; 
	    width: 1.6rem;
	}
	.mint-indicator-text {
	    display: block;
	    color: #fff;
	    text-align: center;
	    margin-top: 0.5rem;
	    font-size: 0.8rem;
	}
	.mint-indicator-mask {
	    top: 0;
	    left: 0;
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	    background: transparent;
	}
	@keyframes mint-spinner-rotate{
		from {
			transform:rotate(0);
		}
		to{
			transform:rotate(360deg);
		}
	}
</style>
