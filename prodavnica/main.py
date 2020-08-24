import datetime
import flask
from flask import Flask
from utils.db_connection import mysql
from flask import request
from flask import session

# Dobavljanje blueprint-ova.
# Svaki blueprint je objekat definisan u odvojenom modulu.
from blueprints.simple_login import simple_login
from blueprints.simple_registracija import simple_registracija
from blueprints.user_services import user_services

# Flask aplikacija kojoj je URL za staticke podatke podesen
# na korenski URL.
app = Flask(__name__, static_url_path="")

# Konfigurisanje sesije
# Secret key mora biti postavljen da bi se sesija koristila.
app.secret_key = "NEKI_RANDOM_STRING"

# Konfiguracija za povezivanje na bazu podataka.
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = ""
app.config["MYSQL_DATABASE_DB"] = "online_prodavnica"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)

# Svaki blueprint se mora registrovati pre upotrebe. 
app.register_blueprint(simple_login)
app.register_blueprint(simple_registracija)

# Prilikom registracije moguce je definisati URL prefix za blueprint.
# Ukoliko je URL prefix definisan onda se servisima pristupa preko
# /prefix/URL_servisa.

app.register_blueprint(user_services, url_prefix="/users")



#Jedna funkcija moze se mapirati na vise URL-ova.
@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    '''Funkcija koja vrsi obradu zahteva.
    
    Svi zahtevi koji pristignu na URL-ove / /index i /index.html bice obradjeni ovom f-jom.
    Rezultat obrade ove funkcije je odgovor koji sadrzi podatke iscitane
    iz datoteke index.html.
    Pristupanje datom URL-u iz browsera za rezultat ce imati prikaz
    stranice izgenerisane na osnovu index.html sablona.
    '''

    return app.send_static_file("index.html")



@app.route("/api/proizvodi", methods=["GET"])
def dobaviProizvode():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop ")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)

@app.route("/api/proizvodi/<int:id_proizvoda>")
def dobaviproizvod(id_proizvoda, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop WHERE id=%s", (id_proizvoda,))
    proizvod = cursor.fetchone()
    if proizvod is not None:
        return flask.jsonify(proizvod) 
    else:
        return "", 404
@app.route("/api/admin", methods=["GET"])
def dobaviProizvodeA():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop ")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)

@app.route("/api/admin/<int:id_proizvoda>", methods=["DELETE"])
def ukloni_proizvod(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM shop WHERE id=%s", (id_proizvoda,))
    db.commit()
    return "", 204

@app.route("/api/proizvodi", methods=["POST"])
def dodaj_proizvod():
    db = mysql.get_db() 
    cursor = db.cursor() 

    cursor.execute("INSERT INTO shop(naziv, opis, cena, slika) VALUES(%(naziv)s, %(opis)s, %(cena)s, %(slika)s)", flask.request.json)
  
    db.commit() 
    return flask.jsonify(flask.request.json), 201

@app.route("/api/proizvodi/<int:id_proizvoda>", methods=["PUT"])
def izmeni_proizvod(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    data = flask.request.json
    data["id"] = id_proizvoda 
    cursor.execute("UPDATE shop SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, slika=%(slika)s WHERE id=%(id)s", data)
    db.commit()
    return "", 200
# @app.route("/api/korpa/<int:id>", methods=["POST"])
# def shop_buy():
#     db = mysql.get_db() 
#     cursor = db.cursor() 
#     cursor.execute("INSERT INTO korpa( shop_id, kolicina,cena,user_id) VALUES( %(shop_id)s,%(kolicina)s,%(cena)s,%(user_id)s)", flask.request.json)
#     db.commit()
#     return flask.jsonify(flask.request.json), 201



@app.route("/api/korpa/", methods=["POST"])
def shop_buy(id_proizvoda):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korpa SET shop_id=%(shop_id)s, kolicina=%(kolicina)s, cena=%(cena)s, user_id=%(user_id)s, user_id=%(user_id)s WHERE id=%(id)s", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201
    
@app.route("/api/korpa", methods=["GET"])
def dobaviProizvodeKorpe():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa ")
    korpa = cursor.fetchall()
    return flask.jsonify(korpa)

app.run( threaded=True)