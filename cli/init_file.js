const fs = require("fs")
const path = require("path")

console.log("Création des fichiers de base")

if (!fs.existsSync(path.join(__dirname, "../.env"))) {
    fs.writeFileSync(path.join(__dirname, "../.env"), `
OWM_TOKEN=`)
}

if (!fs.existsSync(path.join(__dirname, "../export"))) {
	fs.mkdirSync(path.join(__dirname, "../export"))
}