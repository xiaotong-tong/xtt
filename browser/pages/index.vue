<template>
  <div class="container">
    <h1 class="not-show">
      小恸恸的个人主页
    </h1>
    <section class="touxiang-wrap">
      <img :src="touxiang" alt="头像" class="touxiang">
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touxiang: "https://myfilegal.cn/images/xtt/lian-title.png"
    }
  },
  layout: 'lian'
}
</script>

<style scoped>
.touxiang-wrap {
  /* border-radius: 50%; */
  width: 150px;
  height: 150px;
  overflow: hidden;
  /* border: thin solid #ccc; */
}
.touxiang {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>
