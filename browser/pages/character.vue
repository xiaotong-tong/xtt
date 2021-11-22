<template>
  <div>
    <div>
      个人属性
      {{ username }}
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    async asyncData({ $axios }) {
        try {
            let { data: usernameData } = await $axios.get('http://127.0.0.1:7365/api/character/username');

            return {
                username: usernameData.username
            }
        } catch (err) {
            
        }
    }
}
</script>

<style>
</style>
