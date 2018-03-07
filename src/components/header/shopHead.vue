<template>
  <div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品列表</router-link>
      </div>
      <!-- <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
  const ERR_OK = 0;

  export default {
    data() {
      return {
        
      };
    },
    created() {
      
    },
    components: {
      
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      padding-left:1rem;
      flex: 1
      text-align: left
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          // color: rgb(240, 20, 20)
</style>
