require("dotenv").config()
const file_association = require("../modules/file_association.json")
const fs = require("fs")
const path = require("path")
const img = require("../modules/img")
const generation = require("../modules/generation")

Object.keys(file_association.city).forEach(k => {
    if (!fs.existsSync(path.join(__dirname, "../export/" + k))) {
        fs.mkdirSync(path.join(__dirname, "../export/" + k))

        img.img_feed(k).then(() => {
            generation.start_generation(k);
        });
    } else {
        if (!fs.existsSync(path.join(__dirname, "../export/" + k + "/feed_img.jpg"))) {
            img.img_feed(k).then(() => {
                generation.start_generation(k);

            });
        } else {
            generation.start_generation(k);
        }
    }
})