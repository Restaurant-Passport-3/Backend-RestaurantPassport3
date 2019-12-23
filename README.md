# API Endpoints

## Authentication Routes

### `/api/auth`

| Method | Endpoint    | Description      |
| ------ | ----------- | ---------------- |
| POST   | `/register` | Creates new user |
| POST   | `/login`    | Logs in user     |

<br/><br/>

> /api/auth/**register**

| Name       | Type   | Required | Unique | Description |
| ---------- | ------ | :------: | :----: | ----------- |
| `username` | String |    ✔️    |   ✔️   |             |
| `password` | String |    ✔️    |        |             |
| `email`    | String |    ✔️    |   ✔️   |             |
| `name`     | String |    ✔️    |        |             |
| `location` | String |    ✔️    |        |             |

_example:_

```
{
  "id": 1,
  "username": "user",
  "email": "user@user.com",
  "password": "user",
  "name": "Test User",
  "location": "12345"
}
```

_response:_

#### Status Code: 201 (Created)

```
{
  "id": 1,
  "username": "user",
  "email": "user@user.com",
  "password": "$2a$10$shpB7zTtfvgvYbuGkappjePwu5z3bqdZKexkr8MwZCqv3dAlYAGAu",
  "name": "Test User",
  "location": "12345"
}
```

<br/>

---

<br/>

> /api/auth/**login**

| Name       | Type   | Required |
| ---------- | ------ | :------: |
| `username` | String |    ✔️    |
| `password` | String |    ✔️    |

<br/><br/>

## User Routes
