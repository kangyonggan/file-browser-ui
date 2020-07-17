<template>
  <div
    v-show="backTop"
    class="back-top"
    @click="back"
  >
    <i class="el-icon-arrow-up" />
  </div>
</template>
<script>
    export default {
        data() {
            return {
                backTop: window.pageYOffset >= 300
            };
        },
        mounted() {
            this.util.on(window, 'scroll', this.handleScroll);
        },
        beforeDestroy() {
            this.util.off(window, 'scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
                this.backTop = window.pageYOffset >= 300;
            },
            back() {
                const sTop = document.documentElement.scrollTop || document.body.scrollTop;
                this.util.scrollTop(window, sTop, 0, 1000);
            }
        }
    };
</script>

<style scoped lang="scss">
  .back-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    width: 35px;
    height: 34px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    text-align: center;
    cursor: pointer;

    i {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
  }

  .back-top:hover {
    background-color: rgba(0, 0, 0, .6);
  }
</style>
