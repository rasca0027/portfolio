import os

from flask import Flask
from flask import render_template

from settings import APP_STATIC


app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')
    


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/project/<int:project_id>')
def project():
    with open(os.path.join(APP_STATIC, 'data', 'test.txt')) as f:
        data = f.readline()
    print data
    return render_template('project.html')

