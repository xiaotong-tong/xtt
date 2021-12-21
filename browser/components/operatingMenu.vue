<template>
  <div class="operatingMenuContainer">
    <div class="title">
        有什么事呢？
    </div>
    <div class="closeMenuLink">
        没什么事
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style>
.operatingMenuContainer {
    width: 200px;
    height: 300px;
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
