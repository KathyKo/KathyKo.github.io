---
title: "Laravel Usage Guide"
date: 2026-03-22
description: A beginner-friendly guide to Laravel: covering MVC architecture, request lifecycle, routing, controllers, Eloquent ORM, jobs, and external API integration. Written from scratch while learning on the job.
tags:
  - tech-notes
draft: false
hideTOC: false
---

> Notes written while learning Laravel from a tech intern handover doc. The codebase uses Laravel as the backend layer for handling business logic, API routes, webhooks, and integration with external services.

---

## Table of Contents

1. [What is Laravel?](#1-what-is-laravel)
2. [MVC Architecture](#2-mvc-architecture)
3. [Project Structure](#3-project-structure)
4. [Request Lifecycle](#4-request-lifecycle)
5. [Routing](#5-routing)
6. [Controllers](#6-controllers)
7. [Models and Eloquent ORM](#7-models-and-eloquent-orm)
8. [Database Migrations](#8-database-migrations)
9. [Services](#9-services)
10. [Jobs and Queues (Async Processing)](#10-jobs-and-queues-async-processing)
11. [Calling External APIs](#11-calling-external-apis)
12. [Webhooks and Form Submissions](#12-webhooks-and-form-submissions)
13. [Middleware](#13-middleware)
14. [Authentication](#14-authentication)
15. [Artisan CLI](#15-artisan-cli)
16. [Best Practices and Common Mistakes](#16-best-practices-and-common-mistakes)

---

## 1. What is Laravel?

Laravel is a modern **PHP framework** for building secure, scalable web applications. It was created by Taylor Otwell and follows the **MVC (Model-View-Controller)** architecture pattern.

Instead of writing raw PHP from scratch, Laravel gives you a structured way to organize your code and a rich set of built-in tools so you don't have to reinvent the wheel:

- **Routing**: map URLs to code
- **Authentication**: login, registration, sessions out of the box
- **Database management**: interact with databases using plain PHP objects instead of raw SQL
- **Job queues**: run heavy tasks in the background
- **HTTP Client**: call external APIs cleanly

In the context of this codebase, Laravel acts as the **backend layer** responsible for:

- Handling API routes and webhook requests (e.g., from Twilio)
- Processing business logic in controllers and services
- Managing user sessions and form submissions
- Talking to the database via Eloquent ORM
- Dispatching background jobs for async processing

---

## 2. MVC Architecture

MVC stands for **Model, View, Controller**. It is a design pattern that separates your application into three distinct layers so that each piece of code has a clear, single responsibility.

```
Browser Request
      |
   Router
      |
  Controller  <---->  Model (database)
      |
    View (HTML / JSON response)
```

### Model

The **Model** represents your data and the rules around it. It talks directly to the database. In Laravel, models use **Eloquent ORM**, which lets you work with database rows as PHP objects.

```php
// A User model represents one row in the `users` table
$user = User::find(1);
echo $user->name; // No SQL needed
```

### View

The **View** is what the user sees: the HTML template or JSON response. In API-only apps (like this codebase), views are usually just JSON responses rather than HTML pages.

```php
return response()->json(['status' => 'ok', 'message' => 'Webhook received']);
```

### Controller

The **Controller** is the middleman. It receives the request, talks to models and services to get or process data, then returns a response.

```php
class ChatbotController extends Controller
{
    public function handle(Request $request)
    {
        $message = $request->input('Body');  // get data from request
        $reply = $this->chatbotService->respond($message);  // business logic
        return response()->json(['reply' => $reply]);  // send response
    }
}
```

**The rule of thumb:** keep controllers thin. Heavy logic belongs in Services, not controllers.

---

## 3. Project Structure

When you open a Laravel project, the key folders you need to know:

```
app/
|--  Http/
|   |--  Controllers/    # Controllers live here
|   |--  Middleware/     # Request filters (auth, logging, etc.)
|--  Models/             # Eloquent models (one per database table)
|--  Services/           # Business logic classes
|--  Jobs/               # Async background jobs
config/                  # App configuration (database, queue, services)
database/
|--  migrations/         # Database schema version control
routes/
|--  web.php             # Browser routes (with sessions, CSRF)
|--  api.php             # API routes (stateless, /api prefix)
.env                     # Environment variables (secrets, DB credentials)
```

> Never commit your `.env` file. It contains sensitive credentials like database passwords and API keys.

---

## 4. Request Lifecycle

This is one of the most important things to understand. When a request hits your Laravel app (a webhook, a form submission, or an API call), here is exactly what happens:

### Step 1: Request enters through `public/index.php`

Every single request, regardless of URL, enters through one file: `public/index.php`. The web server (Nginx/Apache) is configured to route all traffic here. This file boots the framework.

### Step 2: The framework boots

Laravel loads all its service providers and configurations. Think of this as the app waking up and getting everything ready before handling your request.

### Step 3: Middleware runs

Before the request ever reaches your controller, it passes through a **middleware stack**. Middleware is like a series of checkpoints:

- Is the app in maintenance mode? Block the request.
- Is the user authenticated? If not, redirect to login.
- Is the CSRF token valid? If not, reject it.

### Step 4: Router matches the route

The router looks at the incoming URL and HTTP method (GET, POST, etc.) and finds the matching route definition in `routes/api.php` or `routes/web.php`.

```php
// routes/api.php
Route::post('/webhook', [ChatbotController::class, 'handle']);
```

### Step 5: Controller executes

The matched route calls the appropriate controller method. The controller:

1. Reads input from the request
2. Calls services or models for data/logic
3. May dispatch a background job
4. Returns a response (JSON, view, redirect)

```php
public function handle(Request $request)
{
    $data = $request->all();            // 1. read input
    $result = $this->service->process($data);  // 2. business logic
    ProcessWebhookJob::dispatch($data); // 3. async job (optional)
    return response()->json($result);   // 4. return response
}
```

### Step 6: Response travels back

The response goes back through the middleware stack (some middleware acts on the way out too), and is finally sent to the client.

---

## 5. Routing

Routes are defined in the `routes/` folder. There are two main route files:

| File | Used for | Features |
|------|----------|----------|
| `routes/web.php` | Browser pages | Sessions, cookies, CSRF protection |
| `routes/api.php` | API endpoints | Stateless, auto-prefixed with `/api` |

### Basic routes

```php
use Illuminate\Support\Facades\Route;

// GET /api/users
Route::get('/users', function () {
    return response()->json(['users' => []]);
});

// POST /api/webhook
Route::post('/webhook', [ChatbotController::class, 'handle']);

// PUT /api/users/{id}
Route::put('/users/{id}', [UserController::class, 'update']);

// DELETE /api/users/{id}
Route::delete('/users/{id}', [UserController::class, 'destroy']);
```

### Route parameters

Capture dynamic segments from the URL using `{curly braces}`:

```php
// /api/users/42  ->  $id = '42'
Route::get('/users/{id}', function (string $id) {
    return User::findOrFail($id);
});

// Optional parameter with default
Route::get('/posts/{status?}', function (string $status = 'published') {
    return Post::where('status', $status)->get();
});
```

### Route groups

Apply shared settings (like middleware or a URL prefix) to multiple routes at once:

```php
// All routes in this group require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

// All routes share the /admin prefix
Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/stats', [AdminController::class, 'stats']);
});
```

### RESTful resource routes

Instead of defining 7 CRUD routes manually, one line does it all:

```php
Route::apiResource('messages', MessageController::class);
```

This creates:

| Method | URL | Controller method |
|--------|-----|------------------|
| GET | `/api/messages` | `index` |
| POST | `/api/messages` | `store` |
| GET | `/api/messages/{id}` | `show` |
| PUT | `/api/messages/{id}` | `update` |
| DELETE | `/api/messages/{id}` | `destroy` |

### Useful Artisan command

```bash
php artisan route:list          # see all registered routes
php artisan route:list --path=api  # filter to API routes only
```

---

## 6. Controllers

Controllers live in `app/Http/Controllers/`. Each controller groups related request handling logic.

### Creating a controller

```bash
php artisan make:controller ChatbotController
```

### Basic controller

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ChatbotController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        // Validate incoming data
        $validated = $request->validate([
            'Body' => 'required|string',
            'From' => 'required|string',
        ]);

        // Process and return
        return response()->json([
            'status' => 'received',
            'from'   => $validated['From'],
        ]);
    }
}
```

### Dependency injection in controllers

Laravel's service container automatically injects dependencies when you type-hint them in the constructor or method:

```php
class ChatbotController extends Controller
{
    // Laravel automatically creates and injects ChatbotService
    public function __construct(
        private ChatbotService $chatbotService
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $reply = $this->chatbotService->respond($request->input('Body'));
        return response()->json(['reply' => $reply]);
    }
}
```

### Request validation

Always validate incoming data before using it:

```php
$validated = $request->validate([
    'email'    => 'required|email',
    'password' => 'required|min:8',
    'name'     => 'sometimes|string|max:255',
]);

// If validation fails, Laravel automatically returns a 422 error response
// If it passes, $validated contains only the declared fields
```

Common validation rules:

| Rule | Meaning |
|------|---------|
| `required` | Field must be present and not empty |
| `string` | Must be a string |
| `email` | Must be a valid email format |
| `min:8` | Minimum length of 8 |
| `max:255` | Maximum length of 255 |
| `integer` | Must be an integer |
| `nullable` | Can be null |
| `sometimes` | Only validate if the field is present |

---

## 7. Models and Eloquent ORM

Eloquent is Laravel's ORM (Object Relational Mapper). It lets you interact with your database tables using PHP classes instead of writing raw SQL.

**Convention:** one model = one database table.

```bash
php artisan make:model Message
# Creates app/Models/Message.php
# Model name 'Message' maps to 'messages' table by convention
```

### Defining a model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    // Columns that can be mass-assigned (security measure)
    protected $fillable = ['from', 'body', 'status', 'session_id'];

    // Type casting
    protected $casts = [
        'created_at' => 'datetime',
        'is_read'    => 'boolean',
    ];
}
```

### CRUD operations

```php
// Create
$message = Message::create([
    'from'   => '+6591234567',
    'body'   => 'Hello',
    'status' => 'received',
]);

// Read
$message  = Message::find(1);               // by ID (null if not found)
$message  = Message::findOrFail(1);         // by ID (throws 404 if not found)
$messages = Message::all();                  // all records
$messages = Message::where('status', 'received')->get();  // filtered
$latest   = Message::latest()->first();      // most recent record

// Update
$message->update(['status' => 'processed']);
// or
$message->status = 'processed';
$message->save();

// Delete
$message->delete();

// Mass delete
Message::where('status', 'spam')->delete();
```

### Query builder

Chain methods to build queries:

```php
$messages = Message::query()
    ->where('status', 'received')
    ->where('created_at', '>=', now()->subHour())
    ->orderBy('created_at', 'desc')
    ->limit(50)
    ->get();
```

### Relationships

```php
// A User has many Messages
class User extends Model
{
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

// A Message belongs to a User
class Message extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

// Usage
$user = User::find(1);
$messages = $user->messages;  // all messages belonging to this user

$message = Message::find(1);
$user = $message->user;       // the user who owns this message
```

---

## 8. Database Migrations

Migrations are like version control for your database schema. Instead of manually creating tables in a database GUI, you write PHP code that creates or modifies tables. This means every developer on the team can reproduce the exact same database structure.

```bash
php artisan make:migration create_messages_table
```

This creates a file in `database/migrations/`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();                        // auto-increment primary key
            $table->string('from');              // VARCHAR
            $table->text('body');                // TEXT
            $table->string('status')->default('received');
            $table->foreignId('user_id')->constrained(); // foreign key
            $table->boolean('is_read')->default(false);
            $table->timestamps();                // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages'); // rollback
    }
};
```

Run migrations:

```bash
php artisan migrate             # run pending migrations
php artisan migrate:rollback    # undo last batch
php artisan migrate:fresh       # drop all tables and re-run (dev only)
```

---

## 9. Services

A **Service** is a plain PHP class that holds business logic. Controllers should be thin: they delegate the actual work to services.

Why not put everything in the controller? Because:
- Controllers get bloated fast
- Logic in services can be reused across multiple controllers
- Services are easier to test in isolation

```bash
# No artisan command for services: just create the file manually
# app/Services/ChatbotService.php
```

```php
<?php

namespace App\Services;

use App\Models\Message;

class ChatbotService
{
    public function respond(string $incomingMessage, string $from): string
    {
        // Save the incoming message
        Message::create([
            'from'   => $from,
            'body'   => $incomingMessage,
            'status' => 'received',
        ]);

        // Business logic: generate a reply
        $reply = $this->generateReply($incomingMessage);

        // Save the outgoing message
        Message::create([
            'from'   => 'bot',
            'body'   => $reply,
            'status' => 'sent',
        ]);

        return $reply;
    }

    private function generateReply(string $message): string
    {
        // Your AI/logic here
        return 'Thanks for your message: ' . $message;
    }
}
```

Use it in the controller:

```php
class ChatbotController extends Controller
{
    public function __construct(private ChatbotService $chatbotService) {}

    public function handle(Request $request): JsonResponse
    {
        $reply = $this->chatbotService->respond(
            $request->input('Body'),
            $request->input('From')
        );
        return response()->json(['reply' => $reply]);
    }
}
```

---

## 10. Jobs and Queues (Async Processing)

Some tasks are too slow to run during a web request: sending emails, calling an AI API, processing files. You don't want the user to wait. Jobs let you push that work into a background queue and return a response immediately.

```
Request --> Controller --> dispatch(Job) --> return response immediately
                                |
                         Queue Worker picks it up
                                |
                         Job runs in the background
```

### Creating a job

```bash
php artisan make:job ProcessWebhookJob
```

```php
<?php

namespace App\Jobs;

use App\Services\ChatbotService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessWebhookJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $from,
        public string $body
    ) {}

    public function handle(ChatbotService $chatbotService): void
    {
        // This runs in the background
        $chatbotService->respond($this->body, $this->from);
    }
}
```

### Dispatching a job

```php
// In your controller -- fire and forget
ProcessWebhookJob::dispatch($from, $body);

// Delayed dispatch (run after 5 minutes)
ProcessWebhookJob::dispatch($from, $body)->delay(now()->addMinutes(5));

// Dispatch to a specific queue
ProcessWebhookJob::dispatch($from, $body)->onQueue('webhooks');
```

### Running the queue worker

```bash
php artisan queue:work                    # process jobs continuously
php artisan queue:work --queue=webhooks   # process specific queue
```

In production, use **Supervisor** to keep the queue worker running persistently.

---

## 11. Calling External APIs

Laravel's HTTP Client is a clean wrapper around Guzzle that makes calling external APIs (like Twilio or AWS Bedrock) straightforward.

```php
use Illuminate\Support\Facades\Http;
```

### Basic requests

```php
// GET request
$response = Http::get('https://api.example.com/users');

// POST request with JSON body (default)
$response = Http::post('https://api.example.com/messages', [
    'to'   => '+6591234567',
    'body' => 'Hello from Laravel',
]);

// With authentication header (Bearer token)
$response = Http::withToken(config('services.openai.key'))
    ->post('https://api.openai.com/v1/chat/completions', [
        'model'    => 'gpt-4',
        'messages' => [['role' => 'user', 'content' => 'Hello']],
    ]);
```

### Reading the response

```php
$response->successful();    // true if status is 2xx
$response->failed();        // true if status is 4xx or 5xx
$response->status();        // e.g. 200, 404, 500
$response->json();          // parse body as array
$response['key'];           // access JSON key directly
$response->body();          // raw string body
```

### Error handling and retries

```php
$response = Http::timeout(10)          // fail if no response in 10 seconds
    ->retry(3, 500)                    // retry 3 times, wait 500ms between tries
    ->post('https://api.twilio.com/...', $payload);

if ($response->failed()) {
    Log::error('Twilio API call failed', [
        'status'   => $response->status(),
        'response' => $response->body(),
    ]);
    throw new \Exception('Failed to send message');
}
```

### A real-world example: Twilio

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TwilioService
{
    private string $accountSid;
    private string $authToken;
    private string $fromNumber;

    public function __construct()
    {
        $this->accountSid = config('services.twilio.sid');
        $this->authToken  = config('services.twilio.token');
        $this->fromNumber = config('services.twilio.from');
    }

    public function sendMessage(string $to, string $body): bool
    {
        $response = Http::withBasicAuth($this->accountSid, $this->authToken)
            ->asForm()
            ->post("https://api.twilio.com/2010-04-01/Accounts/{$this->accountSid}/Messages.json", [
                'From' => $this->fromNumber,
                'To'   => $to,
                'Body' => $body,
            ]);

        return $response->successful();
    }
}
```

Store credentials in `.env`, never in code:

```bash
# .env
TWILIO_SID=ACxxxxxxxxxxxxxxxx
TWILIO_TOKEN=your_auth_token
TWILIO_FROM=+1234567890
```

```php
// config/services.php
'twilio' => [
    'sid'   => env('TWILIO_SID'),
    'token' => env('TWILIO_TOKEN'),
    'from'  => env('TWILIO_FROM'),
],
```

---

## 12. Webhooks and Form Submissions

A **webhook** is a POST request sent by an external service to your app when something happens (e.g., Twilio sends a webhook when a user sends an SMS to your number).

### Receiving a webhook

```php
// routes/api.php
Route::post('/webhook/twilio', [ChatbotController::class, 'handle']);
```

```php
// app/Http/Controllers/ChatbotController.php
public function handle(Request $request): JsonResponse
{
    // Twilio sends form data, not JSON
    $from = $request->input('From');  // sender's phone number
    $body = $request->input('Body');  // message content

    // Dispatch to background queue so we return instantly
    ProcessWebhookJob::dispatch($from, $body);

    // Twilio expects a quick 200 response
    return response()->json(['status' => 'queued'], 200);
}
```

### CSRF protection for webhooks

API routes (in `routes/api.php`) are **stateless** and do not have CSRF protection by default, which is what you want for webhooks. Web routes (in `routes/web.php`) do have CSRF protection.

If you need to exempt a specific web route from CSRF (e.g., a third-party callback):

```php
// bootstrap/app.php (Laravel 12)
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'stripe/webhook',
        'twilio/callback',
    ]);
})
```

### Form submissions

For browser-submitted HTML forms (in `routes/web.php`), always include the CSRF token:

```html
<form method="POST" action="/contact">
    @csrf
    <input type="text" name="name" />
    <input type="email" name="email" />
    <button type="submit">Send</button>
</form>
```

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email',
    ]);

    // Process form data...
    return redirect()->back()->with('success', 'Message sent!');
}
```

---

## 13. Middleware

Middleware filters requests before they reach your controller. Think of it as a checkpoint system.

Common built-in middleware:

| Middleware | What it does |
|------------|-------------|
| `auth` | Blocks unauthenticated users |
| `auth:sanctum` | API token authentication |
| `throttle:60,1` | Rate limiting (60 requests per minute) |
| `verified` | Requires email verification |

### Applying middleware to routes

```php
// Single route
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth');

// Route group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/settings', [SettingsController::class, 'index']);
});

// With rate limiting for webhooks
Route::post('/webhook', [ChatbotController::class, 'handle'])
    ->middleware('throttle:100,1');
```

### Creating custom middleware

```bash
php artisan make:middleware VerifyTwilioSignature
```

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyTwilioSignature
{
    public function handle(Request $request, Closure $next)
    {
        $signature = $request->header('X-Twilio-Signature');

        if (!$this->isValidSignature($signature, $request)) {
            return response()->json(['error' => 'Invalid signature'], 403);
        }

        return $next($request);  // pass request to the next layer
    }

    private function isValidSignature(string $signature, Request $request): bool
    {
        // Your validation logic here
        return true;
    }
}
```

---

## 14. Authentication

Laravel makes authentication straightforward. For API-based apps, **Laravel Sanctum** is the standard.

### Install Sanctum

```bash
php artisan install:api
php artisan migrate
```

### Issuing API tokens

```php
// When a user logs in, issue a token
public function login(Request $request)
{
    $credentials = $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user  = Auth::user();
    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['token' => $token]);
}

// Logout: revoke the token
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
}
```

### Protecting routes

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::post('/messages', [MessageController::class, 'store']);
});
```

### Making authenticated API requests

Clients send the token in the `Authorization` header:

```
Authorization: Bearer 1|abc123...
```

---

## 15. Artisan CLI

Artisan is Laravel's built-in command-line tool. You will use it constantly.

```bash
# Development
php artisan serve               # start local development server
php artisan tinker              # interactive PHP REPL (great for testing queries)

# Code generation
php artisan make:controller NameController
php artisan make:model Name --migration   # model + migration together
php artisan make:job ProcessSomething
php artisan make:middleware CheckHeader
php artisan make:request StoreMessageRequest

# Database
php artisan migrate             # run pending migrations
php artisan migrate:rollback    # undo last migration batch
php artisan migrate:fresh       # drop everything and re-migrate (dev only)
php artisan db:seed             # run database seeders

# Routes
php artisan route:list          # see all routes
php artisan route:list --path=api

# Cache
php artisan cache:clear         # clear application cache
php artisan config:clear        # clear config cache
php artisan optimize:clear      # clear all caches

# Queue
php artisan queue:work          # start processing jobs
php artisan queue:failed        # list failed jobs
php artisan queue:retry all     # retry all failed jobs
```

---

## 16. Best Practices and Common Mistakes

### Keep controllers thin

Controllers should only:
1. Validate the request
2. Call a service or model
3. Return a response

Heavy logic belongs in **Services**.

### Never trust user input

Always validate before using:

```php
// Never do this
$name = $request->input('name');
User::create(['name' => $name]); // dangerous if name is malicious

// Always do this
$validated = $request->validate(['name' => 'required|string|max:255']);
User::create($validated);
```

### Store secrets in `.env`, not in code

```php
// Never hardcode credentials
$apiKey = 'sk-abc123...'; // exposed if someone reads your code

// Always use .env
$apiKey = config('services.openai.key');
```

### Common mistakes table

| Mistake | What goes wrong | How to fix |
|---------|----------------|-----------|
| Logic in controllers | Controllers become unmaintainable | Move to a Service class |
| Missing `$fillable` on model | Mass assignment vulnerability | Define `$fillable` on every model |
| Committing `.env` to git | Credentials exposed | Add `.env` to `.gitignore` |
| No validation on input | Security vulnerabilities | Always call `$request->validate()` |
| N+1 query problem | Hundreds of unnecessary DB queries | Use eager loading: `User::with('messages')->get()` |
| Forgetting `php artisan optimize:clear` | Old config/routes loaded | Clear caches after config changes |
| Running heavy logic synchronously | Slow response times | Use Jobs for anything that takes time |

---

## Quick Reference

| Concept | What it does |
|---------|-------------|
| Route | Maps a URL and HTTP method to a controller |
| Controller | Handles the request and returns a response |
| Model | Represents a database table as a PHP class |
| Migration | Version-controlled database schema change |
| Service | Class containing reusable business logic |
| Job | Background task run asynchronously via a queue |
| Middleware | Filters requests before they hit the controller |
| Eloquent | Laravel's ORM for interacting with the database |
| Artisan | Laravel's CLI for generating code and managing the app |
| `.env` | File for storing environment-specific secrets |

---

*Written while learning Laravel on the job. References: Laravel 12.x official documentation.*
