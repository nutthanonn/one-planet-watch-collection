## Follow Router

| Method | End Point                   | Description   | Bearer Token | JSON Response |
| :----- | :-------------------------- | :------------ | :----------- | :------------ |
| GET    | `/follow/:following_name`   | Follow user   | _Required_   | x             |
| GET    | `/unfollow/:following_name` | Unfollow user | _Required_   | x             |

## User Router

| Method | End Point                  | Description              | Bearer Token | JSON Response               |
| :----- | :------------------------- | :----------------------- | :----------- | --------------------------- |
| GET    | `/users/profile/:username` | Get users profile        | x            | [click](#get-users-profile) |
| GET    | `/users/verify/:token`     | Verify user account      | x            | x                           |
| GET    | `/users/sendmail`          | Send verify email again  | _Required_   | x                           |
| POST   | `/users/register`          | Create user ( Register ) | x            | [click](#create-user)       |
| POST   | `/users/login`             | Login                    | x            | [click](#login-user)        |
| PUT    | `/users/update`            | Update user (req pass)   | _Required_   | [click](#update-user)       |

### Get users profile

```json
{
  "data": {
    "username": "nutthanon",
    "email": "nutthanon.tho@gmail.com",
    "follower": null,
    "following": null,
    "verified": false,
    "membership": false,
    "created_at": "2023-03-11T08:09:29.473Z"
  },
  "error": false,
  "message": "user data",
  "status": "success"
}
```

### Create user

```json
{
  "data": {
    "token": "<YOUR_TOKEN>"
  },
  "error": false,
  "message": "User registration successful",
  "status": "success"
}
```

### Login user

```json
{
  "data": {
    "token": "<YOUR_TOKEN>"
  },
  "error": false,
  "message": "user login successful",
  "status": "success"
}
```

### Update user

```json
{
  "data": null,
  "error": false,
  "message": "user update successful",
  "status": "success"
}
```
