# Image Upload Server

## Description
This is a Node.js server built with Express that allows users to upload images, processes them using Sharp, and serves them via a static file server. The server ensures CORS compatibility and supports only JPEG, PNG, and WebP image formats. Uploaded images are automatically resized and converted to WebP format before being stored.

## Features
- Supports image uploads (JPEG, PNG, WebP)
- Converts and resizes images to WebP format (max 1024x1024)
- Stores files in a volume mount or local directory
- Provides a static file server for uploaded images
- Implements CORS to allow cross-origin requests

## Requirements
- Node.js (version 16 or later)
- Railway (if using volume mount for storage)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/image-upload-server.git
   cd image-upload-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
Environment variables:
- `PORT`: The port the server runs on.
- `CDN_LINK`: The base URL for serving uploaded images.
- `RAILWAY_VOLUME_MOUNT_PATH`: Path to the storage directory (used in Railway hosting).

## Running the Server
Start the server with:
```sh
node server.js
```
Or, using Nodemon for development:
```sh
npx nodemon server.js
```

## API Endpoints
### Upload Image
- **URL:** `POST /upload`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:**
  - `image`: The image file to be uploaded.
- **Response:**
  ```json
  {
    "filePath": "https://your-cdn-link.com/files/{file-name}.webp",
    "message": "Image uploaded and processed successfully."
  }
  ```

### Access Uploaded Files
- **URL:** `GET /files/{file-name}.webp`

## Deployment
To deploy on Railway:
1. Create a new Railway project and add this repository.
2. Set the environment variables.
3. Deploy and use the provided domain to access the API.

## License
MIT License

