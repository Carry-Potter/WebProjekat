import flask
import json
import os
import fnmatch
from flask import request
from flask import Blueprint
from utils.db_connection import mysql


simple_registracija = Blueprint("simple_registracija", __name__)


@simple_registracija.route("/registracija", methods=['POST'])
def registracija():
    try:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO user(username,password,name,surname) VALUES(%(username)s, %(password)s, %(name)s, %(surname)s)",flask.request.json)
        db.commit()
    finally:
        db.close()
        
    return "", 201

@simple_registracija.route("/registracija", methods=["GET"])
def uzimanjeReg():
    cr = mysql.get_db().cursor()
    cr.execute("SELECT * FROM user" )
    registovani = cr.fetchall()
   
    return flask.json.jsonify(registovani)