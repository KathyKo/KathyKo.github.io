---
title: "Flask Usage Guide"
date: 2026-03-23
description: A beginner-friendly guide to Flask, covering routes, request handling, JSON APIs, database integration, and connecting to external services like S3, Bedrock, and OpenAI. Written from scratch while learning on the job.
tags:
  - tech-notes
draft: false
hideTOC: false
---

> Notes written while learning Flask from a tech intern handover doc. The codebase uses Flask to build lightweight backends, API endpoints, and ML/AI integrations with services like boto3, S3, and Bedrock.

---

## Table of Contents

1. [What is Flask?](#1-what-is-flask)
2. [Setting Up Your First Flask App](#2-setting-up-your-first-flask-app)
3. [Routes](#3-routes)
4. [Handling Requests](#4-handling-requests)
5. [Returning Responses](#5-returning-responses)
6. [Request and Response Lifecycle](#6-request-and-response-lifecycle)
7. [Blueprints: Organizing Your App](#7-blueprints-organizing-your-app)
8. [Middleware and Hooks](#8-middleware-and-hooks)
9. [Error Handling](#9-error-handling)
10. [Database Integration](#10-database-integration)
11. [Connecting to AWS S3](#11-connecting-to-aws-s3)
12. [Connecting to AWS Bedrock](#12-connecting-to-aws-bedrock)
13. [Integrating OpenAI](#13-integrating-openai)
14. [Working with DeepFace](#14-working-with-deepface)
15. [Best Practices and Common Mistakes](#15-best-practices-and-common-mistakes)

---

## 1. What is Flask?

Flask is a **minimalist Python web framework** for building web applications and APIs. It was created by Armin Ronacher and is often described as a "micro-framework" because it gives you the essentials without forcing a specific project structure or bundling things you might not need.

Compared to Django (Python's other major web framework), Flask is:

| | Flask | Django |
|--|-------|--------|
| Size | Lightweight, minimal | Full-featured, opinionated |
| Structure | You decide | Enforced conventions |
| Best for | APIs, microservices, ML backends | Full web apps with admin panels |
| Learning curve | Gentle | Steeper |

In this codebase, Flask is used to build:
- Backend API endpoints
- Quick backends for ML/AI workflows
- Integrations with AWS services (S3, Bedrock) and external APIs (OpenAI, DeepFace)

---

## 2. Setting Up Your First Flask App

### Installation

```bash
pip install flask
```

For a real project, always use a virtual environment:

```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows

pip install flask
pip freeze > requirements.txt # save dependencies
```

### The simplest Flask app

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, world!'

if __name__ == '__main__':
    app.run(debug=True)
```

Run it:

```bash
python app.py
# or
flask run
```

Open your browser to `http://localhost:5000` and you will see "Hello, world!".

### Recommended project structure

For anything beyond a single file, organize like this:

```
my-app/
|--  app/
|   |--  __init__.py         # app factory, creates the Flask instance
|   |--  routes/
|   |   |--  __init__.py
|   |   |--  api.py          # API route definitions
|   |--  services/           # business logic
|   |   |--  s3_service.py
|   |   |--  bedrock_service.py
|   |--  models/             # database models
|--  config.py               # configuration (reads from .env)
|--  requirements.txt        # dependencies
|--  .env                    # secrets (never commit this)
|--  run.py                  # entry point
```

### App factory pattern

Rather than creating the app globally, use a factory function. This is the standard pattern for anything beyond a simple script:

```python
# app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    from app.routes.api import api_bp
    app.register_blueprint(api_bp)

    return app
```

```python
# run.py
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
```

---

## 3. Routes

Routes are the foundation of a Flask app. A route maps a URL to a Python function. When a request comes in, Flask looks at the URL and calls the matching function.

### Basic routes

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Home page'

@app.route('/about')
def about():
    return 'About page'
```

The `@app.route('/path')` decorator is what registers the function as a handler for that URL.

### HTTP methods

By default, a route only accepts GET requests. Specify other methods explicitly:

```python
from flask import request

@app.route('/messages', methods=['GET'])
def get_messages():
    return 'All messages'

@app.route('/messages', methods=['POST'])
def create_message():
    return 'Created message', 201

# Accept multiple methods on one route
@app.route('/messages/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def message(id):
    if request.method == 'GET':
        return f'Get message {id}'
    elif request.method == 'PUT':
        return f'Update message {id}'
    elif request.method == 'DELETE':
        return f'Delete message {id}'
```

### Dynamic URL parameters

Capture parts of the URL as variables:

```python
# /users/42  ->  user_id = 42
@app.route('/users/<int:user_id>')
def get_user(user_id):
    return f'User {user_id}'

# /posts/my-first-post  ->  slug = 'my-first-post'
@app.route('/posts/<string:slug>')
def get_post(slug):
    return f'Post: {slug}'
```

Type converters for URL parameters:

| Converter | Example | Matches |
|-----------|---------|---------|
| `string` | `<string:name>` | Any text without a slash (default) |
| `int` | `<int:id>` | Positive integers |
| `float` | `<float:value>` | Positive floating point numbers |
| `path` | `<path:filename>` | Text including slashes |

### Viewing all registered routes

```bash
flask routes
```

---

## 4. Handling Requests

Flask provides a `request` object that gives you everything about the incoming HTTP request.

```python
from flask import request
```

### Reading query parameters

Query parameters appear after the `?` in a URL, like `/search?q=hello&page=2`.

```python
@app.route('/search')
def search():
    query = request.args.get('q', '')          # default '' if not provided
    page  = request.args.get('page', 1, type=int)  # cast to int
    return f'Searching for "{query}", page {page}'
```

### Reading JSON body

For API endpoints receiving JSON data:

```python
@app.route('/api/chat', methods=['POST'])
def chat():
    data    = request.get_json()       # parse JSON body
    message = data.get('message', '')  # safely get field
    user_id = data.get('user_id')

    if not message:
        return {'error': 'message is required'}, 400

    return {'reply': f'You said: {message}'}
```

### Reading form data

For HTML form submissions:

```python
@app.route('/contact', methods=['POST'])
def contact():
    name  = request.form.get('name')
    email = request.form.get('email')
    return f'Received from {name} ({email})'
```

### Reading uploaded files

```python
@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400

    file = request.files['file']

    if file.filename == '':
        return {'error': 'No file selected'}, 400

    file.save(f'uploads/{file.filename}')
    return {'message': 'File uploaded successfully'}
```

### Request object reference

```python
request.method          # 'GET', 'POST', 'PUT', etc.
request.args            # query string parameters (ImmutableMultiDict)
request.form            # form data
request.json            # parsed JSON body (alias for get_json())
request.get_json()      # parse JSON body (safer, handles errors)
request.files           # uploaded files
request.headers         # request headers
request.headers.get('Authorization')  # specific header
request.remote_addr     # client IP address
request.url             # full URL
request.path            # URL path only (e.g. '/api/chat')
```

---

## 5. Returning Responses

### Plain text

```python
@app.route('/')
def home():
    return 'Hello, world!'
```

### JSON responses

The cleanest way to return JSON in modern Flask (3.x):

```python
@app.route('/api/status')
def status():
    return {'status': 'ok', 'version': '1.0'}  # Flask auto-converts dicts to JSON
```

Or use `jsonify` explicitly:

```python
from flask import jsonify

@app.route('/api/users')
def get_users():
    users = [{'id': 1, 'name': 'Kathy'}, {'id': 2, 'name': 'Alex'}]
    return jsonify(users)
```

### Setting status codes

By default Flask returns 200. Return a tuple to set the status code:

```python
@app.route('/api/users', methods=['POST'])
def create_user():
    return {'message': 'User created'}, 201   # 201 Created

@app.route('/api/users/<int:id>')
def get_user(id):
    user = find_user(id)
    if not user:
        return {'error': 'User not found'}, 404  # 404 Not Found
    return user
```

Common HTTP status codes:

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST that created a resource |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Missing or invalid input |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Logged in but no permission |
| 404 | Not Found | Resource does not exist |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Internal Server Error | Unhandled exception on the server |

### Setting response headers

```python
from flask import make_response

@app.route('/api/data')
def data():
    response = make_response({'data': [1, 2, 3]})
    response.headers['X-Custom-Header'] = 'my-value'
    response.headers['Cache-Control'] = 'no-cache'
    return response
```

---

## 6. Request and Response Lifecycle

Understanding the full flow helps you debug and structure your app correctly.

```
Client sends HTTP request
         |
    Flask receives it
         |
    Before-request hooks run (e.g. auth check, logging)
         |
    Router matches URL to a route function
         |
    Route function runs
      |-- reads request data
      |-- calls services / models
      |-- calls external APIs
      |-- returns a response
         |
    After-request hooks run (e.g. add CORS headers)
         |
    Response sent back to client
```

---

## 7. Blueprints: Organizing Your App

As your app grows, putting all routes in one file becomes messy. **Blueprints** let you split routes into separate modules.

```python
# app/routes/api.py
from flask import Blueprint, request, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    return jsonify({'reply': 'Hello!'})

@api_bp.route('/health')
def health():
    return jsonify({'status': 'ok'})
```

Register the blueprint in the app factory:

```python
# app/__init__.py
from flask import Flask
from app.routes.api import api_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api_bp)
    return app
```

Now all routes in `api_bp` are accessible at `/api/chat`, `/api/health`, etc.

---

## 8. Middleware and Hooks

Flask provides hooks to run code before or after every request, without modifying each route.

### Before request

Runs before every request hits a route. Useful for authentication checks, logging, or loading the current user:

```python
@app.before_request
def check_auth():
    token = request.headers.get('Authorization')
    if request.path.startswith('/api/') and not token:
        return {'error': 'Unauthorized'}, 401
```

### After request

Runs after every request. Useful for adding headers (like CORS):

```python
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response
```

### Teardown

Runs at the end of every request, even if an exception was raised. Useful for closing database connections:

```python
@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()
```

---

## 9. Error Handling

Register custom handlers for specific HTTP error codes so your API always returns consistent JSON errors instead of HTML error pages:

```python
@app.errorhandler(404)
def not_found(error):
    return {'error': 'Resource not found'}, 404

@app.errorhandler(400)
def bad_request(error):
    return {'error': 'Bad request'}, 400

@app.errorhandler(500)
def internal_error(error):
    return {'error': 'Internal server error'}, 500

# Catch all unhandled exceptions
@app.errorhandler(Exception)
def handle_exception(error):
    app.logger.error(f'Unhandled exception: {error}')
    return {'error': 'Something went wrong'}, 500
```

### Using abort

Use `abort()` inside a route to immediately stop and return an error:

```python
from flask import abort

@app.route('/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(404)   # triggers the 404 error handler
    return user.to_dict()
```

---

## 10. Database Integration

Flask does not include a built-in ORM, but **Flask-SQLAlchemy** is the standard choice.

```bash
pip install flask-sqlalchemy
```

### Setup

```python
# config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

```python
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    return app
```

### Defining models

```python
# app/models/message.py
from app import db
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    id         = db.Column(db.Integer, primary_key=True)
    from_      = db.Column(db.String(50), nullable=False)
    body       = db.Column(db.Text, nullable=False)
    status     = db.Column(db.String(20), default='received')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':         self.id,
            'from':       self.from_,
            'body':       self.body,
            'status':     self.status,
            'created_at': self.created_at.isoformat(),
        }
```

### CRUD operations

```python
# Create
new_message = Message(from_='+6591234567', body='Hello')
db.session.add(new_message)
db.session.commit()

# Read
message  = Message.query.get(1)                          # by primary key
messages = Message.query.all()                           # all records
messages = Message.query.filter_by(status='received').all()  # filtered
latest   = Message.query.order_by(Message.created_at.desc()).first()

# Update
message.status = 'processed'
db.session.commit()

# Delete
db.session.delete(message)
db.session.commit()
```

### Initialize the database

```bash
flask shell
>>> from app import db
>>> db.create_all()
```

---

## 11. Connecting to AWS S3

Use **boto3** (AWS's Python SDK) to upload, download, and manage files in S3.

```bash
pip install boto3
```

### Setup

Store credentials in `.env`, never in code:

```bash
# .env
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-1
S3_BUCKET_NAME=my-app-bucket
```

### S3 Service class

```python
# app/services/s3_service.py
import boto3
import os
from botocore.exceptions import ClientError

class S3Service:
    def __init__(self):
        self.client = boto3.client(
            's3',
            region_name=os.environ.get('AWS_REGION'),
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        )
        self.bucket = os.environ.get('S3_BUCKET_NAME')

    def upload_file(self, file_obj, key: str, content_type: str = 'application/octet-stream') -> str:
        """Upload a file object to S3. Returns the public URL."""
        try:
            self.client.upload_fileobj(
                file_obj,
                self.bucket,
                key,
                ExtraArgs={'ContentType': content_type}
            )
            return f'https://{self.bucket}.s3.amazonaws.com/{key}'
        except ClientError as e:
            raise Exception(f'S3 upload failed: {e}')

    def download_file(self, key: str, local_path: str) -> None:
        """Download a file from S3 to a local path."""
        try:
            self.client.download_file(self.bucket, key, local_path)
        except ClientError as e:
            raise Exception(f'S3 download failed: {e}')

    def get_presigned_url(self, key: str, expiry_seconds: int = 3600) -> str:
        """Generate a temporary signed URL for a private S3 object."""
        return self.client.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket, 'Key': key},
            ExpiresIn=expiry_seconds
        )

    def delete_file(self, key: str) -> None:
        """Delete a file from S3."""
        self.client.delete_object(Bucket=self.bucket, Key=key)
```

### Using it in a route

```python
from flask import Blueprint, request, jsonify
from app.services.s3_service import S3Service

api_bp = Blueprint('api', __name__, url_prefix='/api')
s3 = S3Service()

@api_bp.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400

    file = request.files['file']
    key  = f'uploads/{file.filename}'
    url  = s3.upload_file(file, key, file.content_type)

    return {'url': url}, 201

@api_bp.route('/files/<path:key>/url')
def get_file_url(key):
    url = s3.get_presigned_url(key)
    return {'url': url}
```

---

## 12. Connecting to AWS Bedrock

AWS Bedrock gives you access to foundation models (like Claude, Llama, Titan) via API. Use boto3's Bedrock client.

```bash
pip install boto3
```

### Bedrock Service class

```python
# app/services/bedrock_service.py
import boto3
import json
import os

class BedrockService:
    def __init__(self):
        self.client = boto3.client(
            'bedrock-runtime',
            region_name=os.environ.get('AWS_REGION', 'us-east-1'),
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        )

    def invoke_claude(self, prompt: str, max_tokens: int = 1000) -> str:
        """Call Claude via Bedrock and return the text response."""
        body = {
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': max_tokens,
            'messages': [
                {'role': 'user', 'content': prompt}
            ]
        }

        response = self.client.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps(body),
            contentType='application/json',
            accept='application/json',
        )

        result = json.loads(response['body'].read())
        return result['content'][0]['text']

    def invoke_with_system_prompt(self, system: str, user_message: str) -> str:
        """Call Claude with a system prompt for more controlled responses."""
        body = {
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 1000,
            'system': system,
            'messages': [
                {'role': 'user', 'content': user_message}
            ]
        }

        response = self.client.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps(body),
            contentType='application/json',
            accept='application/json',
        )

        result = json.loads(response['body'].read())
        return result['content'][0]['text']
```

### Using it in a route

```python
from app.services.bedrock_service import BedrockService

bedrock = BedrockService()

@api_bp.route('/ai/chat', methods=['POST'])
def ai_chat():
    data    = request.get_json()
    message = data.get('message')

    if not message:
        return {'error': 'message is required'}, 400

    try:
        reply = bedrock.invoke_claude(message)
        return {'reply': reply}
    except Exception as e:
        return {'error': str(e)}, 500
```

---

## 13. Integrating OpenAI

```bash
pip install openai
```

### OpenAI Service class

```python
# app/services/openai_service.py
from openai import OpenAI
import os

class OpenAIService:
    def __init__(self):
        self.client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

    def chat(self, user_message: str, system_prompt: str = None) -> str:
        """Send a message and get a reply from GPT."""
        messages = []

        if system_prompt:
            messages.append({'role': 'system', 'content': system_prompt})

        messages.append({'role': 'user', 'content': user_message})

        response = self.client.chat.completions.create(
            model='gpt-4o',
            messages=messages,
            max_tokens=1000,
            temperature=0.7,
        )

        return response.choices[0].message.content

    def chat_with_history(self, conversation_history: list) -> str:
        """Send a full conversation history and get the next reply."""
        response = self.client.chat.completions.create(
            model='gpt-4o',
            messages=conversation_history,
        )
        return response.choices[0].message.content
```

### .env setup

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
```

### Using it in a route

```python
from app.services.openai_service import OpenAIService

openai_service = OpenAIService()

@api_bp.route('/chat', methods=['POST'])
def chat():
    data    = request.get_json()
    message = data.get('message')

    if not message:
        return {'error': 'message is required'}, 400

    try:
        reply = openai_service.chat(
            user_message=message,
            system_prompt='You are a helpful assistant.'
        )
        return {'reply': reply}
    except Exception as e:
        return {'error': str(e)}, 500
```

---

## 14. Working with DeepFace

**DeepFace** is a Python library for facial analysis tasks: face verification, recognition, age/gender/emotion detection.

```bash
pip install deepface
pip install tf-keras  # required backend
```

### Face analysis

```python
# app/services/face_service.py
from deepface import DeepFace
import numpy as np

class FaceService:
    def analyze(self, image_path: str) -> dict:
        """Analyze a face image for age, gender, emotion, and race."""
        try:
            result = DeepFace.analyze(
                img_path=image_path,
                actions=['age', 'gender', 'emotion'],
                enforce_detection=True,   # raises error if no face found
            )
            # result is a list, take the first face
            face = result[0]
            return {
                'age':      face['age'],
                'gender':   face['dominant_gender'],
                'emotion':  face['dominant_emotion'],
            }
        except ValueError as e:
            raise Exception(f'No face detected: {e}')

    def verify(self, image1_path: str, image2_path: str) -> dict:
        """Check if two images are the same person."""
        result = DeepFace.verify(
            img1_path=image1_path,
            img2_path=image2_path,
            model_name='VGG-Face',
        )
        return {
            'verified':  result['verified'],   # True or False
            'distance':  result['distance'],   # similarity distance (lower = more similar)
            'threshold': result['threshold'],
        }
```

### Using it in a route

```python
import os
import tempfile
from app.services.face_service import FaceService

face_service = FaceService()

@api_bp.route('/face/analyze', methods=['POST'])
def analyze_face():
    if 'image' not in request.files:
        return {'error': 'No image provided'}, 400

    image = request.files['image']

    # Save to a temp file since DeepFace expects a file path
    with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
        image.save(tmp.name)
        tmp_path = tmp.name

    try:
        result = face_service.analyze(tmp_path)
        return result
    except Exception as e:
        return {'error': str(e)}, 422
    finally:
        os.unlink(tmp_path)  # always clean up the temp file
```

---

## 15. Best Practices and Common Mistakes

### Always use environment variables for secrets

```python
# Never hardcode credentials
api_key = 'sk-abc123...'   # exposed in code

# Always load from environment
import os
api_key = os.environ.get('OPENAI_API_KEY')
```

Use **python-dotenv** to load `.env` automatically:

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
load_dotenv()  # call this once at app startup
```

### Use a service layer

Keep routes thin. Move business logic and external API calls into service classes:

```python
# Bad: logic crammed into the route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
    response = client.chat.completions.create(...)
    return {'reply': response.choices[0].message.content}

# Good: route delegates to a service
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    reply = openai_service.chat(data.get('message'))
    return {'reply': reply}
```

### Always validate input

```python
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    if not data:
        return {'error': 'No JSON body provided'}, 400

    if not data.get('email'):
        return {'error': 'email is required'}, 400

    if '@' not in data['email']:
        return {'error': 'Invalid email format'}, 400

    # safe to proceed
```

For more complex validation, use **marshmallow** or **pydantic**.

### Handle exceptions around external calls

External services (S3, Bedrock, OpenAI) can fail. Always wrap them:

```python
try:
    reply = openai_service.chat(message)
except Exception as e:
    app.logger.error(f'OpenAI call failed: {e}')
    return {'error': 'AI service unavailable'}, 503
```

### Common mistakes table

| Mistake | What goes wrong | How to fix |
|---------|----------------|-----------|
| Hardcoding API keys | Credentials exposed in code or git history | Use `.env` and `os.environ.get()` |
| No input validation | Crashes, security vulnerabilities | Validate before using any request data |
| Logic in routes | Hard to test, hard to reuse | Move to service classes |
| Not handling external API errors | Unhandled exceptions, broken responses | Wrap external calls in try/except |
| Using `debug=True` in production | Exposes full stack traces to users | Set `debug=False` or use environment-based config |
| Forgetting to clean up temp files | Disk fills up over time | Use `finally` block or `tempfile.TemporaryDirectory()` |
| Blocking the event loop with slow tasks | Requests time out or queue up | Offload heavy work to a task queue (Celery) |

---

## Quick Reference

| Concept | What it does |
|---------|-------------|
| `@app.route('/path')` | Register a URL to a function |
| `request.get_json()` | Read JSON body from the request |
| `request.args.get('key')` | Read query string parameter |
| `request.files['key']` | Read uploaded file |
| `return {'key': 'value'}` | Return a JSON response |
| `return {'error': '...'}, 400` | Return JSON with a specific status code |
| `abort(404)` | Immediately return an error response |
| `Blueprint` | Split routes into separate modules |
| `before_request` | Hook that runs before every route |
| `after_request` | Hook that runs after every route |
| `boto3` | AWS Python SDK (S3, Bedrock, etc.) |
| `DeepFace` | Face analysis and verification library |
| `OpenAI` | OpenAI Python client |

---

*Written while learning Flask on the job. The stack uses Flask alongside boto3, OpenAI, and DeepFace for ML/AI backend workflows.*
