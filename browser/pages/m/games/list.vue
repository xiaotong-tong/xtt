 <template>
    <div>
        <a href="/games/list">请使用pc打开</a>
        <nuxt-link to="/games/list">请使用pc打开</nuxt-link>
    </div>
  </template>

  <script>
import { gamesQueryList } from '~~/api/games.js';

export default {
    data() {
        return {
            showList: []
        }
    },
    methods: {
        async getData() {
            const data = await gamesQueryList();
            this.showList = data.data;
        }
    },
    created() {
        this.getData();
    },
    layout: 'site',
}
  </script>