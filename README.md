# Flight Entries Diary

## Problem Statement :  _Ilari wants to be able to keep track of his experiences on his flight journeys_


### Functional Requirements :

  1. An endpoint that returns all flight diary entries
  1. He wants to be able to save diary entries
   


**Fields in a Diary Entry** :

  + The `Date` of the entry
  + `Weather` conditions (good, windy, rainy or stormy)
  + `Visibility` (good, ok or poor)
  + Free text `Comment` detailing the experience


**Json Data of Initial Diary Entries** :
  ```json
      [
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
]
  ```

---

### Decisions on how to structure our source code 

1. Place all source code under src directory, so source code is not mixed with configuration files.
      - move `index.ts` to src
      - change dev script to`"dev": "ts-node-dev src/index.ts"` 