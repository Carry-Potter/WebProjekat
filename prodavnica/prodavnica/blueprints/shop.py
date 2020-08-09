import datetime
import flask

from flask import Blueprint
from utils.db_connection import mysql

shop = Blueprint("shop", __name__)

@shop.route("/", methods=["GET"])
def dobaviProizvode():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop ")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)

@shop.route("/proizvod/<int:id>")
def dobaviproizvod(id, methods=["GET"]):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop  WHERE id=%s", (id,))
    proizvod = cursor.fetchone()
    return flask.jsonify(proizvod)

@shop.route("/<int:id>", methods=["DELETE"])
def shop_delite(id):
    db = mysql.get_db()
    cr = db.cursor()
    cr.execute("DELETE FROM shop WHERE id=%s", (id, ))
    db.commit()
    return "", 204

@shop.route("api/korpa/<int:id>", methods=["POST"])
def shop_buy():
    db = mysql.get_db() 
    cursor = db.cursor() 
    cursor.execute("INSERT INTO korpa( shop_id, kolicina,cena,user_id) VALUES( %(shop_id)s,%(kolicina)s,%(cena)s,%(user_id)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201


@shop.route("api/korpa", methods=["GET"])
def dobaviProizvodeKorpe():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa ")
    korpa = cursor.fetchall()
    return flask.jsonify(korpa)