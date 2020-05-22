import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql

shop = Blueprint("shop", __name__)

@shop.route("/", methods=["GET"])
def dobaviProizvode():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM shop ")
    proizvodi = cursor.fetchall()
    return flask.jsonify(proizvodi)

@shop.route("proizvod/<int:id>", methods=["GET"])
def idproizvodi(id):
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

@shop.route("/", methods=["POST"])
def shop_buy():
    db = mysql.get_db() 
    cursor = db.cursor() 
    cursor.execute("INSERT INTO korpa( shop_id) VALUES( %(id)s)", flask.request.json)
    db.commit()
    return flask.jsonify(flask.request.json), 201


@shop.route("/korpa", methods=["GET"])
def dobaviProizvodeKorpe():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa ")
    korpa = cursor.fetchall()
    return flask.jsonify(korpa)