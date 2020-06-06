require("dotenv").config()
const express = require("express");
const m = require("./modules")

m.generation.global_generation();
setInterval(m.generation.global_generation, 1000 * 60 * 5);

var app = express()

app.use("/static", express.static('./web/static'));

app.get("/:ville", m.main_ctrl.city_index);
app.get("/:ville/rss", m.main_ctrl.city_feed);
app.get("/:ville/:file", m.main_ctrl.city_file);

app.get("/", m.main_ctrl.index);

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))