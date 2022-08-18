import XttJS from "./xtt.js";

class ReplaceText extends XttJS {
	static variableMap = {};

	static getTextLeft(text, stamp) {
		return text.split(stamp)[0];
	}
	static getTextRight(text, stamp) {
		return text.substring(text.indexOf(stamp) + 1);
	}
	static getTextCenter(text, leftStamp, rightStamp) {
		let matchType = text.match(
			new RegExp(`${leftStamp}([\\s\\S]*?)${rightStamp}`)
		);

		if (matchType) {
			return matchType[1];
		} else {
			matchType = text.match(
				new RegExp(`${rightStamp}([\\s\\S]*?)${leftStamp}`)
			);
			return matchType ? matchType[1] : text;
		}
	}
	static getRandom(min, max) {
		return super.getRandom(super.getTextNum(min), super.getTextNum(max));
	}
	static getWeightedRandom(randomList, weightedList) {
		return super.getWeightedRandom(
			randomList,
			weightedList.map((v) => super.getTextNum(v))
		);
	}
	static nonrandom(min = 1, max = 10, variable) {
		if ((min = super.getTextNum(min)) === (max = super.getTextNum(max))) {
			return max;
		} // 如果两值相等则返回
		if (min > max) {
			let temp = min;
			min = max;
			max = temp;
		}
		let arr = super.getNonrandom(min, max);

		if (variable) {
			this.setVariable(variable, arr[Symbol.iterator]());
			return "";
		} else {
			return arr;
		}
	}
	static getDate(newDate = Date.now(), type) {
		const date = new Date(newDate),
			year = date.getFullYear(),
			month = date.getMonth() + 1 + "",
			day = date.getDate().toString().padStart(2, "0"),
			hour = date.getHours().toString().padStart(2, "0"),
			minutes = date.getMinutes().toString().padStart(2, "0"),
			seconds = date.getSeconds().toString().padStart(2, "0"),
			week = date.getDay(),
			weekList = [
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
				"星期日"
			];

		if (type) {
			if (type === "all") {
				return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${
					weekList[week - 1]
				}`;
			}

			return type
				.replace("年", year)
				.replace("月", month)
				.replace("日", day)
				.replace("时", hour)
				.replace("分", minutes)
				.replace("秒", seconds)
				.replace("星期", weekList[week - 1]);
		}
		return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
	}
	static getVariable(key) {
		let res = this.variableMap[key];
		if (res === undefined) {
			throw "没有" + key + "变量哦";
		}
		if (res.next) {
			let data = res.next();
			if (data.done) {
				return "已经获取完了哦~";
			} else {
				return data.value;
			}
		}
		return res;
	}
	static setVariable(key, value) {
		this.variableMap[key] = value;
		return "";
	}
}

export default ReplaceText;
