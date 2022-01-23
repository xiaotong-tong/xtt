import BrowserReplaceText from "./BrowserReplaceText.js";

const ReplaceText = new BrowserReplaceText();
let errorOutput;
let backText;

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
    return ReplaceText.getRubyShowText(type[1], type[2])
  }
}

const textReplace = (text) => {
  if (/【[\s\S]*】/.test(text)) {
    let parts = (text = text.replaceAll("-->>", ">=<")).match(/[【】]|[^【】]+/g),
      matches = [],
      balance = 0;

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
  if (!type) { return [text] }

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
    return ReplaceText.getReverseText(textReplace(type[1]))
  },
  "文本-取文本左"(text) {
    const textState = doMatchList(text)
    return ReplaceText.getTextLeft(textReplace(textState[0]), textReplace(textState[1]))
  },
  "文本-取文本右"(text) {
    const textState = doMatchList(text)
    return ReplaceText.getTextRight(textReplace(textState[0]), textReplace(textState[1]))
  },
  "文本-取中间"(text) {
    const textState = doMatchList(text)
    return ReplaceText.getTextCenter(textReplace(textState[0]), textReplace(textState[1]), textReplace(textState[2]))
  },
  "文本-替换"(text) {
    const textState = doMatchList(text)
    return textReplace(textState[0]).replace(textReplace(textState[1]), textReplace(textState[2]))
  },
  "文本-取出数字"(text) {
    const textState = doMatchList(text)
    return ReplaceText.getTextNum(textReplace(textState[0]))
  },
  "文本-注音"(text) {
    const textState = doMatchList(text)
    return `{{{注音-${textReplace(textState[0])}-${textReplace(textState[1])}}}}`
  },
  "当前时间"(text) {
    const type = text.match(/>=<([\s\S]*)】/)
    return ReplaceText.getDate(+new Date(), type && textReplace(type[1]))
  },
  "返回"(text) {
    const type = text.match(/>=<([\s\S]*)】/)
    backText = textReplace(type[1])
    return ''
  },
  "选择"(text) {
    const choiceList = doMatchList(text)
    return textReplace(choiceList[ReplaceText.getTextNum(textReplace(choiceList[0]))])
  },
  "判断"(text) {
    const choiceList = doMatchList(text)
    return Function("return " + textReplace(choiceList[0]))() ? textReplace(choiceList[1]) : textReplace(choiceList[2])
  },
  "随机数"(text) {
    const minMax = doMatchList(text)
    return ReplaceText.getRandom(textReplace(minMax[0]), textReplace(minMax[1]))
  },
  "权重随机数"(text) {
    const type = doMatchList(text)
    return ReplaceText.getWeightedRandom(textReplace(type[0]).split(/[,，]/), textReplace(type[1]).split(/[,，]/))
  },
  "变量"(text) {
    const type = doMatchList(text)
    if (type.length === 1) {
      return ReplaceText.getVariable(textReplace(type[0]))
    } else if (type.length > 1) {
      ReplaceText.setVariable(textReplace(type[0]), textReplace(type[1]))
      return ''
    }
  }
}

export default showText
