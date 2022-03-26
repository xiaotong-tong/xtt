import ReplaceText from "./ReplaceText.js";

class BrowserReplaceText extends ReplaceText {
    constructor() {
        super();
    }
    getReverseText(text) {
        let resText = '';
        // 因为 {{{}}}文本反转后就无法解析了，因此此处反转文本时将 {{{}}}与内容文本排除
        text.split(/({{{[\s\S]*?}}})/).forEach(text => resText += /{{{[\s\S]*}}}/.test(text) ? text : text.split("").reverse().join(""));
        return resText;
    }
    getRubyHTML(text, rt) {
        return `<ruby>${text}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`;
    }
    setTextColor(text, color) {
        // 如果文本就是一个标签文本的话 那直接追加 style属性，不是的话那就追加一个span标签
        if (/^<[\s\S]+>$/.test(text)) {
            return text.replace(/^<([\s\S]+?)>/, `<$1 style="color: ${color}">`);
        } else {
            return `<span style="color: ${color}" >${text}</span>`;
        }
    }
    getHeimuHTML(text) {
        if (/^<[\s\S]+>$/.test(text)) {
            return text.includes("class=") ?
                text.replace(/class="([\s\S]+?)"/, "class='$1 heimu'") :
                text.replace(/^<([\s\S]+?)>/, "<$1 class='heimu'>");
        } else {
            return `<span class="heimu">${text}</span>`;
        }
    }
}

export default BrowserReplaceText;