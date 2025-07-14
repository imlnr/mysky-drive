# Share API Documentation

This document describes all the sharing-related APIs for the MySky Drive application.

## Base URL

```
http://localhost:4500/shares
```

## Authentication

All endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Share Item with User

**POST** `/shares/share`

Share a file or folder with a specific user by email.

**Request Body:**

```json
{
  "itemId": "file_or_folder_id",
  "itemType": "file|folder",
  "sharedWithEmail": "user@example.com",
  "permissions": {
    "read": true,
    "write": false,
    "delete": false,
    "share": false
  }
}
```

**Response:**

```json
{
  "msg": "file shared successfully",
  "share": {
    "_id": "share_id",
    "itemId": "file_or_folder_id",
    "itemType": "file",
    "sharedBy": "user_id",
    "sharedWith": "target_user_id",
    "permissions": {
      "read": true,
      "write": false,
      "delete": false,
      "share": false
    },
    "isPublic": false,
    "publicLink": null,
    "linkPassword": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "expiresAt": null,
    "isActive": true
  }
}
```

### 2. Create Public Link

**POST** `/shares/public-link`

Create a public link for sharing files or folders.

**Request Body:**

```json
{
  "itemId": "file_or_folder_id",
  "itemType": "file|folder",
  "password": "optional_password",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

**Response:**

```json
{
  "msg": "Public link created successfully",
  "share": {
    "_id": "share_id",
    "itemId": "file_or_folder_id",
    "itemType": "file",
    "sharedBy": "user_id",
    "sharedWith": null,
    "permissions": {
      "read": true,
      "write": false,
      "delete": false,
      "share": false
    },
    "isPublic": true,
    "publicLink": "file-file_id-timestamp-random",
    "linkPassword": "optional_password",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "isActive": true
  },
  "publicLink": "http://localhost:3000/shared/file-file_id-timestamp-random"
}
```

### 3. Get Items Shared With Me

**GET** `/shares/shared-with-me`

Get all files and folders shared with the current user.

**Response:**

```json
{
  "msg": "Shared items fetched successfully",
  "sharedFiles": [
    {
      "_id": "share_id",
      "itemId": {
        "_id": "file_id",
        "name": "document.pdf",
        "owner": "owner_user_id",
        "folderId": "folder_id",
        "size": 1024000,
        "type": "application/pdf",
        "url": "https://example.com/file.pdf",
        "imagekitFileId": "file_id",
        "isPublic": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      "sharedBy": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://example.com/avatar.jpg"
      },
      "permissions": {
        "read": true,
        "write": false,
        "delete": false,
        "share": false
      }
    }
  ],
  "sharedFolders": [
    {
      "_id": "share_id",
      "itemId": {
        "_id": "folder_id",
        "name": "Project Files",
        "owner": "owner_user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "parentFolder": null,
        "folderColor": "muted-foreground"
      },
      "sharedBy": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://example.com/avatar.jpg"
      },
      "permissions": {
        "read": true,
        "write": true,
        "delete": false,
        "share": false
      }
    }
  ]
}
```

### 4. Get Items Shared By Me

**GET** `/shares/shared-by-me`

Get all files and folders shared by the current user.

**Response:**

```json
{
  "msg": "Shared items fetched successfully",
  "sharedFiles": [
    {
      "_id": "share_id",
      "itemId": {
        "_id": "file_id",
        "name": "document.pdf",
        "owner": "current_user_id",
        "folderId": "folder_id",
        "size": 1024000,
        "type": "application/pdf",
        "url": "https://example.com/file.pdf",
        "imagekitFileId": "file_id",
        "isPublic": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      "sharedWith": {
        "_id": "user_id",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "avatar": "https://example.com/avatar.jpg"
      },
      "permissions": {
        "read": true,
        "write": false,
        "delete": false,
        "share": false
      }
    }
  ],
  "sharedFolders": []
}
```

### 5. Access Public Link

**POST** `/shares/access/:publicLink`

Access a shared item via public link (no authentication required).

**Request Body:**

```json
{
  "password": "optional_password"
}
```

**Response:**

```json
{
  "msg": "Public link accessed successfully",
  "share": {
    "_id": "share_id",
    "itemId": {
      "_id": "file_id",
      "name": "document.pdf",
      "owner": "owner_user_id",
      "folderId": "folder_id",
      "size": 1024000,
      "type": "application/pdf",
      "url": "https://example.com/file.pdf",
      "imagekitFileId": "file_id",
      "isPublic": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "sharedBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "permissions": {
      "read": true,
      "write": false,
      "delete": false,
      "share": false
    },
    "isPublic": true,
    "publicLink": "file-file_id-timestamp-random",
    "linkPassword": null,
    "expiresAt": null
  }
}
```

### 6. Update Share Permissions

**PUT** `/shares/permissions/:shareId`

Update permissions for a shared item.

**Request Body:**

```json
{
  "permissions": {
    "read": true,
    "write": true,
    "delete": false,
    "share": false
  },
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

**Response:**

```json
{
  "msg": "Share permissions updated successfully",
  "share": {
    "_id": "share_id",
    "permissions": {
      "read": true,
      "write": true,
      "delete": false,
      "share": false
    },
    "expiresAt": "2024-12-31T23:59:59.000Z"
  }
}
```

### 7. Remove Share

**DELETE** `/shares/remove/:shareId`

Remove a share (revoke access).

**Response:**

```json
{
  "msg": "Share removed successfully"
}
```

### 8. Get Share Details

**GET** `/shares/details/:shareId`

Get detailed information about a specific share.

**Response:**

```json
{
  "msg": "Share details fetched successfully",
  "share": {
    "_id": "share_id",
    "itemId": {
      "_id": "file_id",
      "name": "document.pdf",
      "owner": "owner_user_id",
      "folderId": "folder_id",
      "size": 1024000,
      "type": "application/pdf",
      "url": "https://example.com/file.pdf",
      "imagekitFileId": "file_id",
      "isPublic": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "sharedBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "sharedWith": {
      "_id": "user_id",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "permissions": {
      "read": true,
      "write": false,
      "delete": false,
      "share": false
    },
    "isPublic": false,
    "publicLink": null,
    "linkPassword": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "expiresAt": null,
    "isActive": true
  }
}
```

## Permission Levels

### Read Permission

- Allows viewing the file/folder
- Required for all other permissions

### Write Permission

- Allows editing file/folder properties
- Allows uploading files to shared folders
- Requires read permission

### Delete Permission

- Allows deleting the file/folder
- Requires read permission

### Share Permission

- Allows the shared user to share the item with others
- Requires read permission

## Error Responses

### 400 Bad Request

```json
{
  "msg": "itemId, itemType, and sharedWithEmail are required"
}
```

### 401 Unauthorized

```json
{
  "msg": "No authorization header provided"
}
```

### 403 Forbidden

```json
{
  "msg": "You don't have permission to update this file"
}
```

### 404 Not Found

```json
{
  "msg": "User not found with the provided email"
}
```

### 410 Gone

```json
{
  "msg": "Public link has expired"
}
```

### 500 Internal Server Error

```json
{
  "msg": "Error sharing item",
  "error": "Error details"
}
```

## Updated File and Folder APIs

The existing file and folder APIs have been updated to support shared access:

### Files API

- `GET /files/get-files/:folderId` - Now returns files owned by user + files shared with user
- `DELETE /files/delete-file/` - Now checks delete permissions for shared files
- `PUT /files/update-file/:fileId` - Now checks write permissions for shared files

### Folders API

- `GET /folders/get-all-folders` - Now returns folders owned by user + folders shared with user
- `PUT /folders/update-folder/:folderID` - Now checks write permissions for shared folders
- `DELETE /folders/delete-folder/:folderID` - Now checks delete permissions for shared folders

## Security Features

1. **Permission-based Access Control**: Users can only perform actions they have permission for
2. **Password Protection**: Public links can be protected with passwords
3. **Expiration Dates**: Public links can have expiration dates
4. **Audit Trail**: All sharing activities are logged with timestamps
5. **Soft Deletes**: Shares are deactivated rather than deleted to maintain history

## Database Schema

### Share Model

```javascript
{
  itemId: ObjectId,           // File or folder ID
  itemType: String,           // "file" or "folder"
  sharedBy: ObjectId,         // User who shared the item
  sharedWith: ObjectId,       // User with whom item is shared (null for public links)
  permissions: {
    read: Boolean,
    write: Boolean,
    delete: Boolean,
    share: Boolean
  },
  isPublic: Boolean,          // Whether this is a public link
  publicLink: String,         // Unique public link identifier
  linkPassword: String,       // Optional password for public links
  expiresAt: Date,           // Optional expiration date
  isActive: Boolean,         // Whether the share is active
  createdAt: Date,
  updatedAt: Date
}
```
