let errorOutput
let backText

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
	return `<ruby>${text}<rp>(</rp><rt>${zhuyin}</rt><rp>)</rp></ruby>`
}

const textReplace = (text) => {
	if (/【[\s\S]*】/.test(text)) {
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
const doMatchList = (text) => {
	const type = text.match(/(?<=>=<)[\s\S]*?(?=>=<|】$)/g)
	let list = [], balance = 0, cacheList = []

	type.forEach((item) => {
		if (item.match(/【|】/)) {
			balance += (item.match(/【/g) || []).length
			balance -= (item.match(/】/g) || []).length
			cacheList.push(item)
			if (balance === 0) {
				list.push(cacheList.join(">=<"))
				cacheList = []
			}
		} else if (balance) {
			cacheList.push(item)
		} else {
			list.push(item)
		}
	})
	return list
}
const doTextList = {
	"文本-反转文本"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		return reverseText(textReplace(type[1]))
	},
	"文本-取文本左"(text) {
		const textState = doMatchList(text)
		return getTextLeft(textReplace(textState[0]), textReplace(textState[1]))
	},
	"文本-取文本右"(text) {
		const textState = doMatchList(text)
		return getTextRight(textReplace(textState[0]), textReplace(textState[1]))
	},
	"文本-取中间"(text) {
		const textState = doMatchList(text)
		return getTextCenter(textReplace(textState[0]), textReplace(textState[1]), textReplace(textState[2]))
	},
	"文本-注音"(text) {
		const textState = doMatchList(text)
		return `{{{注音-${textReplace(textState[0])}-${textReplace(textState[1])}}}}`
	},
	"当前时间"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		return getDate(+new Date(), type && textReplace(type[1]))
	},
	"返回"(text) {
		const type = text.match(/>=<([\s\S]*)】/)
		backText = textReplace(type[1])
		return ''
	},
	"选择"(text) {
		const choiceList = doMatchList(text)
		return textReplace(choiceList[parseInt(textReplace(choiceList[0]))])
	},
	"判断"(text) {
		const choiceList = doMatchList(text)
		return Function("return " + textReplace(choiceList[0]))() ? textReplace(choiceList[1]) : textReplace(choiceList[2])
	},
	"随机数"(text) {
		const minMax = doMatchList(text)
		return getRandom(textReplace(minMax[0]), textReplace(minMax[1]))
	}
}

const reverseText = (text) => {
	let resText = ''
	text.split(/({{{[\s\S]*?}}})/).forEach((text) => resText += /{{{[\s\S]*}}}/.test(text) ? text : text.split("").reverse().join(""))
	return resText
}

const getTextLeft = (text, stamp) => {
	return text.split(stamp)[0]
}
const getTextRight = (text, stamp) => {
	return text.substring(text.indexOf(stamp) + 1)
}
const getTextCenter = (text, leftStamp, rightStamp) => {
	const centerReg = new RegExp(`${leftStamp}([\\s\\S]*?)${rightStamp}`)
	if (text.match(centerReg)) {
		return text.match(centerReg)[1]
	} else {
		errorOutput = "没有找到想要的文本呢~是不是输错了呢？"
		return ''
	}
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

const getRandom = (min, max) => {
	return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1) + parseInt(min));
}

export default showText