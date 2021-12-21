<template>
  <div class="container">
    <h1 class="not-show">
      小恸恸的个人主页
    </h1>
    <section class="touxiang-wrap not-show">
      <img :src="touxiang" alt="头像" class="touxiang" draggable="false">
      <p class="signature">
        毕竟几人真得鹿 <br>
        不知终日梦为鱼
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touxiang: "images/lian-title.png"
    }
  },
  layout: 'lian'
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.touxiang-wrap {
  background-color: #ffffff99;
}
.touxiang {
  border-radius: 50%;
  width: 150px;
  aspect-ratio: 1 / 1;
}
.signature {
  margin-block-start: .5em;
  letter-spacing: .2em;
}
</style>
