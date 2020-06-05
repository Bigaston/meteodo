const file_association = require("./file_association.json")
const { spawn } = require('child_process');
const fs = require("fs")
const path = require("path")
const axios = require("axios")
var rimraf = require('rimraf')

module.exports = {
	global_generation: () => {
		Object.keys(file_association.city).forEach(k => {
			if (fs.existsSync(path.join(__dirname, "../export/" + k))) {
				rimraf(path.join(__dirname, "../export/" + k), {}, () => {
					fs.mkdirSync(path.join(__dirname, "../export/" + k))
					module.exports.start_generation(k);
				})
			} else {
				module.exports.start_generation(k);

			}
		})		
	},
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

		var request = `https://api.openweathermap.org/data/2.5/onecall?lat=${file_association.city[ville].lat}&lon=${file_association.city[ville].lon}&appid=${process.env.OWM_TOKEN}&units=metric`;
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
			
			let weather_data = getWeatherData(res.data.hourly);

			tab_génération.push(file_association.static[4])
			tab_génération.push(file_association.weather[weather_data[0].weather[0].id])

			tab_génération.push(file_association.static[5])
			tab_génération.push(file_association.weather[weather_data[1].weather[0].id])

			tab_génération.push(file_association.static[6])
			tab_génération.push(file_association.weather[weather_data[2].weather[0].id])

			tab_génération.push(file_association.static[7])
			tab_génération.push(file_association.weather[weather_data[3].weather[0].id])

			tab_génération.push(file_association.static[8])
			tab_génération.push("number/" + Math.round(weather_data[0].temp) + ".mp3")
			tab_génération.push(file_association.degree);
			
			tab_génération.push(file_association.static[9])
			tab_génération.push("number/" + Math.round(weather_data[1].temp) + ".mp3")
			tab_génération.push(file_association.degree);

			tab_génération.push(file_association.static[10])
			tab_génération.push("number/" + Math.round(weather_data[2].temp) + ".mp3")
			tab_génération.push(file_association.degree);

			tab_génération.push(file_association.static[11])
			tab_génération.push("number/" + Math.round(weather_data[3].temp) + ".mp3")
			tab_génération.push(file_association.degree);

			tab_génération.push(file_association.static[12])

			module.exports.generate_audio(tab_génération, "./export/" + ville + "/audio.mp3")
		})
	},
	generate_audio: (tab, sortie, ville) => {
		var audio_file = "file './" + tab[0] + "'";

		tab.forEach(t => {
			if (t == tab[0]) return;

			audio_file = audio_file + "\nfile './" + t + "'";
		})

		fs.writeFileSync(path.join(__dirname, ("../audio/temp_" + ville + ".txt")), audio_file)

		var tab_ffmpeg = ["-y", "-f", "concat", "-safe", "0", "-i", "./audio/temp_" + ville + ".txt", sortie]

        var ol = spawn("ffmpeg", tab_ffmpeg)
        
        ol.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
      
        ol.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
      
        ol.on('close', function (code) { 
			fs.unlinkSync(path.join(__dirname, ("../audio/temp_" + ville + ".txt")), audio_file)

			console.log("Finit!")
		})
	}
}

function getWeatherData(hourly) {
	let current_day = new Date(1591422699000);
	let result = []
	
	hourly.forEach(h => {
		let date_h = new Date(h.dt * 1000);

		if (date_h.getDate() == current_day.getDate()) {
			if (date_h.getHours() == "8" || date_h.getHours() == "12" || date_h.getHours() == "18" || date_h.getHours() == "22") {
				result.push(h)
			}
		}
	})

	return result;
}