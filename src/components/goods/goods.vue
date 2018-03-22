<template>
  <div>
    <v-header :seller="this.restaurantDetail"></v-header>
    <!-- <shopHead></shopHead> -->
    <div class="goods">
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list" ref="foodList">
            <h1 class="title">菜品列表</h1>
            <ul>
              <li v-for="food in this.dishesInfo" class="food-item border-1px" @click.stop.prevent="toCommend(food.name,$event)"> 
                <div class="icon">
                  <img width="57" height="57" src="../../../static/img/restaurant1.png" class="shop_img">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.introduction}}</p>
                  <div class="extra">
                    <span class="count">月售n份</span><span>好评率如潮</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div> 
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="4"
                :minPrice="20"></shopcart>
    </div>
    <errorTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></errorTip>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
  // import shopHead from 'components/header/shopHead';
  import header from 'components/header/header';
  import errorTip from 'components/errorTip/errorTip'

  export default {
    props: {
      
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        restaurantDetail: {},
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        dishesInfo:[],//保存菜品
        foods:[],
      };
    },
    created() {
        this.getUrlInfo();
    },
    computed: {
      selectFoods() {
        //todo 把食品封装在数组foods中传入购物车组件
        let foods = [];
        //vue中遍历数组为array.forEach((item,index) => {});
        this.dishesInfo.forEach((food) => {
            if (food.count) {//list.count是js语法中统计数组元素个数的函数
              foods.push(food);
            }
        });
        return foods;
      },
    },
    methods: {
      closeTip(){
          this.showAlert = false;
      }, 
      //pay
      pay(event){
        let myurl = publicDom.base_url+'updateshoppingcar';
        console.log($(event.currentTarget).attr('price'));
        var price = $(event.currentTarget).attr('price');
        var num = $('.cart-count').text();
        var a = price*1;
        this.showAlert = true;
        this.alertText = '已下单';
      },
      //获取菜品信息
      getDishesInfo(){
        let myurl = publicDom.base_url+'queryDishesByType';
        this.$http.post(myurl,{"type":this.restaurantDetail.typename},{emulateJSON:true}).then((res)=>{
            let list = res.data;
            console.log(list);
          if(list.code == 200){
              this.dishesInfo = list.object;
              //等到Dom更新完毕才执行bs插件
              this.$nextTick(() => {
                this._initScroll();
              });
              this.dishesInfo.forEach((item) => {
                // Todo...
                this.$set(item, 'count', 0);
              })
              // this.$set(this.dishesInfo, 'count', 0);
              console.log(this.dishesInfo)
          }else{
              this.dishesInfo = [];
              this.showAlert = true;
              this.alertText = list.msg;
          }
        });
      },
      //获取上一级跳转过来的信息，并且保存在本地
      getUrlInfo(){
          this.restaurantDetail = this.$route.params.restaurantInfo;//获取上一层传过来的用户信息
          this.getDishesInfo();
      },
      // 子组件$emit派发而来的事件
      addFood(target) {
        //target为子组件中传过来的数据
        // 在子组件改变 item.foods对象的值，相应的父组件内的 item的值会随之改变（js复杂数据类型地址引用）
        this._drop(target);//传递 target
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          //调用 shopcar 组件中的 drop 方法，向 shopcar组件 传入当前点击的 dom 对象
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll(){
        this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
          click:true,
          //探针作用，实时监测滚动位置
          probeType:3
        });
      },
      toCommend(foodName,event){
        if (event._constructed) {
          return;
        }
        this.$router.push({"name":"showCommend","params":{"foodName":foodName}});
      }
    },
    watch:{
        //路由发生变化重新执行函数
        "$route" (to, from) {
          if (from.name === 'home' && to.name === 'goods') {
            this.getUrlInfo();
          }
        } 
    },
    components: {
      shopcart,
      cartcontrol,
      food,
      // "shopHead":shopHead,
      'v-header': header,
      'errorTip':errorTip
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display: flex
    position: absolute
    top: 160px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      background-color: #fff
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            display:inline-block;
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            display: inline-block
            right: 0
           bottom: 12px
</style>