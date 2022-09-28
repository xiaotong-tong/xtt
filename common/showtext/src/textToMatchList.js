import { Replace } from "./replace.js";

export class TextMatch {
	static #getMatchList(type, divide, left, right) {
		/**
		 * 用分隔符将文本分为对应的数组
		 * 如 【选择-->>2-->>【随机数-->>1-->>5】-->>【随机数-->>1-->>10】】
		 * 将返回数组 ["【随机数-->>1-->>5】", "【随机数-->>1-->>10】"]
		 * */
		let list = [],
			balance = 0,
			cacheList = [];
		type.forEach((item) => {
			if (item.match(new RegExp(left + "|" + right))) {
				balance += (item.match(new RegExp(left, "g")) || []).length;
				balance -= (item.match(new RegExp(right, "g")) || []).length;
				cacheList.push(item);
				if (balance === 0) {
					list.push(cacheList.join(divide));
					cacheList = [];
				}
			} else if (balance) {
				cacheList.push(item);
			} else {
				list.push(item);
			}
		});
		return list;
	}

	static doTextMatchList(text) {
		const type = text.match(/(?<=-->>)[\s\S]*?(?=-->>|】$)/g);
		if (!type) {
			return;
		}

		return TextMatch.#getMatchList(type, "-->>", "【", "】").map((v) =>
			Replace.doReplaceToText(v)
		);
	}

	static doHTMLMatchList(text) {
		const type = text.match(/(?<=-)[\s\S]*?(?=-|(?:}}})$)/g);
		if (!type) {
			return [text];
		}

		return TextMatch.#getMatchList(type, "-", "{{{", "}}}").map((v) =>
			Replace.doReplaceToHTML(v)
		);
	}
}