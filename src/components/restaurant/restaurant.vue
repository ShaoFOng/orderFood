<template>
	<div class="shoplist_container" ref='shoplistContainer'>
		<loading :show='this.loadingShow'></loading>
		<ul>
			<li v-for="item in this.restaurant" @click="toGoods(item,$event)" class="shop_li border-1px">
				<section>
					<img src="../../../static/img/shop.jpeg" class="shop_img">
				</section>
				<div class="shop_right">
					<header class="shop_detail_header">
						<h4 class="" class="shop_title ellipsis">{{item.typename}}</h4>
					</header>
					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<!-- <rating-star size="36" score="3"></rating-star> -->
								<span class="rating_num">3分</span>
							</section>
							<section class="order_section">
								月售453单
							</section>
						</section>
						<section class="rating_order_num_right">
							<span class="delivery_style delivery_left">蜂鸟专送</span>
							<span class="delivery_style delivery_right">准时达</span>
						</section>
					</h5>
					<h5 class="fee_distance">
						<section class="fee">
							{{item.activity}} 
							<!-- <span class="segmentation">/</span>
							免配送费 -->
						</section>
						<section class="distance_time">
							<!-- <span>{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span> -->
							<span>{{item.city}}
								<span class="segmentation">/</span>
							</span>
							<span class="order_time">0分钟</span>
						</section>
					</h5>
				</div>
			</li>
		</ul>
		<!-- <p v-else class="empty_data">没有更多了</p> -->
		<!-- <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside> -->
		<footer class="loader_more" v-show="preventRepeatReuqest">正在加载更多商家...</footer>
		<div ref="abc" style="background-color: red;"></div>
	</div>
</template>

<script>

// import star from 'components/star/star'
  import BScroll from 'better-scroll';
  import loading from 'components/loading/loading_svg';

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			restaurant:{},//存储餐厅信息
			allRestuarantUrl:'queryType',//查询所有餐厅
			loadingShow:true,

		}
	},
	created(){
		this.getAllRestuarant();
	},
	mounted(){
		this.initData();
	},
	components: {
		// 'rating-star':star,
		'loading': loading
	},
	props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash','allRestaurantInfo'],
	computed: {

	},
	methods: {
		toGoods(item,event){
	        if (event._constructed) {
	          return;
	        }
	        this.$router.push({"name":"goods","params":{'restaurantInfo':item}});
		},
		async initData(){
			
		},
		//获取所有餐厅
        getAllRestuarant(){
        	this.loadingShow = true;
            let detail = publicDom.base_url+this.allRestuarantUrl;
            this.$http.post(detail,"",{emulateJSON:true}).then((res) =>{
                let list = res.data;
                console.log(list);
                this.loadingShow = false;
                if (list.code == 200) {
                    this.restaurant = list.object;
                    this.$nextTick(() => {
                    	this._scroll();
                    })
                }
                else {
                    // this.showAlert = true;
                    // this.alertText = list.msg;
                }
            })

        },
		//到达底部加载更多数据
		async loaderMore(){
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return 
			}
			this.showLoading = true;
			this.preventRepeatReuqest = true;

			//数据的定位加20位
			this.offset += 20;
			let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			this.hideLoading();
			this.shopListArr = [...this.shopListArr, ...res];
			//当获取数据小于20，说明没有更多数据，不需要再次请求数据
			if (res.length < 20) {
				return
			}
			this.preventRepeatReuqest = false;
		},
		//返回顶部
		backTop(){
			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
		},
		//监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
		async listenPropChange(){
			this.showLoading = true;
			this.offset = 0;
			let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
			this.hideLoading();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
			this.shopListArr = [...res];
			if (process.env.NODE_ENV !== 'development') {
				this.shopListArr = this.shopListArr.reverse();
			}
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			if (process.env.NODE_ENV !== 'development') {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.showLoading = false;
				}, 500)
			}else{
				this.showLoading = false;
			}
		},
		_scroll(){
			this.scroll = new BScroll(this.$refs.shoplistContainer,{
				click:true,
				probeType:3
			})
		}
	},
	watch: {
		//路由发生变化重新执行函数
        //'$route': 'getAllRestuarant',
		//监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
		restaurantCategoryIds: function (value){
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByType: function (value){
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value){
			this.listenPropChange();
			this.$emit('DidConfrim');
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.shoplist_container{
		background-color: #fff;
		flex:1;
		// width:100%;
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