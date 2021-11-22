<template>
  <main>
      <article class="mygal">
          <h1 class="not-show">小莫词库</h1>
          <section class="mygal-qun">
              <header class="mygal-qun-header">
                  <div class="mygal-qun-name-wrap">
                    <h2 class="mygal-qun-name">莫言国G&G校图书馆</h2>
                  </div>
              </header>
              <section class="mygal-qun-main">
                  <header class="mygal-qun-main-head">
                      <nav class="mygal-qun-nav">
                          <ul class="mygal-qun-nav-wrap">
                              <li class="mygal-qun-nav-item" :class="{ 'mygal-qun-active-path': activePath === '/wordbook/play/chat' }">
                                  <nuxt-link :to="{path: 'play/chat'}" class="mygal-qun-nav-link">聊天</nuxt-link>
                              </li>
                              <li class="mygal-qun-nav-item">
                                  <a href="#" class="mygal-qun-nav-link">公告</a>
                              </li>
                              <li class="mygal-qun-nav-item">
                                  <a href="#" class="mygal-qun-nav-link">相册</a>
                              </li>
                              <li class="mygal-qun-nav-item">
                                  <a href="#" class="mygal-qun-nav-link">文件</a>
                              </li>
                              <li class="mygal-qun-nav-item">
                                  <a href="#" class="mygal-qun-nav-link">活动</a>
                              </li>
                          </ul>
                      </nav>
                  </header>
                    <section class="mygal-qun-chat">
                        <nuxt-child />
                    </section>
              </section>
          </section>
      </article>
  </main>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    async asyncData({ $axios, route }) {
        try {
            return {
                activePath: route.path
            }
        } catch (err) {
            
        }
    },
    middleware: 'toChat'
}
</script>

<style scoped>
.mygal-qun {
    --font-header-color: #fff;
    --border-color: #ebebeb
}
.mygal-qun {
    width: 929px;
    height: 572px;
    margin: 20px auto 0;
    box-shadow: 0 0 3px #666;
}
.mygal-qun-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-image: linear-gradient(to right,#4c8bff,#1fd2ff);
}
.mygal-qun-name {
    font-size: 18px;
    font-weight: 400;
    color: var(--font-header-color);
}
.mygal-qun-main {
    width: 100%;
    height: calc(100% - 40px);
}
.mygal-qun-main-head {
    position: relative;
    z-index: 2;
    background-color: #fff;
    width: 100%;
    height: 49px;
    border-bottom: 1px solid var(--border-color);
}
.mygal-qun-nav-wrap {
    display: flex;
    width: 100%;
    height: 35px;
    transform: translateY(15px);
}
.mygal-qun-nav-item {
    margin: 0 8px;
    padding: 0 5px;
}
.mygal-qun-active-path,
.mygal-qun-nav-item:hover {
    border-bottom: 2px solid #191919;
}
.mygal-qun-nav-link {
    color: #888;
}
.mygal-qun-active-path,
.mygal-qun-nav-link:hover {
    color: #000;
}
.mygal-qun-chat {
    width: 100%;
    height: calc(100% - 50px);
}
</style>
