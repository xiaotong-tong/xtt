class ReplaceText {
    #variableMap;

    constructor() {
        this.#variableMap = {};
    }
    getReverseText(text) {
        let resText = "";

        for (let i = text.length - 1; i >= 0; i--) {
            resText += text[i];
        }
        return resText;
    }
    getTextLeft(text, stamp) {
        return text.split(stamp)[0];
    }
    getTextRight(text, stamp) {
        return text.substring(text.indexOf(stamp) + 1);
    }
    getTextCenter(text, leftStamp, rightStamp) {
        let matchType = text.match(new RegExp(`${leftStamp}([\\s\\S]*?)${rightStamp}`));

        if (matchType) {
            return matchType[1];
        } else {
            matchType = text.match(new RegExp(`${rightStamp}([\\s\\S]*?)${leftStamp}`));
            return matchType ? matchType[1] : text;
        }
    }
    getTextNum(text) {
        if (typeof text === "number") {
            return text;
        }
        return text.replace(/\D/g, '');
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (parseInt(this.getTextNum(max)) - (min = parseInt(this.getTextNum(min))) + 1) + min);
    }
    getWeightedRandom(randomList, weightedList) {
        let sum = 0;

        weightedList = weightedList.map(v => parseInt(this.getTextNum(v)));
        const r = this.getRandom(1, weightedList.reduce((a,b) => a + b));
        for (let i = 0; i < randomList.length; i++) {
            sum += weightedList[i];
            if (r <= sum) {
                return randomList[i];
            }
        }
    }
    getDate(newDate = Date.now(), type) {
        const date = new Date(newDate),
            year = date.getFullYear(),
            month = date.getMonth() + 1 + "",
            day = date.getDate().toString().padStart(2, '0'),
            hour = date.getHours().toString().padStart(2, '0'),
            minutes = date.getMinutes().toString().padStart(2, '0'),
            seconds = date.getSeconds().toString().padStart(2, '0'),
            week = date.getDay(),
            weekList = ["星期一", "星期二","星期三", "星期四","星期五", "星期六","星期日"];

        if (type) {
            if (type === "all") {
                return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${weekList[week - 1]}`;
            }

            return type.replace("年", year).replace("月", month).replace("日", day)
            .replace("时", hour).replace("分", minutes).replace("秒", seconds)
            .replace("星期", weekList[week - 1]);
        }
        return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    }
    getVariable(key) {
        return this.#variableMap[key];
    }
    setVariable(key, value) {
        this.#variableMap[key] = value;
        return ""
    }
}

export default ReplaceText;