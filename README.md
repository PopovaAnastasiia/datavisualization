# Data Visualization of cities population with flask + d3
## Powered by MongoDB

Raw data was imported to MongoDB hosted on mLab.com. (imported with 
"mongoimport -h ds013664.mlab.com:13664 -d populationdatabase - population -u anastasiia -p qwerty1234 --file data.json"). 

Imported database was normalized to format needed with native Mongo aggregation method: 
"db.population.aggregate({$group:{_id:"$city", Population: {$sum: "$pop"}}}, {$out: "Updatedpopulation"}) ".
