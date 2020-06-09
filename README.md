# meteodo
![GitHub](https://img.shields.io/github/license/Bigaston/meteodo) ![GitHub stars](https://img.shields.io/github/stars/Bigaston/meteodo?style=social) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fmeteodo.bigaston.dev)  
Génération automatique de bulletin météorologique sous forme de podcast  

## C'est quoi Météodo?
Météodo c'est un nouveau projet sur lequel j'ai travaillé la semaine dernière et qui part du principe "Et si on générait automatiquement un bulletin météo audio?" C'est donc ce que fait ce projet! Tous les matins à 5h vous pouvez retrouver un nouveau bulletin météo sur un flux RSS dédié à chaque ville, et qui vous informera sur la météo de la journée.

## Pourquoi avoir fait ça ?
Pour l'expérimentation entre autre! Je suis passioné de développement et je voulais depuis longtemps essayer de faire un podcast qui se génère tout seul. Et vu que la météo, à part quelques éléments, rien ne change d'un jour à l'autre, c'était la solution parfaite.

## Comment ça fonctionne ?
Le fonctionnement est très simple au final. J'ai commencé par enregistrer pleins de petites parties audio, en disant tous les jours de la semaine, tous les mois, tous les nombres de -30 à 60, toutes les météo possible... Ensuite j'ai décidé de travailler avec le site [OpenWeatherMap](https://openweathermap.org/), puisqu'il propose une api gratuite de récupération de la météo.

Donc tous les matins, mon programme va aller récupérer sur OpenWeatherMap la météo du jour pour toutes les villes que je souhaite, avec aussi l'heure de lever et de coucher du Soleil. Après ça, il va automatiquement choisir les fichiers audio qu'il doit assembler, en fonction de la météo du coup, et des différentes températures, des jours de la semaines, etc. Et enfin, la magie FFMPEG apparait, et va venir mettre bout à bout tout ces fichiers audio.

J'ai aussi ajouté un petit système annexe qui permet grâce à Puppeteer de générer aussi l'image du flux RSS et l'image de l'épisode (donc du jour), et un autre système qui va générer un flux RSS à partir de toutes les informations.

Et voilà, j'ai plus qu'à mettre en place un serveur (Express comme d'habitude), qui va être là pour faire la distribution des pages et des fichiers.

Le programme est pas très complexe en lui même. Il y a encore beaucoup d'adaptations à faire, pour que la voix sonne plus juste, que le bulletin soit mieux fichu, mais c'est déjà un bel avancement.

## Comment l'installer/y accéder ?
Soit vous allez sur [meteodo.bigaston.me](https://meteodo.bigaston.me).
Soit vous clonez ce répertoire, vous installez les modules avec `npm install`, vous modifiez les informations dans `.env`.
```
OWM_TOKEN=votre_token_openweathermap
HOST=adresse du site
CONTACT_EMAIL=email de contact du flux RSS
PORT=4378
```

Ensuite vous pouvez soit:
- Générer les fichiers pour le jour même avec `npm run today` (doit être éxecuté entre 00H et 05H)
- Générer les fichiers pour le lendemain avec `npm run tomorrow`
- Lancer le projet avec `node meteodo.js`

## Conclusion
Comme d'habitude, si vous avez des retours ou des questions, n'hésitez pas à venir me suivre sur Twitter [@Bigaston](https://twitter.com/Bigaston)
Ou si vous voulez me soutenir, vous pouvez me faire un don sur [uTip.io/Bigaston](https://utip.io/Bigaston)
