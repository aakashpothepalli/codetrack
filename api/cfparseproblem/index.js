const {parse} = require('node-html-parser');
const axios = require('axios')

    function toNumbers(d) {
        var e = [];
        d.replace(/(..)/g, function (d) {
            e.push(parseInt(d, 16))
        });
        return e
    }
    function toHex() {
        for (
            var d = [],
            d = 1 == arguments.length && arguments[0].constructor == Array
                ? arguments[0]
                : arguments,
            e = "",
            f = 0; f < d.length; f++
        ) 
            e += (
                16 > d[f]
                    ? "0"
                    : ""
            ) + d[f].toString(16);
        return e.toLowerCase()
    }
    var a = toNumbers("e9ee4b03c1d0822987185d27bca23378"),
        b = toNumbers("188fafdbe0f87ef0fc2810d5b3e34705"),
        c ;
    let slowAES = require('./slowaes')
    let cookie;

async function getCookie(){
    let res = await axios('https://codeforces.com/enter')
    let htmlString = (res.data)

    let index = htmlString.indexOf("c=toNumbers(")
    console.log("index",index)
    c = htmlString.substr(index+13,32)
    console.log(c)
     cookie = "RCPC=" + toHex(slowAES.decrypt(toNumbers(c), 2, a, b)) + "; expires=Thu" +
    ", 31-Dec-37 23:55:55 GMT; path=/";
    console.log(cookie)
}
module.exports = async function (req, resp) {
        console.log('JavaScript HTTP trigger function processed a request.');
        await getCookie();
        if (req.query.id) {
            let id = req.query.id;
            let contestId = id.substr(0, id.length - 1);
            let problemId = id.slice(-1)
            // console.log(cookie)
            if (!isNaN(problemId)) {
                contestId = id.substr(0, id.length - 2);
                problemId = id.slice(-2)
                console.log(contestId, problemId)
            }


            var config = {
                method: 'get',
                url: `https://codeforces.com/contest/${contestId}/problem/${problemId}`,
                headers: { 
                'authority': 'codeforces.com', 
                'pragma': 'no-cache', 
                'cache-control': 'no-cache', 
                'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"', 
                'sec-ch-ua-mobile': '?0', 
                'upgrade-insecure-requests': '1', 
                'dnt': '1', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', 
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
                'sec-fetch-site': 'same-origin', 
                'sec-fetch-mode': 'navigate', 
                'sec-fetch-dest': 'document', 
                'referer': 'https://codeforces.com', 
                'accept-language': 'en-IN,en;q=0.9', 
                'cookie': cookie
                }
            };

            let res = await axios(config);
            const root = parse(res.data);

            // console.log(res.data)
            let problemHTML = (root.querySelector('.problem-statement'));
            if (problemHTML === null || problemHTML === undefined) {
                resp
                    .status(404)
                    .send('invalid problem ID');
                return;
            }
            let sampleTestsHTML = root.querySelectorAll('.sample-test ');
            let sampleInputs = []
            let sampleOutputs = []
            for (let j in sampleTestsHTML) {
                let tc = (sampleTestsHTML[j].childNodes[1].childNodes[0].rawText)
                let tcHTML = parse(tc)
                let tcString = ""
                for (let i in tcHTML.childNodes) {
                    if (tcHTML.childNodes[i].rawText) {
                        tcString = tcString.concat(tcHTML.childNodes[i].rawText + " \n ");
                    }
                }
                if (j % 2 == 0) {
                    // input tc
                    sampleInputs.push(tcString);
                } else {
                    //expected o/p
                    sampleOutputs.push(tcString);
                }
            }
            // console.log(sampleInputs) console.log(sampleOutputs)

            resp
                .status(200)
                .send({'html': problemHTML.toString(), sampleInputs, sampleOutputs});
        } else {
            resp
                .status(200)
                .send('Please provide a valid problem ID')
        }

    }