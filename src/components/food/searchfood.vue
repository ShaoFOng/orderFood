<template>
	<div class="shoplist_container">
		<ul>
			<router-link :to="{name:'goods', params: {'restaurantInfo':item}}" tag='li' class="shop_li" v-for="item in foods">
				<section>
					<img src="../../../static/img/restaurant1.png" class="shop_img">
				</section>
				<div class="shop_right">
					<header class="shop_detail_header">
						<h4 class="" class="shop_title ellipsis">{{item.name}}</h4>
					</header>
					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<!-- <rating-star size="36" score="3"></rating-star> -->
								<span class="rating_num">餐厅:{{item.rname}}</span>
							</section>
							<!-- <section class="order_section">
								月售453单
							</section> -->
						</section>
						<section class="rating_order_num_right">
							
							<span class="delivery_style delivery_left">评价</span>
							<span class="delivery_style delivery_right">{{item.introduction}}</span>
						</section>
					</h5>
					<h5 class="fee_distance">
						<section class="rating_section">
							<!-- <rating-star size="36" score="3"></rating-star> -->
							<span class="rating_num">原价:{{item.price}}</span>
						</section>
						<section class="fee">
							劲爆折扣价
							<span class="segmentation">:</span>
							<span style="color:red">￥{{item.discountprice}}</span> 
						</section>
						<section class="distance_time">
							<!-- <span>{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span> -->
							<span>类型
								<span class="segmentation">/</span>
							</span>
							<span class="order_time">{{item.type}}</span>
						</section>
					</h5>
				</div>
			</router-link>
		</ul>
		<div ref="abc" style="background-color: red;"></div>
	</div>
</template>

<script>

// import star from 'components/star/star'

export default {
	data(){
		return {
			
		}
	},
	mounted(){
		
	},
	components: {
	},
	props: ['foods'],
	computed: {
		
	},
	methods: {
		
		
	},
	watch: {
		
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.shoplist_container{
		background-color: #fff;
	}
	.shop_li{
		display: flex;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.7rem 0.4rem;
	}
	.shop_img{
		wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			display:flex;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				color: #333;
				padding-top: .01rem;
				font-size:0.65rem;
				line-height:0.65rem;
				font-family:"PingFangSC-Regular";
				// font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
				vertical-align: top;
			}
			.shop_detail_ul{
				display: flex;
				.supports{
					sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
			display:flex;
			justify-content:space-between;
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				display:flex;
				justify-content:flex-start;
				.rating_section{
					display: flex;
					.rating_num{
						sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
						sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				
				align-items: center;
				.delivery_style{
					font-size: 0.4rem;
					padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: $blue;
					border: 0.025rem solid $blue;
				}
				.delivery_right{
					color: $blue;
					border: 0.025rem solid $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			display:flex;
			justify-content:space-between;
			sc(0.5rem, #666);
			.fee{
				sc(0.5rem, #666);
			}
			.distance_time{
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		// font(0.6rem, 3);
		font-size:0.6rem;
		// line-height:3rem;
		text-align: center;
	    color: #999;
	}
	.empty_data{
		sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>