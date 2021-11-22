<template>
  <div>
    <Nuxt class="page" />
    <footer class="page-footer">
        <nuxt-link class="footer-link" to="/">home</nuxt-link>
        |
        <nuxt-link class="footer-link" to="/sitemap">站点地图</nuxt-link>
    </footer>
  </div>
</template>

<script>
</script>

<style>
.page {
    min-height: 100vh;
}
.page-footer {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-top: -3em;
}
.footer-link,
.footer-link:hover {
    color: #39c;
}
.footer-link:hover {
    text-decoration: underline;
}
</style>
