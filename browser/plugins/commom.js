import Vue from 'vue';
import showText from './showText.js'

let data= {
    install(Vue){
        Vue.prototype.$host = {
        	oss: process.env.API_FILE_HOST
        }
        Vue.prototype.DateTime = {
            // 传入一个日期，返回传入日期的中文表示
            // 返回格式为 *年*月*日
            // 传入为空则返回空
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