<template>
  <div class="layout">
    <div class="container">
      <keep-alive>
        <div class="content main">
          <router-view />
          <div style="clear: both;height: 20px;" />
        </div>
      </keep-alive>
      <div class="empty" />
    </div>

    <div class="footer">
      <div style="margin-top: 20px;">
        ©{{ new Date().getFullYear() }} | Build By
        <a
          target="_blank"
          href="https://kangyonggan.com"
        >康永敢</a>
      </div>
    </div>
    <back-top />
  </div>
</template>

<script>
    import BackTop from './back-top';

    export default {
        components: {BackTop}
    };
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;
  }

  .container {
    min-height: 100%;
    margin-bottom: -60px;
  }

  .empty {
    height: 60px;
  }

  .main {
    padding: 15px;
  }

  .footer {
    height: 60px;
    border-top: 1px solid #d5d5d5;
    text-align: center;
  }
</style>
