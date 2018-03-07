<template>
    <div>
        <headTop headTitle="首页" :searboxShow='true'></headTop>
        <nav class="msite_nav">
          <category></category>
            <!--<div class="swiper-container">-->
                <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide food_types_container">-->
                        <!--<img src="../../../static/img/activity.png" style="width:100%;height:100%"/>-->
                    <!--</div>-->
                    <!--<div class="swiper-slide food_types_container">-->
                        <!--<img src="../../../static/img/activity.png" style="width:100%;height:100%"/>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="swiper-pagination"></div>-->
            <!--</div>-->
        </nav>
        <!-- <section class="sort_container">
            <div class="sort_item" :class="{choose_type:sortBy == 'food'}" >
                <div class="sort_item_container" @click="chooseType('food')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'food'}">分类</span>
                        <i class="fa fa-fw fa-angle-down sort_icon" :class="{category_title: sortBy == 'food'}" style="width=10px;height=10px"></i>
                    </div>
                </div>
                <transition name="showlist" v-show="category">
                    <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li id="index1" class="category_left_li" @click='changeActive()' :class="{category_active:currentTargets == 'index1'}">
                                    <section>
                                        <i class="fa fa-fw fa-cutlery category_icon"></i>
                                        <span>特色食堂</span>
                                    </section>
                                    <section>
                                        <span class="category_count">2324</span>
                                        <i class="fa fa-fw fa-angle-right category_arrow"></i>
                                    </section>
                                </li>
                                <li id="index2" class="category_left_li" @click='changeActive()' :class="{category_active:currentTargets == 'index2'}">
                                    <section>
                                        <i class="fa fa-fw fa-cutlery category_icon"></i>
                                        <span>特色食堂</span>
                                    </section>
                                    <section>
                                        <span class="category_count">2324</span>
                                        <i class="fa fa-fw fa-angle-right category_arrow"></i>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li category_right_choosed">
                                    <span>日韩料理</span>
                                    <span>920</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'sort'}">排序</span>
                        <i class="fa fa-fw fa-angle-down sort_icon" :class="{category_title: sortBy == 'sort'}" style="width=10px;height=10px"></i>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'sort'" class="sort_detail_type">
                        <ul class="sort_list_container" @click="sortList($event)">
                            <li class="sort_list_li">
                                <p data="0" :class="{sort_select: sortByType == 0}">
                                    <i class="fa fa-fw fa-sort"></i>
                                    <span>智能排序</span>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <p data="5" :class="{sort_select: sortByType == 5}">
                                    <i class="fa fa-fw fa-location-arrow"></i>
                                    <span>距离最近</span>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <p data="6" :class="{sort_select: sortByType == 6}">
                                    <i class="fa fa-fw fa-fire"></i>
                                    <span>销量最高</span>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <p data="1" :class="{sort_select: sortByType == 1}">
                                    <i class="fa fa-fw fa-cny"></i>
                                    <span>起送价最低</span>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <p data="2" :class="{sort_select: sortByType == 2}">
                                    <i class="fa fa-fw fa-clock-o"></i>
                                    <span>配送速度最快</span>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <p data="3" :class="{sort_select: sortByType == 3}">
                                    <i class="fa fa-fw fa-star-o"></i>
                                    <span>评分最高</span>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
                <div class="sort_item_container" @click="chooseType('activity')">
                    <span :class="{category_title: sortBy == 'activity'}">筛选</span>
                    <i class="fa fa-fw fa-angle-down sort_icon" :class="{category_title: sortBy == 'activity'}" style="width=10px;height=10px"></i>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
                        <section style="width: 100%;">
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li class="filter_li">
                                    <span class="filter_icon" style=""><i class="fa fa-fw fa-thumbs-o-up"></i></span>
                                    <span class="selected_filter">蜂鸟专送</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">餐厅属性（可以多选）</header>
                            <ul class="filter_ul" style="paddingBottom: .5rem;">
                                <li class="filter_li">
                                    <span class="filter_icon" style=""><i class="fa fa-fw fa-money"></i></span>
                                    <span class="selected_filter">在线支付</span>
                                </li>
                            </ul>
                        </section>
                        <footer class="confirm_filter">
                            <div class="clear_all filter_button_style" @click="clearAll">清空</div>
                            <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">({{filterNum}})</span></div>
                        </footer>
                    </section>
                </transition>
            </div>
        </section> -->
        <!-- 背景遮罩层 -->
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>
        <!-- 餐厅展示开始 -->
        <section class="shop_list_container">
            <restaurantlist></restaurantlist>
        </section>
        <!-- /餐厅展示结束 -->
        <!-- /sort_container -->
        <footer-box index="0"></footer-box>
        <alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alertTip>
    </div>
</template>

<script>
    import footer from 'components/footer/footer';
    import headTop from 'components/header/main_head';
    import '../../../static/js/swiper.min.js';
    import alertTip from 'components/errorTip/errorTip';
    import restaurantlist from 'components/Restaurant/restaurant';
    import category from 'components/category/category';

    export default {
    	data () {
            return {
                geohash: '', // city页面传递过来的地址geohash
                headTitle: '', // msiet页面头部标题
                foodTitle: '', // 排序左侧头部标题
                restaurant_category_id: '', // 食品类型id值
                restaurant_category_ids: '', // 筛选类型的id
                sortBy: '', // 筛选的条件
                category: null, // category分类左侧数据
                categoryDetail: null, // category分类右侧的详细数据
                sortByType: null, // 根据何种方式排序
                Delivery: null, // 配送方式数据
                Activity: null, // 商家支持活动数据
                delivery_mode: null, // 选中的配送方式
                support_ids: [], // 选中的商铺活动列表
                filterNum: 0, // 所选中的所有样式的集合
                confirmStatus: false, // 确认选择
                currentTargets:null,// 左侧分类栏判断点击对象
                searboxShow: false,
                showAlert: false, // 显示提示组件
                alertText: null // 提示的内容
            }
        },
        created () {

        },
        mounted () {
            // //初始化swiper
            // new Swiper('.swiper-container', {
            //     pagination: '.swiper-pagination',
            //     loop: true,
            //     autoplay: 5000,//可选选项，自动滑动
            // });
        },
        computed: {

        },
        props: [''],
        methods: {
        	gotoAddress (path) {
                this.$router.push(path)
            },
            async changeActive(){
                var type = $(event.currentTarget).attr("id");
                if (this.currentTargets !== type) {
                    this.currentTargets = type;
                }
            },
            // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
            async chooseType(type){
                if (this.sortBy !== type) {
                    this.sortBy = type;
                    //food选项中头部标题发生改变，需要特殊处理
                    if (type == 'food') {
                        this.foodTitle = '分类';
                    }else{
                        //将foodTitle 和 headTitle 进行同步
                        this.foodTitle = this.headTitle;
                    }
                }else{
                    //再次点击相同选项时收回列表
                    this.sortBy = '';
                    if (type == 'food') {
                        //将foodTitle 和 headTitle 进行同步
                        this.foodTitle = this.headTitle;
                    }
                }
            },
            //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
            selectCategoryName(id, index){
                //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
                if (index === 0) {
                    this.restaurant_category_ids = null;
                    this.sortBy = '';
                //不是第一个选项时，右侧展示其子级sub_categories的列表
                }else{
                    this.restaurant_category_id = id;
                    this.categoryDetail = this.category[index].sub_categories;

                }
            },
            //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
            getCategoryIds(id, name){
                this.restaurant_category_ids = id;
                this.sortBy = '';
                this.foodTitle = this.headTitle = name;

            },
            //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
            sortList(event){
                this.sortByType = event.target.getAttribute('data');
                this.sortBy = '';
            },
            //筛选选项中的配送方式选择
            selectDeliveryMode(id){
                //delivery_mode为空时，选中当前项，并且filterNum加一
                if (this.delivery_mode == null) {
                    this.filterNum++;
                    this.delivery_mode = id;
                //delivery_mode为当前已有值时，清空所选项，并且filterNum减一
                }else if(this.delivery_mode == id){
                    this.filterNum--;
                    this.delivery_mode = null;
                //delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
                }else{
                    this.delivery_mode = id;
                }
            },
            //点击商家活动，状态取反
            selectSupportIds(index,id){
                //数组替换新的值
                this.support_ids.splice(index, 1, {status: !this.support_ids[index].status, id: id});
                //重新计算filterNum的个数
                this.filterNum = this.delivery_mode == null? 0 : 1;
                this.support_ids.forEach(item => {
                    if (item.status) {
                        this.filterNum ++ ;
                    }
                })
            },
            //点击取消或者确认时，需要清空当前已选的状态值
            clearAll(){
                this.delivery_mode = null;
                this.support_ids.map(item => item.status = false);
                this.filterNum = 0;
            },
            //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
            confirmSelectFun(){
                //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
                this.confirmStatus = !this.confirmStatus;
                this.sortBy = '';
            },
            closeTip(){
                this.showAlert = false;
            }
        },
        watch: {

        },
        components: {
            'footer-box': footer,
            'headTop': headTop,
            'restaurantlist': restaurantlist,
            'alertTip': alertTip,
            'category': category
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    @import "../../../static/css/swiper.min.css";
    .msite_nav{
        padding-top: 3.76rem;
        background-color: #fff;
        border-bottom: 0.025rem solid $bc;
        .swiper-container{
            wh(100%, 5.72rem);
            // padding-bottom: 0.6rem;
            .swiper-pagination{
                bottom: 0.2rem;
            }
        }
    }
    .food_types_container{
        display:flex;
        flex-wrap: wrap;
        .link_to_food{
            width: 25%;
            padding: 0.3rem 0rem;
            fj(center);
            figure{
                img{
                    margin-bottom: 0.3rem;
                    wh(1.8rem, 1.8rem);
                }
                figcaption{
                    text-align: center;
                    sc(0.55rem, #666);
                }
            }
        }
    }

   .sort_container{
        background-color: #fff;
        border-bottom: 0.025rem solid #f1f1f1;
        position: fixed;
        top: 9.48rem;
        right: 0;
        margin-top: 0.26rem;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
        .sort_item{
            sc(0.55rem, #444);
            wh(33.3%, 1.6rem);
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                wh(100%, 100%);
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                padding-top: .3rem;
                .sort_item_border{
                    height: 1rem;
                    border-right: 0.025rem solid $bc;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all .3s;
                fill:#666;
            }

        }
        .choose_type{
            .sort_item_container{

                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill:$blue;
                }
            }
        }
        .showlist-enter-active, .showlist-leave-active {
            transition: all .3s;
            transform: translateY(0);
        }
        .showlist-enter, .showlist-leave-active {
            opacity: 0;
            transform: translateY(0);
        }
        .sort_detail_type{
            width: 100%;
            position: absolute;
            display:flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
        }
        .category_container{
            .category_left{
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span{
                    sc(0.5rem, #666);
                    line-height: 1.8rem;
                }
                .category_left_li{
                    display:flex;
                    padding:0 0.5rem;
                    .category_icon{
                        wh(.8rem, .8rem);
                        vertical-align: middle;
                        margin-right: .2rem;
                    }
                    .category_count{
                        background-color: #ccc;
                        sc(.4rem, #fff);
                        padding: 0 .1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                background-color: #fff;
                padding-left: 0.5rem;
                height: 16rem;
                overflow-y: auto;
                .category_right_li{
                    display:flex;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span{
                        color: #666;
                    }
                }
                .category_right_choosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg{
                    wh(0.7rem, 0.7rem);
                    margin:0 .3rem 0 .8rem;
                }
                p{
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    display:flex;
                    align-items: center;
                    span{
                        color: #666;
                    }
                }
                .sort_select{
                    span{
                        color: $blue;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                sc(0.4rem, #333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: .5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    wh(4.7rem, 1.4rem);
                    margin-right: 0.25rem;
                    border-radius: 0.125rem;
                    padding: 0 0.25rem;
                    margin-bottom: 0.25rem;
                    svg{
                        wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        sc(0.4rem, #333);
                    }
                    .filter_icon{
                        wh(.8rem, .8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: 0.25rem;
                        line-height: .8rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: .25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                box-sizing:border-box;
                padding: .3rem .2rem;
                .filter_button_style{
                    wh(50%, 1.8rem);
                    font-size: 0.8rem;
                    line-height: 1.8rem;
                    border-radius: 0.2rem;
                }
                .clear_all{
                    background-color: #fff;
                    margin-right: .5rem;
                    border: 0.025rem solid #fff;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }
    .showcover-enter-active, .showcover-leave-active {
        transition: opacity .3s
    }
    .showcover-enter, .showcover-leave-active {
        opacity: 0
    }
    // .back_cover{
    //     position: fixed;
    //     wh(100%, 100%);
    //     z-index: 10;
    //     background-color: rgba(0,0,0,0.3);
    // }
    .shop_list_container{
        display:flex;
        position:absolute;
        top:10.8rem;
        // margin-top:0.26rem;
        bottom:2rem;
        width:100%;
        overflow:hidden;
    }
</style>
