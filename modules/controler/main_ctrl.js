const fs = require("fs")
const path = require("path")
const file_association = require("../file_association.json")
const mustache = require("mustache")

module.exports = {
    city_index: (req, res) => {
        if (file_association.city[req.params.ville] != undefined) {
            var template = fs.readFileSync(path.join(__dirname, "../../web/city.mustache"), "utf8")

            var render_obj = {
                ville: req.params.ville,
                host: process.env.HOST,
            }

            res.setHeader("content-type", "text/html");
			res.send(mustache.render(template, render_obj))
        } else {
            res.sendFile(path.join(__dirname, "../../web/404.html"))
        }
    },
    city_feed: (req, res) => {
        if (file_association.city[req.params.ville] != undefined) {
            res.sendFile(path.join(__dirname, "../../export/" + req.params.ville + "/feed.xml"))
        } else {
            res.sendFile(path.join(__dirname, "../../web/404.html"))
        }
    },
    city_file: (req, res) => {
        if (file_association.city[req.params.ville] != undefined) {
            if (req.params.file == "feed_img.jpg" || req.params.file == "ep_img.jpg" || req.params.file == "audio.mp3") {
                res.sendFile(path.join(__dirname, "../../export/" + req.params.ville + "/" + req.params.file))
            }
        } else {
            res.status(404).send("File not found")
        }
    },
    index: (req, res) => {
        res.sendFile(path.join(__dirname, "../../web/index.html"))
    }
}