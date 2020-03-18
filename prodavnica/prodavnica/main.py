import flask
from flask import Flask
import pymysql
from flaskext.mysql import MySQL
from flask import jsonify

mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)
app = Flask(__name__, static_url_path="")


app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = ""
app.config["MYSQL_DATABASE_DB"] = "prodavnica"


mysql.init_app(app)


@app.route("/")
@app.route("/index")
def index_page():
    return app.send_static_file("index.html")


@app.route("/proizvodi", methods=["GET"])
def dobavi_proizvodi():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvodi")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)
    
@app.route("/proizvod/<int:id>")
def proizvod (id, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvodi  WHERE id=%s", (id,))
    proizvod = cursor.fetchall()
    return flask.jsonify(proizvod)

@app.route("/korpa", methods=["POST"])
def dodajproizvod(id):
    db = mysql.get_db() 
    cursor = db.cursor() 
    cursor.execute("INSERT INTO korpa(id, naziv, opis, cena,slika) VALUES(%(id)s,  %(naziv)s,  %(opis)s ,  %(cena)s,  %(slika)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201


@app.route("/korpa", methods=["GET"])
def dobavi_korpa():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)

if __name__ == "__main__":
    app.run( threaded=True)
