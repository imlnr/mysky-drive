# File and Folder Sharing Feature

This document describes the comprehensive file and folder sharing feature implemented for the MySky Drive application.

## Overview

The sharing feature allows users to:

- Share files and folders with specific users by email
- Create public links for sharing files and folders
- Set granular permissions (read, write, delete, share)
- Password-protect public links
- Set expiration dates for shared items
- Manage and revoke shared access

## Features Implemented

### 1. User-to-User Sharing

- Share files and folders with specific users by email
- Set custom permissions for each share
- Prevent duplicate shares with the same user

### 2. Public Link Sharing

- Generate unique public links for files and folders
- Optional password protection
- Optional expiration dates
- Accessible without authentication

### 3. Permission System

- **Read**: View files/folders and their contents
- **Write**: Edit file/folder properties and upload files to shared folders
- **Delete**: Remove files/folders
- **Share**: Allow shared users to share the item with others

### 4. Access Control

- Permission-based access control for all operations
- Updated existing APIs to support shared access
- Secure authentication and authorization

## Database Schema

### Share Model (`models/share.models.ts`)

```typescript
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

## API Endpoints

### Share Management

- `POST /shares/share` - Share item with user
- `POST /shares/public-link` - Create public link
- `GET /shares/shared-with-me` - Get items shared with me
- `GET /shares/shared-by-me` - Get items shared by me
- `PUT /shares/permissions/:shareId` - Update share permissions
- `DELETE /shares/remove/:shareId` - Remove share
- `GET /shares/details/:shareId` - Get share details

### Public Access

- `POST /shares/access/:publicLink` - Access shared item via public link

## Updated Existing APIs

### Files API

- `GET /files/get-files/:folderId` - Now includes shared files
- `DELETE /files/delete-file/` - Checks delete permissions
- `PUT /files/update-file/:fileId` - Checks write permissions

### Folders API

- `GET /folders/get-all-folders` - Now includes shared folders
- `PUT /folders/update-folder/:folderID` - Checks write permissions
- `DELETE /folders/delete-folder/:folderID` - Checks delete permissions

## Utility Functions

### Permission Utils (`utils/permission.utils.ts`)

- `checkFileAccess()` - Check if user has access to file
- `checkFolderAccess()` - Check if user has access to folder
- `getAccessibleFiles()` - Get all files accessible to user
- `getAccessibleFolders()` - Get all folders accessible to user

## Security Features

1. **Authentication Required**: Most endpoints require valid JWT token
2. **Permission Validation**: All operations check user permissions
3. **Password Protection**: Public links can be password-protected
4. **Expiration Dates**: Public links can have expiration dates
5. **Soft Deletes**: Shares are deactivated rather than deleted
6. **Audit Trail**: All sharing activities are logged

## Usage Examples

### Share a file with a user

```javascript
const response = await fetch('/shares/share', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    itemId: 'file_id',
    itemType: 'file',
    sharedWithEmail: 'user@example.com',
    permissions: {
      read: true,
      write: false,
      delete: false,
      share: false
    }
  })
});
```

### Create a public link

```javascript
const response = await fetch('/shares/public-link', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    itemId: 'file_id',
    itemType: 'file',
    password: 'optional_password',
    expiresAt: '2024-12-31T23:59:59.000Z'
  })
});
```

### Access public link

```javascript
const response = await fetch('/shares/access/public-link-id', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password: 'optional_password'
  })
});
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing required fields)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found (item/user not found)
- `410` - Gone (expired link)
- `500` - Internal server error

## Testing

Use the provided test script (`test-share-api.js`) to verify all sharing endpoints:

```bash
# Install axios if not already installed
npm install axios

# Run tests (update TEST_TOKEN with valid JWT token)
node test-share-api.js
```

## Frontend Integration

The sharing feature is designed to work seamlessly with the existing frontend:

1. **Share Button**: Add share buttons to file/folder cards
2. **Share Modal**: Create a modal for sharing options
3. **Permission UI**: Add checkboxes for different permissions
4. **Public Link**: Display generated public links with copy functionality
5. **Shared Items**: Show shared items in a separate section

## Future Enhancements

1. **Bulk Sharing**: Share multiple items at once
2. **Share Groups**: Share with predefined groups of users
3. **Advanced Permissions**: More granular permission controls
4. **Share Analytics**: Track link usage and access statistics
5. **Email Notifications**: Notify users when items are shared with them
6. **Share Expiration**: Automatic cleanup of expired shares

## Dependencies

The sharing feature uses the following dependencies:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin resource sharing

## Configuration

Make sure to set the following environment variables:

- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for generating public links (optional)

## Database Indexes

The Share model includes indexes for optimal query performance:

- `{ itemId: 1, itemType: 1 }` - For finding shares by item
- `{ sharedWith: 1 }` - For finding shares by recipient
- `{ sharedBy: 1 }` - For finding shares by sender
- `{ publicLink: 1 }` - For finding shares by public link

## Performance Considerations

1. **Indexed Queries**: All queries use indexed fields
2. **Population**: Related data is populated efficiently
3. **Soft Deletes**: Maintains data integrity
4. **Caching**: Consider implementing Redis for frequently accessed shares

## Monitoring and Logging

The implementation includes comprehensive error logging:

- All errors are logged with stack traces
- Database query errors are handled gracefully
- Authentication failures are logged
- Permission violations are tracked

This sharing feature provides a robust, secure, and scalable solution for file and folder sharing in the MySky Drive application.
