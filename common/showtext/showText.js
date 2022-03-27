/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * 使用: 有两种调用方式
 *      - showTextBrowser
 *          传入要输入的字符串, 如 【文本-反转文本-->>反转文本】, 将返回 本文转反 四个字符
 *      - showTextWithMarked
 *          和 showTextBrowser 方法同样的处理过程, 在输出结果时, 使用 marked 库对文本进行了一次 markdown语法解析
 * */
import { marked } from "marked";
import BrowserReplaceText from "./BrowserReplaceText.js";
const ReplaceText = new BrowserReplaceText();

class ShowText {
    errorOutput;
    #backText;

    constructor() {
        /**
         * 文本解析处
        */
        this.doTextList = Object.assign({
            "文本-反转文本"(text) {
                const type = text.match(/-->>([\s\S]*)】/);
                return ReplaceText.getReverseText(this.doReplaceToText(type[1]));
            },
            "文本-取文本左"(text) {
                const textState = this.doTextMatchList(text);
                return ReplaceText.getTextLeft(this.doReplaceToText(textState[0]), this.doReplaceToText(textState[1]));
            },
            "文本-取文本右"(text) {
                const textState = this.doTextMatchList(text);
                return ReplaceText.getTextRight(this.doReplaceToText(textState[0]), this.doReplaceToText(textState[1]));
            },
            "文本-取中间"(text) {
                const textState = this.doTextMatchList(text);
                return ReplaceText.getTextCenter(this.doReplaceToText(textState[0]), this.doReplaceToText(textState[1]), this.doReplaceToText(textState[2]));
            },
            "文本-替换"(text) {
                const textState = this.doTextMatchList(text);
                return this.doReplaceToText(textState[0]).replace(this.doReplaceToText(textState[1]), this.doReplaceToText(textState[2]));
            },
            "文本-取出数字"(text) {
                const textState = this.doTextMatchList(text);
                return ReplaceText.getTextNum(this.doReplaceToText(textState[0]));
            },
            "当前时间"(text) {
                const type = text.match(/-->>([\s\S]*)】/);
                return ReplaceText.getDate(+new Date(), type && this.doReplaceToText(type[1]));
            },
            "返回"(text) {
                const type = text.match(/-->>([\s\S]*)】/);
                this.#backText = this.doReplaceToText(type[1]);
                return ''
            },
            "选择"(text) {
                const choiceList = this.doTextMatchList(text);
                let choiceNum = parseInt(ReplaceText.getTextNum(this.doReplaceToText(choiceList[0])));
                choiceNum = choiceNum > choiceList.length - 1 ? choiceList.length - 1 : choiceNum;
                return this.doReplaceToText(choiceList[choiceNum]);
            },
            "判断"(text) {
                const choiceList = this.doTextMatchList(text);
                // 此处使用了 Function() 来处理用户输入的数据， 可以xss注入
                return Function("return " + this.doReplaceToText(choiceList[0]))() ? this.doReplaceToText(choiceList[1]) : this.doReplaceToText(choiceList[2]);
            },
            "随机数"(text) {
                const minMax = this.doTextMatchList(text);
                return ReplaceText.getRandom(this.doReplaceToText(minMax[0]), this.doReplaceToText(minMax[1]));
            },
            "权重随机数"(text) {
                const type = this.doTextMatchList(text);
                return ReplaceText.getWeightedRandom(this.doReplaceToText(type[0]).split(/[,，]/), this.doReplaceToText(type[1]).split(/[,，]/));
            },
            "变量"(text) {
                const type = this.doTextMatchList(text);
                return type.length === 1 ? ReplaceText.getVariable(this.doReplaceToText(type[0])) : ReplaceText.setVariable(this.doReplaceToText(type[0]), this.doReplaceToText(type[1]));
            }
        }, {
            "文本-注音"(text) {
                const textState = this.doTextMatchList(text);
                return `{{{注音-${this.doReplaceToText(textState[0])}-${this.doReplaceToText(textState[1])}}}}`;
            },
            "文本-文字颜色"(text) {
                const textState = this.doTextMatchList(text);
                return `{{{文字颜色-${this.doReplaceToText(textState[0])}-${this.doReplaceToText(textState[1])}}}}`;
            },
            "文本-黑幕"(text) {
                const textState = this.doTextMatchList(text);
                return `{{{黑幕-${this.doReplaceToText(textState[0])}}}}`;
            },
            "换行"() {
                return "{{{换行}}}"
            },
            "空格"() {
                return "{{{空格}}}"
            },
        });
        this.doHTMLList = {
            "注音"(text) {
                const type = this.doHTMLMatchList(text);
                return ReplaceText.getRubyHTML(this.doReplaceToHTML(type[0]), type[1]);
            },
            "文字颜色"(text) {
                const type = this.doHTMLMatchList(text);
                return ReplaceText.setTextColor(this.doReplaceToHTML(type[0]), type[1]);
            },
            "黑幕"(text) {
                const type = this.doHTMLMatchList(text);
                return ReplaceText.getHeimuHTML(this.doReplaceToHTML(type[0]));
            },
            "换行"() {
                return "<br />"
            },
            "空格"() {
                return "&nbsp;"
            },
        };
    }
    showText(text) {
        /**
         * 入口函数, 对数据进行预先处理, 如将 【 左侧的空格和换行 以及 】 右侧的空格和换行删除
         * */
        let resText = text;

        if (/【[\s\S]*】/.test(text)) {
            text = text.replace(/\s+(?=【)/g, "").replace(/(?<=】)\s+/g, "");
            resText = this.doReplaceToText(text);

            /**
             * 【】解析的内容如果需要格外添加 html标签的话，会暂时返回 {{{}}} 格式内容
             * doReplaceToHTML 会将 {{{}}}格式转为对应的 html标签文本
             * */
            resText = this.doReplaceToHTML(resText)
        }
        return this.errorOutput || resText;
    }
    doReplaceToText(text) {
        /**
         * 【】 类型文本处理函数, 将当前文本中的第一层的【】内容取出并解析替换, 在解析过程中通过递归来处理第二层以及更多层的文本
         * 如 【1【2】【3【4】】】【5】， 解析层级 1,5 -->> 2,3 -->> 4
         * */
        if (/【[\s\S]*】/.test(text)) {
            let parts = text.match(/[【】]|[^【】]+/g),
                matches = [],
                balance = 0, index = 0;

            for (let i = 0; i < parts.length; i++) {
                if (parts[i] === "【") {
                    if (balance === 0) {
                        index = i;
                    }
                    balance++;
                } else if (parts[i] === "】") {
                    if (balance === 1) {
                        matches.push(parts.slice(index, i + 1).join(""));
                    }
                    balance--;
                    if (balance < 0) {
                        this.errorOutput = 'missing "【"';
                        return text;
                    }
                }
            }
            if (balance > 0) {
                this.errorOutput = 'missing "】"';
                return text;
            }

            matches?.forEach(matchText => {
                text = text.replace(matchText, match => this.doTextMatch(match));
                if (this.#backText) {
                    text = this.#backText;
                    this.#backText = '';
                }
            });
        }
        return text;
    }
    doReplaceToHTML(text) {
        if (/{{{[\s\S]*}}}/.test(text)) {
            let parts = text.match(/[\{\}]{3}|[^\{\}]+/g),
                matches = [],
                balance = 0, index = 0;

            for (let i = 0; i < parts.length; i++) {
                if (parts[i] === "{{{") {
                    if (balance === 0) {
                        index = i;
                    }
                    balance++;
                } else if (parts[i] === "}}}") {
                    if (balance === 1) {
                        matches.push(parts.slice(index, i + 1).join(""));
                    }
                    balance--;
                }
            }

            matches?.forEach(matchText => text = text.replace(matchText, match => this.doHTMLMatch(match)) );
        }
        return text;
    }
    doTextMatch(match) {
        /** 
         * 根据文本的内容 查找是否有对应的解析，如果有就调用，没有就返回文本 
         * */
        const type = match.match(/【([\s\S]*?)(?:-->>|】)/);
        if (type && this.doTextList[type[1]]) {
            return this.doTextList[type[1]].call(this, type.input);
        } else {
            return type.input;
        }
    }
    doHTMLMatch(match) {
        const type = match.match(/{{{([\s\S]*?)[-|(?:}}})]/);
        if (type && this.doHTMLList[type[1]]) {
            return this.doHTMLList[type[1]].call(this, type.input);
        } else {
            return type.input;
        }
    }

    #getMatchList(type, divide, left, right) {
        /**
         * 用分隔符将文本分为对应的数组
         * 如 【选择-->>2-->>【随机数-->>1-->>5】-->>【随机数-->>1-->>10】】
         * 将返回数组 ["【随机数-->>1-->>5】", "【随机数-->>1-->>10】"]
         * */
        let list = [], balance = 0, cacheList = [];
        type.forEach(item => {
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
    doTextMatchList(text) {
        const type = text.match(/(?<=-->>)[\s\S]*?(?=-->>|】$)/g);
        if (!type) { return [text] }

        return this.#getMatchList(type, "-->>", "【", "】");
    }
    doHTMLMatchList(text) {
        const type = text.match(/(?<=-)[\s\S]*?(?=-|(?:}}})$)/g);
        if (!type) { return [text] }

        return this.#getMatchList(type, "-", "{{{", "}}}");
    }
}


export const showTextBrowser = (text) => {
    const Text = new ShowText;
    return Text.showText(text);
}

export const showTextWithMarked = (text) => {
    const Text = new ShowText;
    return marked.parse(Text.showText(text));
}
