<template>
  <div>
    <router-view />
    <back-top />
  </div>
</template>

<script>
    import BackTop from './back-top';

    export default {
        components: {BackTop}
    };
</script>

<style lang="scss">
  body {
    margin: 10px;
  }
</style>
