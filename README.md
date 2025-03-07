## **Overview**

The **Image Upload API** enables developers to easily upload images, which are then automatically processed and converted to WebP format. The API guarantees security by utilizing **API key authentication**, ensuring that only authorized users can upload files. For maximum performance and security, the API integrates with **ARCJET** (free API protection) and **Gumlet** for optimal image delivery speed.

### **ARCJET API Integration**
For additional protection and to prevent malicious activity, the **ARCJET API** is required to secure all upload requests. ARCJET provides a free API to ensure high-level protection against potential threats. You can set up ARCJET easily to enhance security.

- [How to Add ARCJET API](https://arcjet.com/docs/add-arcjet)
  
### **Gumlet Integration for Speed**
To ensure fast delivery of images, the **Gumlet CDN** is used. Gumlet optimizes image sizes and ensures that they load quickly on your site or app. By integrating Gumlet with the upload system, you can maximize performance without compromising image quality.

- [How to Integrate Gumlet](https://www.gumlet.com/docs/integration)

---

## **Key Features**

- **Image Upload**: Accepts image file uploads (JPEG, PNG, WebP).
- **WebP Conversion**: Converts images to WebP format for optimized file size without significant loss of quality.
- **API Key Authentication**: Ensures security by validating API keys provided in requests.
- **File Storage**: Stores files on the server and provides URLs for accessing them.
- **CORS Support**: The API can be accessed from allowed domains only.
- **File Size Limits**: Defines a maximum file size for uploads (e.g., 25MB per file).
- **ARCJET Integration**: Use ARCJET for API security and protection.
- **Gumlet Integration**: Leverage Gumlet for faster image delivery.

---

## **Endpoints**

### 1. **POST /upload**

This endpoint handles the upload of image files. The file will be processed (resized, converted to WebP) and stored on the server.

#### **Request Headers:**

- **x-api-key**: The API key required to authenticate the request. This must match the key set in the server's environment.

#### **Request Body:**

- **image**: The image file to be uploaded (JPEG, PNG, or WebP). This should be sent as `multipart/form-data`.

#### **Response:**

- **200 OK**:
  - **filePath**: URL to access the uploaded image (in WebP format).
  - **message**: A success message indicating that the image has been uploaded and processed.
  
- **400 Bad Request**:
  - **error**: Error message indicating that the uploaded file is not a valid image or is missing.

- **403 Forbidden**:
  - **error**: Error message if the API key provided is invalid or missing.

- **500 Internal Server Error**:
  - **error**: General error message indicating a server-side issue.

---

## **How to Use the API**

1. **Obtain API Key**: 
   - Before making any requests to the API, you must obtain a valid API key from the server administrator.
   
2. **Make a POST Request to /upload**:
   - To upload an image, send a `POST` request to the `/upload` endpoint with the following:
     - **Headers**: Include your API key in the `x-api-key` header.
     - **Body**: Attach the image you want to upload in the `image` field of the form data.
   
3. **Process the Response**:
   - If successful, the response will contain a URL (`filePath`) where the uploaded image can be accessed.
   - If the file is not an image or is missing, the API will return an error message.

---

## **Error Handling**

The API provides clear error messages in case something goes wrong. Here are the possible errors and their meanings:

- **No file uploaded**: This error occurs if the request does not contain an image file.
- **Invalid file type**: This error is returned if the uploaded file is not a valid image (e.g., a non-image file type).
- **Invalid API key**: If the `x-api-key` header is missing or incorrect, the request will be rejected with a "Forbidden" error.
- **Server error**: If something goes wrong on the server (e.g., a failure in processing the image), an internal server error will be returned.

---

## **Security Considerations**

The API uses API keys to authenticate requests, ensuring that only authorized users can upload files. The server checks the key provided in the `x-api-key` header of the request against a predefined value stored in the server's environment variables. If the key is invalid or missing, the request will be denied.

To further protect your API, ARCJET is required. ARCJET will help safeguard against common API attacks and ensure only legitimate traffic is processed.

---

## **File Storage**

Uploaded images are stored in the server's file system. The files are saved in the `/files/images` directory and are accessible through URLs returned in the response. The URL format follows the structure:

```
https://your-cdn-link/files/images/{image-id}.webp
```

This link can be used to display or download the uploaded images. Images are optimized and delivered via the Gumlet CDN to ensure high speed and reduced loading times.

---

## **File Size Limits**

To prevent overloading the server, the API imposes a file size limit on uploads. The default file size limit is **25MB**. If a user attempts to upload a file that exceeds this size, they will receive a "File too large" error.

---

## **Response Examples**

Here are example responses for various outcomes:

### **Success Response (200 OK)**

```json
{
    "filePath": "https://your-cdn-link/files/images/abc123.webp",
    "message": "Image uploaded and processed successfully."
}
```

### **Error Response (400 Bad Request)**

```json
{
    "error": "No file uploaded"
}
```

### **Error Response (403 Forbidden)**

```json
{
    "error": "Forbidden: Invalid API Key"
}
```

### **Error Response (500 Internal Server Error)**

```json
{
    "error": "An error occurred while processing the image."
}
```

---

## **Conclusion**

This API is designed to make image uploading and processing simple for developers. With the ability to handle various image formats, secure file uploads with API key authentication, and store images on the server with easy-to-access URLs, it provides a robust solution for any application that needs image handling capabilities. Additionally, by integrating **ARCJET** for security and **Gumlet** for optimized delivery, this API offers a complete solution.

For detailed guides, check the following links:
- [Add ARCJET API for Security](https://arcjet.com/docs/add-arcjet)
- [Integrate Gumlet for Speed](https://www.gumlet.com/docs/integration)

If you have any questions or issues, please contact the server administrator or refer to the project's repository for more information.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
