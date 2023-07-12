const keyword_extractor = require("keyword-extractor");
var fs = require("fs")
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
http = require('http')
socketIO = require('socket.io')
const app = express();
app.use(
    cors()
);

app.use(express.text())
app.use(logger('dev'));
app.use(express.json())
server = http.Server(app);
server.listen(5000);
const io = socketIO(server, {
    cors: {
        origin: "*", //your own :port or a "*" for all origins
    }
});
let all_articles = JSON.parse(fs.readFileSync("article_data.json"))
console.log(all_articles)
io.on('connection', function (socket) {
    socket.on('article', () => {
        socket.emit('article_response', JSON.stringify(all_articles))
    })
    socket.on('add', (data) => {
        let extraction_result =
            keyword_extractor.extract(data.title, {
                language: "english",
                remove_digits: true,
                return_changed_case: false,
                remove_duplicates: true

            });
        let extraction_dict = {}
        for (let i = 0; i < extraction_result.length; i++) {
            extraction_dict[extraction_result[i]] = 0
        }
        for (let i = 0; i < data.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ').length; i++) {
            let word = data.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ')[i]
            if (Object.keys(extraction_dict).includes(word)) {
                extraction_dict[word] += 1
            }
        }
        let top_tags = Object.entries(extraction_dict).sort(([, a], [, b]) => b - a).slice(0, 5).map(([n]) => n)
        let uuid = Math.random()*1000000000
        all_articles[uuid] = data
        all_articles[uuid].tags = top_tags
        console.log(all_articles)
        fs.writeFileSync("article_data.json", JSON.stringify(all_articles));
        io.sockets.emit("article_response", JSON.stringify(all_articles))
        // io.sockets.emit("image_result", `data:${mimeType};base64,${b64}`)

    })
    socket.on('image', (data) => {
        const b64 = Buffer.from(data).toString('base64');
        const mimeType = 'image/png'; // e.g., image/png
    })
})