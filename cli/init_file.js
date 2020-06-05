const fs = require("fs")
const path = require("path")

console.log("Création des fichiers de base")

if (!fs.existsSync(path.join(__dirname, "../.env"))) {
    fs.writeFileSync(path.join(__dirname, "../.env"), `
OWM_TOKEN=
HOST=localhost
CONTACT_EMAIL=`)
}

if (!fs.existsSync(path.join(__dirname, "../export"))) {
	fs.mkdirSync(path.join(__dirname, "../export"))
}