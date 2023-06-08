## Follow Router

| Method | End Point                   | Description   | Bearer Token | JSON Reqeust |
| :----- | :-------------------------- | :------------ | :----------- | :----------- |
| GET    | `/follow/:following_name`   | Follow user   | _Required_   | x            |
| GET    | `/unfollow/:following_name` | Unfollow user | _Required_   | x            |

## User Router

| Method | End Point                  | Description              | Bearer Token | JSON Request          |
| :----- | :------------------------- | :----------------------- | :----------- | --------------------- |
| GET    | `/users/profile/:username` | Get users profile        | x            |                       |
| GET    | `/users/verify/:token`     | Verify user account      | x            | x                     |
| GET    | `/users/sendmail`          | Send verify email again  | _Required_   | x                     |
| POST   | `/users/register`          | Create user ( Register ) | x            | [click](#create-user) |
| POST   | `/users/login`             | Login                    | x            | [click](#login-user)  |
| PUT    | `/users/update`            | Update user (req pass)   | _Required_   |                       |

### Create User

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### Login User

```json
{
  "username": "string",
  "password": "string"
}
```
