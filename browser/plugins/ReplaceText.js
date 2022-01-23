class ReplaceText {
  constructor() {
    this.variableMap = {}
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
    let centerReg = new RegExp(`${leftStamp}([\\s\\S]*?)${rightStamp}`),
      matchType = text.match(centerReg);

    if (matchType) {
      return matchType[1];
    } else {
      centerReg = new RegExp(`${rightStamp}([\\s\\S]*?)${leftStamp}`);
      matchType = text.match(centerReg);
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
    let count, r, sum = 0;

    weightedList = weightedList.map((v) => parseInt(this.getTextNum(v)));
    count = weightedList.reduce((a, b) => a + b);
    r = this.getRandom(1, count);
    for (let i = 0; i < randomList.length; i++) {
      sum += weightedList[i];
      if (r <= sum) {
        return randomList[i];
      }
    }
  }

  getDate(newDate = +new Date(), type) {
    let date = new Date(newDate),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate().toString().padStart(2, '0'),
      hour = date.getHours().toString().padStart(2, '0'),
      minutes = date.getMinutes().toString().padStart(2, '0'),
      seconds = date.getSeconds().toString().padStart(2, '0'),
      resDate;

    switch (type) {
      case "时":
        resDate = hour;
        break;
      case "分":
        resDate = minutes;
        break;
      default:
        resDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
        break;
    }
    return resDate
  }

  getVariable(key) {
    return this.variableMap[key];
  }

  setVariable(key, value) {
    return this.variableMap[key] = value;
  }

}

export default ReplaceText;
