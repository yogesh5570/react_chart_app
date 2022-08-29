from flask import Flask, app, jsonify, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS
from flask_restful import Api, Resource
import os

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)

client = MongoClient("mongodb+srv://Dbp_user:dbp_877086@cluster0.tenfk.mongodb.net/GraphTimeData?retryWrites=true&w=majority")

db = client.GraphTimeData
graphData = db.graphData

class Graphs(Resource):
    def get(self):
        graphs = graphData.find({}, {"_id":0}).limit(50)
        doc = [doc["samples"] for doc in graphs]
        return doc

class Index(Resource):
    def get(self):
        return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

api = Api(app)
api.add_resource(Index, "/", endpoint="index")
api.add_resource(Graphs, "/graphs", endpoint="graphs")

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 5000))
