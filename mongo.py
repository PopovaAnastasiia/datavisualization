from flask import Flask, jsonify, render_template
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'populationdatabase'
app.config['MONGO_URI'] = 'mongodb://anastasiia:qwerty1234@ds013664.mlab.com:13664/populationdatabase'

mongo = PyMongo(app)
# To update data in db I use db.population.aggregate({$group:{id:{"city": "$city", "state": "$state"},
#                                                   Population: {$sum: "$pop"}}},
#                                                   {$out: "Updatedpopulation"})


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/population', methods=['GET'])
def population():
    dataset = mongo.db.Updatedpopulation1

    output = []

    for item in dataset.find().sort('Population', -1):
        output.append({'city': item['_id'], 'pop': item['Population']})

    return jsonify({'result': output[:19]})

if __name__ == '__main__':
    app.run(debug=True)
