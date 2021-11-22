 <template>
 <div>
    <el-card>
      <el-link type="primary" href="/games/addgame">添加</el-link>
    </el-card>
    <el-table
      :data="showList"
      style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
            <a v-if="scope.row.uid" :href="'https://store.steampowered.com/app/' + scope.row.uid" target="_blank">{{ scope.row.name }}</a>
            <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
            <div v-if="scope.row.stop_sell === 1">
              <span>停售</span>
            </div>
            <div v-else-if="!scope.row.uid">
              <span>未在steam发售</span>
            </div>
            <div v-else-if="scope.row.coming_soon">
              <span>即将发售</span>
            </div>
            <div v-else-if="scope.row.init_price === 0">
              <span>免费</span>
            </div>
            <div v-else-if="scope.row.init_price = scope.row.final_price">
              <span>{{ scope.row.init_price }}</span>
            </div>
            <div v-else>
              <span>{{ scope.row.final_price }}</span>
              <span class="sales">{{ scope.row.init_price }}</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="team"
          label="制作组">
      </el-table-column>
       <el-table-column
          prop="release_date"
          label="发售时间">
      </el-table-column>
    </el-table>
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
            data.data.forEach(item => {
              item.release_date = this.DateTime.toCnDate(item.release_date);
            });
            this.showList = data.data;
        }
    },
    created() {
        this.getData();
    },
    layout: 'site',
    middleware: 'mobile'
}
  </script>

  <style scoped>
  .sales {
    text-decoration: line-through;
  }
  </style>