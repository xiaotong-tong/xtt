let errorOutput
let backText

const matchReg = new RegExp("【[\\s\\S]*】")
const showText = (text) => {
	let resText = textReplace(text)

	let matches = resText.match(/{{{([\s\S]*)}}}/g)
	matches?.forEach((matchText) => {
		resText = resText.replace(matchText, showTextReplace)
	})
	return errorOutput || resText
}
const showTextReplace = (text) => {
	const type = text.match(/{{{([\s\S]*?)-(?:[\s\S]*?)}}}/)
	if (type && doShowList[type[1]]) {
		return doShowList[type[1]](type.input)
	} else {
		return type.input
	}
}
const doShowList = {
	"注音": (text) => {
		const type = text.match(/{{{(?:[\s\S]*?)-([\s\S]*?)-([\s\S]*)}}}/)
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
	const type = match.match(/【([\s\S]*?)(?:>=<|】)/)
	if (type && doTextList[type[1]]) {
		return doTextList[type[1]](type.input)
	} else {
		return type.input
	}
}
const doTextList = {
	"文本-反转文本"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		return reverseText(type[1])
	},
	"文本-取文本左"(text) {
		const type = text.match(/[\s\S]*?>=<([\s\S]*)>=<([\s\S]*?)】/)
		return getTextLeft(type[1], type[2])
	},
	"文本-取文本右"(text) {
		const type = text.match(/[\s\S]*?>=<([\s\S]*)>=<([\s\S]*?)】/)
		return getTextRight(type[1], type[2])
	},
	"文本-取中间"(text) {
		const type = text.match(/[\s\S]*?>=<([\s\S]*)>=<([\s\S]*?)>=<([\s\S]*?)】/)
		return getTextCenter(type[1], type[2], type[3])
	},
	"文本-注音"(text) {
		const type = text.match(/[\s\S]*?>=<([\s\S]*)>=<([\s\S]*?)】/)
		return phonetic(type[1], type[2])
	},
	"当前时间"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		return getDate(+new Date(), type && type[1])
	},
	"返回"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		backText = type[1]
		return ''
	},
	"选择"(text) {
		const type = text.match(/(?<=>=<)[\s\S]*?(?=>=<|】$)/g)
		let choiseList = [], balance = 0, cacheList = []

		type.forEach((item, i) => {
			if (item.match(/【|】/)) {
				balance += (item.match(/【/g) || []).length				
				balance -= (item.match(/】/g) || []).length
				cacheList.push(item)
				if (balance === 0) {
					choiseList.push(cacheList.join(">=<"))
					cacheList = []
				}
			} else if (balance) {
				cacheList.push(item)
			} else {
				choiseList.push(item)
			}
		})
		return choice(choiseList[0], choiseList)
	}
}

const reverseText = (text) => {
	let resText = ''
	textReplace(text).split(/({{{[\s\S]*?}}})/).forEach((text) => resText += /{{{[\s\S]*}}}/.test(text) ? text : text.split("").reverse().join(""))
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
	const centerReg = new RegExp(`${leftStamp}([\s\S]*?)${rightStamp}`)
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

const getDate = (newdate = +new Date(), type) => {
	const date = new Date(newdate),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate().toString().padStart(2, '0'),
			hour = date.getHours().toString().padStart(2, '0'),
			minutes = date.getMinutes().toString().padStart(2, '0'),
			seconds = date.getSeconds().toString().padStart(2, '0')

	let resDate
	switch (type) {
		case "时":
			resDate = hour
			break
		case "分":
			resDate = minutes
			break
		default:
			resDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
			break
		}
	return resDate
}

const choice = (stamp, choiceList) => {
	return textReplace(choiceList[parseInt(textReplace(stamp))])
}

export default showText

// document.body.insertAdjacentHTML("beforeend", errorOutput || output)