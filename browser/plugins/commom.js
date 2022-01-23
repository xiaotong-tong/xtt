import Vue from 'vue';
import showText from './showText.js'

let data= {
    install(Vue){
        Vue.prototype.$host = {
        	oss: process.env.API_FILE_HOST
        }
        Vue.prototype.DateTime = {
            toCnDate: (newdate) => {
                if (!newdate) { return '' }

                let time = new Date(newdate),
                    year = time.getFullYear(),
                    month = String(time.getMonth() + 1),
                    day = time.getDate().toString();

                return `${year}年${month}月${day}日`;
            }
        }
        Vue.prototype.$showText = {
        	showText
        }
    }
}

Vue.use(data);
