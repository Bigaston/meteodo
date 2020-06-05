# Liste des fichiers audio à enregistrer

## Texte de base
Bonjour, aujourd'hui nous somme le [Jour] [numéro] [mois] [année]. Le soleil se lève à [heure] [minute], et se couche à [heure] [minute]. Voici l'heure de votre bulletin météo quotidien dans la charmante ville de [ville] !

Ce matin, la météo sera [météo]. Quand à ce midi la météo sera [météo]. En soirée, vers 18h, le temps sera [météo]. Et cette nuit, le ciel affichera [météo].

Au niveau des températures, ce matin vous pourrez vous attendre à environ [degré] °C. Pour cette après midi, il fera [degré] °C. Ce soir, préparez vous à plus ou moins [degré] °C. Et cette nuit si vous sortez dehors la température sera de [degré] °C.

Voilà! C'est tout pour ce bulletin météo automatique ! Rendez vous demain pour un nouveau brieffing météorologique. 

Météo affichée : 8h, 12h, 18h, 22h

## Liste des trucs à enregistrer
jour :
- Lundi
- Mardi
- Mercredi
- Jeudi
- Vendredi
- Samedi
- Dimanche

numéro (-20 - 0 1er, puis 2 à 100)
mois
année

heure (minuit 1 - 11 midi 13 - 23)

ville

https://openweathermap.org/weather-conditions#Icon-list
météo :
- orageuse (200-211 230 - 231) 					thunderstorm
- très orageuse (212) 							heavy_thunderstorm
- faite d'orages intermitants (221) 			ragged_thunderstorm
- une bruine (300-301)							drizzle
- une forte bruine (302)						heavy_drizzle
- une légère pluie fine (310)					light_drizzle
- une pluie fine (311)							drizzle_rain
- une forte pluie fine (312)					heavy_drizzle_rain
- une forte averse (314 - 321 - 522)			heavy_shower_rain
- une légère pluie (500)						light_rain
- une pluie modérée (501)						moderate_rain
- une forte pluie (502)							heavy_rain
- une très forte pluie (503)					very_heavy_rain
- une pluie extrème (504)						extreme_rain
- une pluie givrante (511)						freezing_rain
- une légère averse (520)						light_shower_rain
- une averse (521)								shower_rain
- des averses par intermitence (531)			ragged_shower_rain
- une légère neige (600)						light_snow
- de la neige (601)								snow
- une forte neige (602)							heavy_snow
- de la neige fondue (611)						sleet
- de la neige fondue couplée à une averse (612 - 613) shower_sleet
- une légère pluie avec de la neige (615)		light_rain_snow		
- de la pluie avec de la neige (616)			rain_snow
- une légère averse avec de la neige (620)		light_shower_snow
- une averse avec de la neige (621)				shower_snow
- une forte averse avec de la neige (622)		heavy_shower_snow

- un brouillard (701 - 711 - 741)				fog
- de la brume (721)								haze
- des tourbillions de poussières ou de sable (731 - 751 - 761) sand
- composée de particule volcaniques (762)		volcanic_ash
- des bourrasques (771)							squalls
- des tornades (781)							tornado

- dégagée (800)									clear
- composée de quelques nuages (801)				few_clouds
- faite de nuages éparses (802)					scattered_clouds
- plutôt nuageuse (803)							broken_clouds
- très nuageuse (804)							overcast_clouds

## Idée pof amélioration
- Ce matin
- (et) Jusqu'à midi
- Ce midi 
- (et) Jusqu'à ce soir
- Ce soir 
- (et) Jusqu'à cette nuit
- Cette nuit

Tu coupes le (et) si besoin, genre si c'est le même temps du matin jusqu'au soir tu mets juste "jusqu'à ce soir",   mais par exemple si c'est de midi à la nuit : ce midi et jusqu'à cette nuit.