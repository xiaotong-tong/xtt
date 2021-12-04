const DateTime = require('./datetime');
function addQQ() {
    let ini = `3059198472=72
1876225066=111
3221439097=493
341590065=220
904391629=487
295967596=315
3532304040=70
809268422=9
2358961702=21
1993250372=132
1670232718=23
1261634587=14
230731740=8
906594686=29
1413234184=66
167218476=14
1572162834=2
834311979=18
2774595388=3
2743612049=8
1515712293=29
3113604085=12
10726371=1
1376211709=3
352869575=28
1160152573=1
3153927003=1
254494319=119
1844775651=19
531920632=134
2297504353=13
1571550227=8
1461427015=67
2012871226=73
892549292=91
2849446053=5
554518286=3
2949203814=3
1650349049=37
2921805922=8
211792112=1
445165716=88
912742864=3
1109738380=55
1176449461=36
3595868845=1
1207510416=128
2897636719=1
1165377737=1
1445425612=150
3256247459=2
2966480557=6
278650734=69
2337259909=1
1263576779=80
2054407277=1
3136289330=33
2473653892=5
1472624163=85
1607349046=11
645743125=16
513001028=58
381281642=34
936867239=10
2577554307=112
937292896=11
3152845151=17
3025067003=1
576678778=12
3361180451=23
1642017593=14
479711236=3
826832810=53
2935711698=2
2060383768=35
3247171271=36
2833899500=20
990081873=1
790705585=104
756830252=35
3122848440=2
1552093177=8
1074924616=20
2119362433=2
2275548122=52
1142033406=13
3429998278=1
1770025105=1
283916436=1
673289791=1
305129617=92
2579312963=79
709456587=1
764603007=9
1837689444=1
1181041371=4
784100711=39
3180527683=11
1349129085=31
2893748182=1
2869471598=9
1571014246=1
523883789=79
1758866343=3
2949146403=10
392103993=1
1119251171=1
1203482704=1
`,
    arr = [];
    date = DateTime.getNowDate();

    ini.replace(/(\d{6,10})=(\d{1,4})/g, function(data, $1, $2) {
        arr.push(`('${date}',${$1},${$2})`);
    })
    return arr.join(',');
}

module.exports = addQQ;

// 添加 QQ
// DB.query('insert into users (qq) values ' + QQ() + ';', function(error, results, fields) {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(results);
//     console.log('-----------------------');
//     console.log(fields);
// });

// 添加签到
// DB.query('insert into attendance (check_in_time,qq,accumulative) values ' + QQ() + ';', function(error, results, fields) {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(results);
//     console.log('-----------------------');
//     console.log(fields);
// });