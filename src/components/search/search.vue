<template>
  <div style="background-color:#fff">
    <form class="searchHeader">
      <i class="fa fa-fw fa-angle-left arrowLeft" @click="$router.go(-1)"></i>
      <div class="s-input-tab">
        <div class="s-input-tab-txt" @click='toggleUl'>{{searchWay}}<i class="fa fa-fw fa-caret-down"></i></div>
        <div class="s-form-search search-form">
            <input type="text" @click='inputClick' autofocus placeholder="请输入商品/菜品名称" class="headerInput"v-model="inputContent" >
            <div class="search" @click='myclick'><i class="fa fa-fw fa-search" style="font-size:0.9rem"></i></div>
          </button>
        </div>
        <div class="s-input-tab-nav on" id="J_TabNav">
          <ul v-if="show">
            <li class="all" @click="getSearchWay"><i class="fa fa-fw fa-cutlery icon"></i>餐厅</li>
            <li class="shop" @click="getSearchWay"><i class="fa fa-fw fa-bullseye icon"></i>菜名</li>
            <li class="mall" @click="getSearchWay"><i class="fa fa-fw fa-bullseye icon"></i>菜类</li>
          </ul>
        </div>
      </div>
      <!-- <input type="search" autofocus placeholder="请输入商品名称" class="headerInput"> -->
    </form>
    <section>
      <header class="history-KdKLE_1">
        <span>历史搜索</span>
        <i class="history-3O8OW_1">
          <i class="fa fa-fw fa-trash-o"></i>
        </i>
      </header>
      <section class="history-3kzV5_1">
        <span class="history-1YKH4_1">化州糖水</span>
      </section>
    </section>
    <section class="history-2IxHX_1">
      <header class="history-KdKLE_1">热门搜索</header>
      <section class="history-3kzV5_1">
        <span class="history-1YKH4_1">
          芋圆
        </span><span class="history-1YKH4_1">
          炒河粉
        </span><span class="history-1YKH4_1">
          筒骨粉
        </span><span class="history-1YKH4_1">
          羊肉
        </span><span class="history-1YKH4_1">
          我的菜
        </span><span class="history-1YKH4_1">
          汤粉
        </span><span class="history-1YKH4_1">
          小龙虾
        </span><span class="history-1YKH4_1">
          荔枝
        </span><span class="history-1YKH4_1">
          麻辣烫
        </span><span class="history-1YKH4_1">
          化州糖水
        </span><!---->
      </section>
    </section>
    <!-- 餐厅展示开始 -->
    <section class="shop_list_container">
        <restaurantlist v-if="restaurantShow" :allRestaurantInfo="this.restaurant"></restaurantlist>
        <food v-if="foodshow" :foods="this.selectedFood"></food>
    </section>
    <!-- /餐厅展示结束 -->
    <errorTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></errorTip>
  </div>
</template>

<script >
  import restaurantlist from 'components/Restaurant/restaurant';
  import errorTip from 'components/errorTip/errorTip';
  import searchfood from 'components/food/searchfood';
  export default {
    props: {
      
    },
    data() {
      return {
        show:false,//控制查询方式
        searchWay:'餐厅',//查询方式
        inputContent:"",
        foodshow:false,
        restaurantShow:false,//控制餐厅信息显示
        restaurant:{},//保存餐厅信息
        error:false,//查询不到的提示
        errorTips:'',
        cache:{},
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        selectedFood:{},
        typeFood:{},
      };
    },
    mounted(){
      this.setfocus();
      // this.myclick();
    },
    methods: {
        //搜索餐厅
        myclick:function(){
          var data = '';
          var url = '';
          console.log(this.searchWay);
          if(this.searchWay=='餐厅'){
            data = {
              'name':this.inputContent
            };
            this.restaurantShow = true;
            url = publicDom.main_url+'queryRestaurantByName';
            
          }
          else if(this.searchWay=='菜名'){
            data = {
              "dname":this.inputContent
            };
            this.foodshow = true;
            url = publicDom.linghong+'getdishes';
          }
          else if(this.searchWay=='菜类'){
            data = {
              "dtype":this.inputContent
            };
            this.foodshow = true;
            url = publicDom.linghong+'getdishesbytype';
          }
          console.log(url,data);
          this.$http.post(url,data,{emulateJSON:true}).then((res) =>{
              let list = res.data;
              if (list.code == 200) {
                  this.cache = list.list;
                  if (this.searchWay=='餐厅') {
                    this.restaurant = list.list;
                    this.restaurantShow = true;
                    this.foodshow = false;
                  }
                  else{
                    this.selectedFood = list.list;
                    this.restaurantShow = false;
                    this.foodshow = true;
                  }
              }
              else {
                  this.showAlert = true;
                  this.alertText = list.msg;
                  this.foodshow = false;
                  this.restaurantShow = false;
                  // this.showAlert = true;
                  // this.alertText = list.msg;
              }
          });
          // if(this.searchWay=='餐厅'){
          //   this.restaurant = this.cache;
          // }
          // else if(this.searchWay=='菜名'){
          //   this.selectedFood = this.cache;
          // }
          // else if(this.searchWay=='菜类'){
          //   this.typeFood = this.cache;
          // }
          console.log(this.selectedFood);

        },
        //控制焦点在input标签
        setfocus:function(){
          $(".headerInput").focus();
        },
        toggleUl:function(){
          this.show = !this.show;
        },
        getSearchWay:function(event){
          var target = event.currentTarget;
          this.searchWay = $(target).text();
        },
        inputClick:function(){
          this.show = false;
        },
        closeTip(){
            this.showAlert = false;
        },
    },
    created() {
      //跳转到这个页面后自动执行
      this.setfocus();
    },
    watch: {
      '$route':"setfocus"
    },
    components: {
      'restaurantlist':restaurantlist,
      'errorTip':errorTip,
      'food':searchfood,
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .searchHeader {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: .5rem;
    position: relative;
    z-index: 101;
  }
  .searchHeader, html {
    background-color: #fff;
  }
  .arrowLeft {
    width: .933333rem;
    height: .933333rem;
    font-size: 1.2rem;
    fill: #999;
    color:#999;
    padding: .133333rem .133333rem .133333rem 0;
}
.headerInput {
    // -webkit-box-flex: 1;
    // -webkit-flex-grow: 1;
    // -ms-flex-positive: 1;
    // flex-grow: 1;
    // border-radius: .7rem;
    // background-color: #f8f8f8;
    // padding: .173333rem .7rem;
    // font-size: .9rem;
    display:inline-block;
    color: #666;
    border: none;
    background: none;
    width: 7.9rem;
    height: 100%;
    font-size: .7rem;
}

.history-3O8OW_1 {
    display: block;
    padding-top: .053333rem;
}
.history-3kzV5_1 {
    padding: 0 .333333rem .333333rem;
}
.history-1YKH4_1 {
    display: inline-block;
    border-radius: .066667rem;
    padding: .2rem .266667rem;
    font-size: .6rem;
    margin-right: .333333rem;
    margin-top: .333333rem;
    color: #666;
    background-color: #f7f7f7;
}
.history-2IxHX_1 {
    margin-top: .4rem;
}

.history-KdKLE_1 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: .6rem;
    padding: .2rem .333333rem;
    color: #666;
    font-weight: 700;
}
.history-3kzV5_1 {
    padding: 0 .333333rem .333333rem;
}


.s-input-tab .s-input-tab-nav {
    position: absolute;
    left: 0;
    top: 1.5rem;
    z-index: 101;
    padding: 0.5rem;
}


.s-input-tab {
    display: inline-block;
    position: relative;
    background-color:#f8f8f8;
    margin-left:0.85714rem;
    border-radius:0.2rem;
}
.s-input-tab .s-input-tab-txt {
    display:inline-block;
    width: 2.8rem;
    // height: 1.5rem;
    line-height: 1.5rem;
    text-indent: 0.5rem;
    color: #999;
    font-size: .7rem;
}
.s-input-tab .s-input-tab-txt:after {
    content: '';
    position: absolute;
    width: 0.3rem;
    height: 0.15rem;
    top: 0.65rem;
    right: 0.4rem;
}
.s-form-search {
    display:inline-block;
    height:100%;
    font-size:0px;
}
.s-input-tab .s-input-tab-nav ul {
    display:block;
    background: #484d50;
    border-radius: 0.3rem;
    width: 6rem;
    overflow: hidden;
    color: #c7c8c9;
    font-size:0.7rem;
}
.search{
  display:inline-block;
  height:100%;
}
.s-input-tab .s-input-tab-nav li {
    border-top: 1px solid #707476;
    margin-top: -0.05rem;
    height: 1.75rem;
    line-height: 1.75rem;
}
li .icon {
    display: inline-block;
    margin: auto .4rem .4rem .4rem;
    // position: relative;
}
.icons-baobei {
    background-position: -0.15rem -8.2rem;
    width: 1rem;
    height: 1.1rem;
}
.s-input-tab .s-input-tab-nav ul:after {
    position: absolute;
    left: 1rem;
    top: 0.25rem;
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: #484d50;
    -webkit-transform: rotate(45deg);
}
</style>