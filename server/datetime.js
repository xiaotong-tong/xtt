// 返回当前时间的年月日
// 返回格式为 年-月-日
function getNowDate() {
    let time = new Date(),
        year = time.getFullYear(),
        month = String(time.getMonth() + 1).padStart(2, '0'),
        day = time.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// 传入一个日期，返回传入日期的中文表示
// 返回格式为 *年*月*日
// 传入为空则返回空
function toCnDate(newdate) {
    if (!newdate) { return '' }

    let time = new Date(newdate),
        year = time.getFullYear(),
        month = String(time.getMonth() + 1),
        day = time.getDate().toString();

    return `${year}年${month}月${day}日`;
}

// 将 *年*月*日 转为 年-月-日
function cnToDate(newdate) {
    if (!newdate) { return }
    return newdate.replace('年', '-').replace('月', '-').replace('日', '');
}

module.exports = {
    getNowDate,
    toCnDate,
    cnToDate
}