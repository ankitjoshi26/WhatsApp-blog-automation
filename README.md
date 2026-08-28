# WhatsApp Blog Notifier

A small MERN feature that lets users opt in to WhatsApp blog notifications and lets an admin publish a blog through the API. Published blogs trigger WhatsApp Cloud API template messages to opted-in subscribers.

## Requirements
- Node.js 18+
- MongoDB
- Meta WhatsApp Business Platform / Cloud API credentials
- An approved WhatsApp message template matching the variables used by `whatsappService.js`

## Run backend
```bash
cd server
cp .env.example .env
# Fill in MongoDB and WhatsApp values in .env
npm install
npm run dev
```

## Run frontend
```bash
cd client
npm install
npm run dev
```

## API

### Subscribe
`POST /api/subscribers/subscribe`
```json
{ "name": "Rahul", "phone": "919876543210" }
```

### Unsubscribe
`POST /api/subscribers/unsubscribe`
```json
{ "phone": "919876543210" }
```

### Create blog
`POST /api/blogs`
```json
{
  "title": "How AI is Changing Web Development",
  "slug": "how-ai-is-changing-web-development",
  "url": "https://example.com/blog/how-ai-is-changing-web-development",
  "published": true
}
```
If `published` is true, the backend attempts to notify all opted-in subscribers.

### Publish existing blog
`PATCH /api/blogs/:id/publish`

## Important
The included WhatsApp service uses an approved template message. The template's body variables must match the two parameters: blog title and blog URL. Do not put WhatsApp access tokens in React or commit `.env` to Git.

For a production deployment, move sending to a background queue rather than waiting for every WhatsApp API call inside the publish request.
