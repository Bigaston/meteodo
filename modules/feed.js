var RSS = require('rss');
const fs = require("fs")

module.exports = {
	generate_feed: (ville, date, duration, size, sortie) => {
		var feed = new RSS({
			title: "Météo de " + ville,
			description: "Un bulletin météo quotidien généré automatiquement par météodo. Retrouvez votre bulletin tous les matins à 5H!",
			generator: "Météodo",
			feed_url: process.env.HOST + "/" + ville + "/rss",
			site_url: process.env.HOST + "/" + ville,
			site_url: process.env.HOST + "/" + ville + "/feed_img.jpg",
			copyright: "Météodo",
			language: "fr",
			custom_namespaces: {
				'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
				"google": "http://www.google.com/schemas/play-podcasts/1.0"
			},
			custom_elements: [
				{"itunes:author" : "Météodo"},
				{"itunes:owner" : [
					{"itunes:email" : process.env.CONTACT_EMAIL}
				]},
				{"itunes:category" : [
					{_attr: {
						text: "News"
					}},
					{'itunes:category': {
						_attr: {
							text: "Daily News"
						}
					}}
				]},
				{"itunes:summary": "Un bulletin météo quotidien généré automatiquement par météodo. Retrouvez votre bulletin tous les matins à 5H!"},
				{"itunes:type" : "episodic"},
				{"itunes:image": [
					{_attr: {
						href: process.env.HOST + "/" + ville + "/feed_img.jpg"
					}}
				]},
				{"itunes:explicit" : "no"}
			],
			item: []
		})

		feed.item({
			title: "Météo de " + ville + " du " + date,
			description: "La météo du jours à " + ville + " pour la journée du " + date,
			url: process.env.HOST + "/" + ville,
			guid: ville.toLowerCase() + "_" + date,
			author: "Météodo",
			date: Date.now(),
			custom_elements: [
				{'itunes:author': "Météodo"},
				{'itunes:subtitle': "La météo du jours à " + ville + " pour la journée du " + date},
				{'itunes:image': {
				_attr: {
					href: process.env.HOST + "/" + ville + "/ep_img.jpg?date=" + date
				}
				}},
				{'itunes:duration': duration},
				{"itunes:episodeType": "full"},
				{"enclosure" : {
					_attr: {
						url: process.env.HOST + "/" + ville + "/audio.mp3?date=" + date,
						type: "audio/mpeg",
						length: size
					}
				}}
			]
		})

		fs.writeFileSync(sortie, feed.xml({indent: true}))
	}
}