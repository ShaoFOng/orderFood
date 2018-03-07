<template>
    <div>
        <ul class="category-wrapper">
            <li class="cy">
              <i></i>
              <span>餐饮</span>
            </li>
            <li class="zc">
              <i></i>
              <span>早餐</span>
            </li>
            <li class="xwc">
                <i></i>
                <span>下午茶</span>
            </li>
            <li class="yx">
              <i></i>
              <span>夜宵</span>
            </li>
            <li class="sc">
              <i></i>
              <span>送餐</span>
            </li>
            <li class="xycs">
              <i></i>
              <span>校园超市</span>
            </li>
            <li class="sgsx">
              <i></i>
              <span>水果生鲜</span>
            </li>
            <li class="sysm">
              <i></i>
              <span>送药上门</span>
            </li>
            <li class="ppg">
              <i></i>
              <span>品牌馆</span>
            </li>
            <li class="xp">
              <i></i>
              <span>新品</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
    	data () {
        return {
        };
      },
      created () {
      },
      mounted () {
      },
      computed: {}
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cy{
        i{
            background-image: url(../../../static/img/cy.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .zc{
        i{
            background-image: url(../../../static/img/zc.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .xwc{
        i{
            background-image: url(../../../static/img/xwc.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .yx{
        i{
            background-image: url(../../../static/img/yx.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .sc{
        i{
            background-image: url(../../../static/img/sc.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .xycs{
        i{
            background-image: url(../../../static/img/xycs.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .sgsx{
        i{
            background-image: url(../../../static/img/sgsx.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    .sysm{
        i{
            background-image: url(../../../static/img/sysm.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
     .ppg{
        i{
            background-image: url(../../../static/img/ppg.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
     .xp{
        i{
            background-image: url(../../../static/img/xp.png);
            background-repeat: no-repeat;
            background-size: 1.8rem;
        }
    }
    ul, li{
      list-style: none;
    }
    .category-wrapper li{
      width: 20%;
      text-align: center;
      height: 80px;
      font-size: 11px;
      line-height: 15px;
      float: left;
    }
    .category-wrapper li i{
        width: 1.8rem;
        height: 1.8rem;
        display: inline-block;
        margin-top: 0.4rem;
    }
    .category-wrapper li span {
      display: block;
      margin-top: 0.18rem;
}
</style>
