import os

from flask import Flask
from flask import render_template

from settings import APP_STATIC


app = Flask(__name__)
TOTAL = 8


@app.route('/')
def hello_world():

    project_list = []
    for i in xrange(TOTAL):
        with open(os.path.join(APP_STATIC, 'data', str(i + 1) + '.txt')) as f:
            title = f.readline()
            tag = f.readline()
        project = {
            'title': title,
            'tag': tag
        }
        project_list.append(project)
    
    return render_template('index.html', project_list=project_list)
    


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/project/<int:project_id>')
def project():
    
    return render_template('about.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
