const file_association = require("./file_association.json")
const { spawn } = require('child_process');
const fs = require("fs")
const path = require("path")
const axios = require("axios")

module.exports = {
	start_generation: (ville) => {
		var tab_génération = [ file_association.static[0]];

		var maintenant = new Date();;

		// Jour de la semaine
		tab_génération.push("day/" + (maintenant.getDay()-1) + ".mp3");

		// Jour dans le mois
		if (maintenant.getDate() == 1) {
			tab_génération.push(file_association.first)
		} else {
			tab_génération.push("number/" + maintenant.getDate() + ".mp3");
		}

		// Le mois
		tab_génération.push("month/" + maintenant.getMonth() + ".mp3")

		// L'année
		tab_génération.push(file_association.year[maintenant.getFullYear() + ""])

		// Son a propos du levé du soleil
		tab_génération.push(file_association.static[1]);

		var request = `https://api.openweathermap.org/data/2.5/onecall?lat=${file_association.city[ville].lat}&lon=${file_association.city[ville].lon}&appid=${process.env.OWM_TOKEN}`;
		console.log(request)

		axios({
			method: "GET",
			url: request
		}).then(res => {
			var sunrise = new Date(res.data.current.sunrise * 1000);
			var sunset = new Date(res.data.current.sunset * 1000)

			tab_génération.push("hours/" + sunrise.getHours() + ".mp3")
			tab_génération.push("number/" + sunrise.getMinutes() + ".mp3")

			tab_génération.push(file_association.static[2])

			tab_génération.push("hours/" + sunset.getHours() + ".mp3")
			tab_génération.push("number/" + sunset.getMinutes() + ".mp3")

			tab_génération.push(file_association.static[3])
			tab_génération.push(file_association.city[ville].audio)
			


			module.exports.generate_audio(tab_génération, "./sortie.mp3")
		})

	},
	generate_audio: (tab, sortie) => {
		var audio_file = "file './" + tab[0] + "'";

		tab.forEach(t => {
			if (t == tab[0]) return;

			audio_file = audio_file + "\nfile './" + t + "'";
		})

		fs.writeFileSync(path.join(__dirname, ("../audio/temp.txt")), audio_file)

		var tab_ffmpeg = ["-y", "-f", "concat", "-safe", "0", "-i", "./audio/temp.txt", sortie]

        var ol = spawn("ffmpeg", tab_ffmpeg)
        
        ol.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
      
        ol.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
      
        ol.on('close', function (code) { 
			//fs.unlinkSync(path.join(__dirname, ("../audio/temp.txt")), audio_file)

			console.log("Finit!")
		})
	}
}