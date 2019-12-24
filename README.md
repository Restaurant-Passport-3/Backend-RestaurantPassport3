- [All Routes Quick Reference](#reference)

- [Authentication Routes](#authentication-routes)
  - [Register](#register)
  - [Login](#login)

# API Endpoints

## <a name="reference"></a>All Routes Quick Reference

| Method | Endpoint                  | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| POST   | `/api/auth/register`      | Creates new user                             |
| POST   | `/api/auth/login`         | Logs in user                                 |
| GET    | `/api/users`              | List of users                                |
| GET    | `/api/users/:id`          | User by ID                                   |
| GET    | `/api/users/:id/passport` | User's list of restaurants in their passport |

## <a name="authentication-routes"></a>Authentication Routes

### `/api/auth`

| Method | Endpoint    | Description      |
| ------ | ----------- | ---------------- |
| POST   | `/register` | Creates new user |
| POST   | `/login`    | Logs in user     |

<br/>

> <a name="register"></a>`POST` &nbsp;&nbsp;&nbsp;/api/auth/**register**

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

> <a name="login"></a>`POST` &nbsp;&nbsp;&nbsp;/api/auth/**login**

| Name       | Type   | Required |
| ---------- | ------ | :------: |
| `username` | String |    ✔️    |
| `password` | String |    ✔️    |

_example:_

```
{
  "username": "user",
  "password": "user"
}
```

_response:_

#### Status Code: 200 (OK)

```
{
  "message": "Logged in as user.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1NzcxNDY2NjIsImV4cCI6MTU3NzE1MDI2Mn0.YrGgLoixXVuS4j2tT_qlsfmJ0wCpRKJGHgwJGwj3dwM"
}
```

<br/>

---

<br/>

## User Routes

### `/api/users`

_Route requires authentication. Authentication token is given as a response when logging in._

| Method | Endpoint        | Description                                  |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/`             | List of users                                |
| GET    | `/:id`          | User by ID                                   |
| GET    | `/:id/passport` | User's list of restaurants in their passport |

<br/>

> `GET` &nbsp;&nbsp;&nbsp;/api/users

_response:_

#### Status Code: 200 (OK)

```
[
  {
    "id": 1,
    "username": "user",
    "password": "$2a$10$AJjOEKTH/AGD/2/DR3VgTOm4Lcf6cQvPdDGccGD.6LVlp/pj7b9PG"
  },
  {
    "id": 2,
    "username": "hugo",
    "password": "$2a$10$8xE43vi2i7sxzGhkBSrJVOOz..vD7obLto9GACv43hT9umdLNpBU2"
  }
]
```

<br/>

---

<br/>

> `GET` &nbsp;&nbsp;&nbsp;/api/users/:id

_response:_

#### Status Code: 200 (OK)

```
{
  "id": 1,
  "username": "user",
  "email": "user@user.com",
  "password": "$2a$10$AJjOEKTH/AGD/2/DR3VgTOm4Lcf6cQvPdDGccGD.6LVlp/pj7b9PG",
  "name": "Test User",
  "location": "66202"
}
```

<br/>

---

<br/>

> `GET` &nbsp;&nbsp;&nbsp;/api/users/:id/passport

_response:_

```
[
  {
    "restaurant_id": "QhzJXO6E_oLAx1Wz1Z_T2g",
    "name": "Joe's Kansas City Bar-B-Que",
    "address": "3002 W 47th Ave",
    "city": "Kansas City",
    "state": "KS",
    "zipcode": "66103",
    "phone_number": "+19137223366",
    "website_url": "https://www.yelp.com/biz/joes-kansas-city-bar-b-que-kansas-city-3?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/yDnNC9K0SWnOOV2IEyOCjw/o.jpg",
    "rating": null,
    "notes": null,
    "stamped": false,
    "user_id": 1
  },
  {
    "restaurant_id": "lPtvU9WezDkRzEvJge4sFw",
    "name": "Filling Station Coffee - Overland Park,",
    "address": "7420 Johnson Dr",
    "city": "Overland Park",
    "state": "KS",
    "zipcode": "66202",
    "phone_number": "+19138313326",
    "website_url": "https://www.yelp.com/biz/filling-station-coffee-overland-park-overland-park?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Veue4hwJ5YR5aSv00uBIeA/o.jpg",
    "rating": null,
    "notes": null,
    "stamped": false,
    "user_id": 1
  }
]
```
