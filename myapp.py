import os

from flask import Flask
from flask import render_template
from settings import APP_STATIC

import markdown


app = Flask(__name__)
TOTAL = 9


@app.route('/')
def hello_world():

    project_list = []
    for i in xrange(TOTAL):
        fpath = os.path.join(APP_STATIC, 'data', str(i + 1) + '.txt')
        with open(fpath, 'r') as f:
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
def project(project_id):
    fpath = os.path.join(APP_STATIC, 'data', str(project_id) + '.txt')
    with open(fpath, 'r') as f:
        title = f.readline()
        tag = f.readline()
        content = f.read()
    html = markdown.markdown(content)
    context = {
        'title': title,
        'content': html 
    }
    return render_template('project.html', context=context)


@app.route('/test')
def test():
    import markdown
    with open(os.path.join(APP_STATIC, 'data','1.txt')) as f:
        title = f.readline()
        tag = f.readline()
        content = f.read()
    html = markdown.markdown(content)
    context = {
        'title': title,
        'content': html 
    }
    print context
    return render_template('project.html', context=context)


@app.route('/whitestone')
def whitestone():
    return render_template('whitestone.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
