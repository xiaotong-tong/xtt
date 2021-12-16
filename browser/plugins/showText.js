let errorOutput
let backText

const matchReg = new RegExp("【.*】")
const showText = (text) => {
	let resText = textReplace(text)

	let matches = resText.match(/{{{(.*)}}}/g)
	matches?.forEach((matchText) => {
		resText = resText.replace(matchText, showTextReplace)
	})
	return errorOutput || resText
}
const showTextReplace = (text) => {
	const type = text.match(/{{{(.*?)-(?:.*?)}}}/)
	if (type && doShowList[type[1]]) {
		return doShowList[type[1]](type.input)
	} else {
		return type.input
	}
}
const doShowList = {
	"注音": (text) => {
		const type = text.match(/{{{(?:.*?)-(.*?)-(.*)}}}/)
		return replaceZhuyin(type[1], type[2])
	}
}
const replaceZhuyin = (text, zhuyin) => {
	return `<ruby>${text}<rt>${zhuyin}</rt></ruby>`
}

const textReplace = (text) => {
	if (matchReg.test(text)) {
		let parts = text.match(/[【】]|[^【】]+/g),
				matches = [],
				balance = 0

		for (let i=0, j=0; i<parts.length; i++) {
			switch (parts[i]) {
				case "【":
					if (balance === 0) {
						j = i
					}
					balance++
					break
				case "】":
					if (balance === 1) {
						matches.push(parts.slice(j, i+1).join(""))
					}
					balance--
					if (balance < 0) {
						errorOutput = 'missing "【"'
						return text
					}
					break
			}
		}
		if (balance > 0) {
			errorOutput = 'missing "】"'
			return text
		}
		matches.forEach((matchText) => {
			text = text.replace(matchText, doMatch)
			if (backText) {
				text = backText
				backText = ''
			}
		})
	}
	return text
}
const doMatch = (match) => {
	const type = match.match(/【(.*?)(?:>=<|】)/)
	if (type && doTextList[type[1]]) {
		return doTextList[type[1]](type.input)
	} else {
		return type.input
	}
}
const doTextList = {
	"文本-反转文本": (text) => {
		const type = text.match(/>=<(.*)】/)
		return reverseText(type[1])
	},
	"文本-取文本左": (text) => {
		const type = text.match(/.*?>=<(.*)>=<(.*?)】/)
		return getTextLeft(type[1], type[2])
	},
	"文本-取文本右": (text) => {
		const type = text.match(/.*?>=<(.*)>=<(.*?)】/)
		return getTextRight(type[1], type[2])
	},
	"文本-取中间": (text) => {
		const type = text.match(/.*?>=<(.*)>=<(.*?)>=<(.*?)】/)
		return getTextCenter(type[1], type[2], type[3])
	},
	"文本-注音": (text) => {
		const type = text.match(/.*?>=<(.*)>=<(.*?)】/)
		return phonetic(type[1], type[2])
	},
	"当前时间": () => {
		return getDate()
	},
	"返回": (text) => {
		const type = text.match(/>=<(.*)】/)
		backText = type[1]
		return ''
	}
}

const reverseText = (text) => {
	let resText = ''
	textReplace(text).split(/({{{.*?}}})/).forEach((text) => resText += /{{{.*}}}/.test(text) ? text : text.split("").reverse().join(""))
	return resText
}

const getTextLeft = (text, stamp) => {
	return textReplace(text).split(stamp)[0]
}
const getTextRight = (text, stamp) => {
	const resText = textReplace(text)
	return resText.substring(resText.indexOf(stamp) + 1)
}
const getTextCenter = (text, leftStamp, rightStamp) => {
	const centerReg = new RegExp(`${leftStamp}(.*?)${rightStamp}`)
	const resText = textReplace(text)
	if (resText.match(centerReg)) {
		return resText.match(centerReg)[1]
	} else {
		errorOutput = "没有找到想要的文本呢~是不是输错了呢？"
		return text
	}
}
const phonetic = (text, pinyin) => {
	return `{{{注音-${text}-${pinyin}}}}`
}

const getDate = (newdate = +new Date()) => {
	const date = new Date(newdate),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate().toString().padStart(2, '0'),
			hour = date.getHours().toString().padStart(2, '0'),
			minutes = date.getMinutes().toString().padStart(2, '0'),
			seconds = date.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

export default showText

// document.body.insertAdjacentHTML("beforeend", errorOutput || output)