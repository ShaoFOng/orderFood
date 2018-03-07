<template>
    <div class="el-loading-mask" v-if="show">
	    <div class="el-loading-spinner">
	    	<!-- viewBox="x, y, width, height"  // x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度 -->
		    <svg viewBox="25 25 50 50" class="circular">
		    	<!-- cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)
r 属性定义圆的半径，fill为内圈，stroke为边线，stroke-width为边宽 -->
		    	<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
		    </svg>
	    <p class="el-loading-text">拼命加载中</p>
	    </div>
    </div>
</template>

<script>
export default{
	props:['show'],
	created(){

	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

	.el-loading-mask {
    position: absolute;
    z-index: 10000;
    background-color: hsla(0,0%,100%,.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
	}
	.el-table:after {
	    top: 0;
	    right: 0;
	    width: 1px;
	    height: 100%;
	}
	.el-table:after, .el-table:before {
	    content: "";
	    position: absolute;
	    background-color: #dfe6ec;
	    z-index: 1;
	}
	.el-loading-spinner {
	    top: 50%;
	    margin-top: -1.05rem;
	    width: 100%;
	    text-align: center;
	    position: absolute;
	}
	.el-loading-spinner .circular {
	    width: 2.1rem;
	    height: 2.1rem;
	    animation: loading-rotate 2s linear infinite;
	}
	.el-loading-spinner .path {
	    animation: loading-dash 1.5s ease-in-out infinite,colors 6s ease-in-out infinite;
	    stroke-dasharray: 90,150;//strokedasharray属性用于创建虚线。绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距，两个参数或者多个参数时：一个表示长度，一个表示间距
	    stroke-dashoffset: 0;//定义线条从原虚线多少px的地方开始画
	    stroke-width: 2;
	    stroke: #20a0ff;
	    stroke-linecap: round;//strokelinecap属性定义不同类型的开放路径的终结,round为圆边终结
	}
	.el-loading-spinner .el-loading-text {
	    color: #20a0ff;
	    margin: 0.15rem 0;
	    font-size: 0.7rem;
	}
	.page-container p {
	    font-size: 0.7rem;
	    color: #5e6d82;
	    line-height: 1.5em;
	}
	@keyframes loading-rotate{
		// 0%{
		// 	transform:rotate(0deg);
		// }
		// 100%{
		// 	transform:rotate(270deg);
		// }
		100% {
		    transform: rotate(1turn);//1turn表示一圈的意思
		}
	}
	@keyframes colors{
		// 0% { stroke: #20a0ff; } 
		// 25% { stroke: #DE3E35; } 
		// 50% { stroke: #F7C223; }
		// 75% { stroke: #1B9A59; }
		// 100% { stroke: #4285F4; }
	}
	@keyframes loading-dash{
		0% {
		    stroke-dasharray: 1,200;
		    stroke-dashoffset: 0;
		}
		50% {
		    stroke-dasharray: 90,150;
		    stroke-dashoffset: -40px;
		}
		100% {
		    stroke-dasharray: 90,150;
		    stroke-dashoffset: -120px;
		}
	}
</style>
