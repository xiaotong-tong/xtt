<template>
  <div class="operatingMenuContainer">
    <div class="title">
        有什么事呢？
    </div>
    <div class="main">
        <ul>
          <li>
              <a href="/text">文本操作类</a>
          </li>
          <li>
              <a href="/">首页</a>
          </li>
      </ul>
    </div>
    <div
        class="closeMenuLink"
        @click="closeMenu"
    >
        没什么事
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        closeMenu(ev) {
            this.$emit("closeMenu");
            ev.preventDefault();
        }
    }
}
</script>

<style>
.operatingMenuContainer {
    display: flex;
    width: 200px;
    height: 300px;
    flex-direction: column;
    justify-content: space-between;
}
.main {
    flex: 1;
}
.title {
    margin-bottom: .5em;
}
.closeMenuLink {
    display: list-item;
    list-style: circle inside;
    width: fit-content;
}
.closeMenuLink:hover {
    background-color: #ccc;
}
</style>
