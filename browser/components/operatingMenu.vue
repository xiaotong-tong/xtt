<template>
  <div class="operatingMenuContainer">
    <div class="title">
        有什么事呢？
    </div>
    <div class="main">
        内容区
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
