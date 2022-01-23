import ReplaceText from "./ReplaceText.js";

class BrowserReplaceText extends ReplaceText {
  constructor() {
    super();
  }

  getReverseText(text) {
    let resText = '';
    text.split(/({{{[\s\S]*?}}})/).forEach((text) => resText += /{{{[\s\S]*}}}/.test(text) ? text : text.split("").reverse().join(""));
    return resText;
  }

  getRubyShowText(text, rt) {
    return `<ruby>${text}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`;
  }
}

export default BrowserReplaceText;
