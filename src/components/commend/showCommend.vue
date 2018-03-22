<template>
    <div>
        {{getfoodName}}
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                foodName:""
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            getfoodName(){
                return this.$route.params.foodName;
            }
        },
        methods: {


        }

    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
 
</style>
