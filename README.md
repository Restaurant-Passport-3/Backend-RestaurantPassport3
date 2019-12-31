# Table of Contents

- [All Routes Quick Reference](#reference)

- [Authentication Routes](#authentication-routes)
  - [Register](#register)
  - [Login](#login)
- [User Routes](#user-routes)
  - [Get Users](#get-users)
  - [Get User By ID](#get-user-by-id)
  - [Get Passport By User ID](#get-passport)
  - [Edit Passport Item](#edit-passport-item)
  - [Delete Passport Item](#delete-passport-item)
- [Restaurant Routes](#restaurant-routes)
  - [Get Restaurants](#get-restaurants)
  - [Get Restaurant by ID](#get-restaurant-by-id)
  - [Post Restaurant](#post-restaurant)
- [Explore Routes](#explore-routes)
  - [Explore Restaurants](#explore-restaurants)

# Deployed URL

## https://rpass.herokuapp.com/

# API Endpoints

## <a name="reference"></a>All Routes Quick Reference

| Method | Endpoint                  | Restricted | Description                                  |
| ------ | ------------------------- | :--------: | -------------------------------------------- |
| POST   | `/api/auth/register`      |            | Creates new user                             |
| POST   | `/api/auth/login`         |            | Logs in user                                 |
|        |                           |            |                                              |
| GET    | `/api/users`              |     ✔️     | List of users                                |
| GET    | `/api/users/:id`          |     ✔️     | User by ID                                   |
| GET    | `/api/users/:id/passport` |     ✔️     | User's list of restaurants in their passport |
| PUT    | `/api/users/:id/passport` |     ✔️     | Edit a passport's rating, notes, or stamp    |
| DELETE | `/api/users/:id/passport` |     ✔️     | Delete a restaurant from a user's passport   |
|        |                           |            |                                              |
| GET    | `/api/restaurants`        |            | List of restaurants in the database          |
| GET    | `/api/restaurants/:id`    |            | Returns restaurant by ID                     |
| POST   | `/api/restaurants`        |            | Adds restaurant, preferably using Yelp data  |
|        |                           |            |                                              |
| GET    | `/api/explore`            |            | Restaurants pulled from Yelp API             |

<br/>

---

<br/>

## <a name="authentication-routes"></a>Authentication Routes

### `https://rpass.herokuapp.com/api/auth`

| Method | Endpoint    | Description      |
| ------ | ----------- | ---------------- |
| POST   | `/register` | Creates new user |
| POST   | `/login`    | Logs in user     |

<br/>

---

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

## <a name="user-routes"></a>User Routes

### `https://rpass.herokuapp.com/api/users`

_Route requires authentication. Authentication token is given as a response when logging in._

| Method | Endpoint                  | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/`                       | List of users                                |
| GET    | `/:id`                    | User by ID                                   |
| GET    | `/:id/passport`           | User's list of restaurants in their passport |
| PUT    | `/api/users/:id/passport` | Edit a passport's rating, notes, or stamp    |
| DELETE | `/api/users/:id/passport` | Delete a restaurant from a user's passport   |

<br/>

---

<br/>

> <a name="get-users"></a>`GET` &nbsp;&nbsp;&nbsp;/api/users

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

> <a name="get-user-by-id"></a>`GET` &nbsp;&nbsp;&nbsp;/api/users/:id

_example:_

> https://rpass.herokuapp.com/api/users/1

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

> <a name="get-passport"></a>`GET` &nbsp;&nbsp;&nbsp;/api/users/:id/passport

_example:_

> https://rpass.herokuapp.com/api/users/1/passport

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

<br/>

---

<br/>

> <a name="edit-passport-item"></a>`PUT` &nbsp;&nbsp;&nbsp;/api/users/:id/passport

| Name            | Type    | Required | Description            |
| --------------- | ------- | :------: | ---------------------- |
| `restaurant_id` | String  |    ✔️    |                        |
| `notes`         | String  |    ✔️    |                        |
| `rating`        | Integer |    ✔️    | Must be integer 1 to 5 |
| `stamped`       | Boolean |    ✔️    |                        |

_example:_

> https://rpass.herokuapp.com/api/users/1/passport

```
{
  "restaurant_id":"QhzJXO6E_oLAx1Wz1Z_T2g",
  "notes":"I love BBQ!",
  "stamped":true,
  "rating":5
}
```

_response:_

#### Status Code: 200 (OK)

```
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
  "rating": 5,
  "notes": "I love BBQ!",
  "stamped": 1,
  "user_id": 1
}
```

<br/>

---

<br/>

> <a name="delete-passport-item"></a>`DELETE` &nbsp;&nbsp;&nbsp;/api/users/:id/passport

| Name            | Type   | Required |
| --------------- | ------ | :------: |
| `restaurant_id` | String |    ✔️    |

_example:_

> https://rpass.herokuapp.com/api/users/1/passport

```
{
  "restaurant_id":"lPtvU9WezDkRzEvJge4sFw"
}
```

_response:_

#### Status Code: 200 (OK)

```
{
  "message": "Passport item deleted successfully."
}
```

<br/>

---

<br/>

## <a name="restaurant-routes"></a>Restaurant Routes

### `https://rpass.herokuapp.com/api/restaurants`

| Method | Endpoint | Description                                 |
| ------ | -------- | ------------------------------------------- |
| GET    | `/`      | List of restaurants in database             |
| GET    | `/:id`   | Returns restaurant by ID                    |
| POST   | `/`      | Adds restaurant, preferably using Yelp data |

<br/>

---

<br/>

> <a name="get-restaurants"></a>`GET` &nbsp;&nbsp;&nbsp;/api/restaurants

_response:_

#### Status Code: 200 (OK)

```
[
  {
    "id": "QhzJXO6E_oLAx1Wz1Z_T2g",
    "name": "Joe's Kansas City Bar-B-Que",
    "address": "3002 W 47th Ave",
    "city": "Kansas City",
    "state": "KS",
    "zipcode": "66103",
    "phone_number": "+19137223366",
    "website_url": "https://www.yelp.com/biz/joes-kansas-city-bar-b-que-kansas-city-3?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/yDnNC9K0SWnOOV2IEyOCjw/o.jpg"
  },
  {
    "id": "lPtvU9WezDkRzEvJge4sFw",
    "name": "Filling Station Coffee - Overland Park,",
    "address": "7420 Johnson Dr",
    "city": "Overland Park",
    "state": "KS",
    "zipcode": "66202",
    "phone_number": "+19138313326",
    "website_url": "https://www.yelp.com/biz/filling-station-coffee-overland-park-overland-park?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Veue4hwJ5YR5aSv00uBIeA/o.jpg"
  },
  {
    "id": "EMIHhPOUxZpnnXpwjOot6w",
    "name": "R.J.'s Bob-Be-Que Shack",
    "address": "5835 Lamar Ave",
    "city": "Mission",
    "state": "KS",
    "zipcode": "66202",
    "phone_number": "+19132627300",
    "website_url": "https://www.yelp.com/biz/r-j-s-bob-be-que-shack-mission?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media1.fl.yelpcdn.com/bphoto/fCw-titamiOiQvO3BrqFOA/o.jpg"
  }
]
```

<br/>

---

<br/>

> <a name="get-restaurant-by-id"></a>`GET` &nbsp;&nbsp;&nbsp;/api/restaurants/:id

_example:_

> https://rpass.herokuapp.com/api/restaurants/QhzJXO6E_oLAx1Wz1Z_T2g

_response:_

#### Status Code: 200 (OK)

```
{
  "id": "QhzJXO6E_oLAx1Wz1Z_T2g",
  "name": "Joe's Kansas City Bar-B-Que",
  "address": "3002 W 47th Ave",
  "city": "Kansas City",
  "state": "KS",
  "zipcode": "66103",
  "phone_number": "+19137223366",
  "website_url": "https://www.yelp.com/biz/joes-kansas-city-bar-b-que-kansas-city-3?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
  "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/yDnNC9K0SWnOOV2IEyOCjw/o.jpg"
}
```

<br/>

---

<br/>

> <a name="post-restaurant"></a>`POST` &nbsp;&nbsp;&nbsp;/api/restaurants

Should use data from `/api/explore` to submit to restaurant database. Using `/api/explore` will send back an object already organized as an object to be submitted at this endpoint.

| Name           | Type   | Required | Description                               |
| -------------- | ------ | :------: | ----------------------------------------- |
| `id`           | String |    ✔️    | Should match Yelp entry's ID if it exists |
| `name`         | String |    ✔️    |
| `address`      | String |    ✔️    |
| `city`         | String |    ✔️    |
| `state`        | String |    ✔️    |
| `zipcode`      | String |    ✔️    |
| `phone_number` | String |    ✔️    |
| `website_url`  | String |    ✔️    |
| `img_url`      | String |    ✔️    |

_example:_

```
  {
    "id": "2WoigKND2DiwaO1BvcGonw",
    "name": "Jones Bar-B-Q",
    "address": "6706 Kaw Dr",
    "city": "Kansas City",
    "state": "KS",
    "zipcode": "66111",
    "phone_number": "+19137885005",
    "website_url": "https://www.yelp.com/biz/jones-bar-b-q-kansas-city?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/WLP78Fk2tjh301Y-Mqu32w/o.jpg"
  }
```

_response:_

#### Status Code: 201 (Created)

```
{
  "id": "2WoigKND2DiwaO1BvcGonw",
  "name": "Jones Bar-B-Q",
  "address": "6706 Kaw Dr",
  "city": "Kansas City",
  "state": "KS",
  "zipcode": "66111",
  "phone_number": "+19137885005",
  "website_url": "https://www.yelp.com/biz/jones-bar-b-q-kansas-city?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
  "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/WLP78Fk2tjh301Y-Mqu32w/o.jpg"
}
```

<br/>

---

<br/>

## <a name="explore-routes"></a>Explore Routes

### `https://rpass.herokuapp.com/api/explore`

| Method | Endpoint | Description                      |
| ------ | -------- | -------------------------------- |
| GET    | `/`      | Restaurants pulled from Yelp API |

<br/>

---

<br/>

> <a name="explore-restaurants"></a>`GET` &nbsp;&nbsp;&nbsp;/api/explore

Uses URL query parameters to perform search on Yelp API. Any single term can be used in `search` such as restaurant name, food types, etc. `location` should default to current user's location from the front end, otherwise it can be used to search by any location type such as zip code or city should the user input a location. Just remove the spaces and symbols from an input phrase and Yelp's API does the rest.

| URL query  | Use                       | Examples                                           |
| ---------- | ------------------------- | -------------------------------------------------- |
| `search`   | Any general search term   | `bbq`, `McDonalds`, `asian`                        |
| `location` | Any general location term | `New York City`, `NYC`, `350 5th Ave NY` , `10118` |

_example:_

> /api/explore?search=bbq&location=kansascity

_Example uses search query `bbq` and location query `kansascity`. Results are sorted automatically by Yelp API, so some non-related items may appear after the search query is exhausted. For example, searching for bbq in 66202 will eventually have non-bbq results like `Ni Hao Fresh`. Consider this if using full list of response items._

_response:_

#### Status Code: 200 (OK)

```
[
  {
    "id": "QhzJXO6E_oLAx1Wz1Z_T2g",
    "name": "Joe's Kansas City Bar-B-Que",
    "address": "3002 W 47th Ave",
    "city": "Kansas City",
    "state": "KS",
    "zipcode": "66103",
    "phone_number": "+19137223366",
    "website_url": "https://www.yelp.com/biz/joes-kansas-city-bar-b-que-kansas-city-3?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/yDnNC9K0SWnOOV2IEyOCjw/o.jpg"
  },
  {
    "id": "34I8ATMlKT6ZT3G69qwu0g",
    "name": "Q39 - Midtown",
    "address": "1000 W 39th St",
    "city": "Kansas City",
    "state": "MO",
    "zipcode": "64111",
    "phone_number": "+18162553753",
    "website_url": "https://www.yelp.com/biz/q39-midtown-kansas-city?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
    "img_url": "https://s3-media3.fl.yelpcdn.com/bphoto/V5INh2iQmRxc28MHhjO93A/o.jpg"
  }
  ...entries culled...
]
```

<br/>

---

<br/>
