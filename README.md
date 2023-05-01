# Flight Entries Diary

## Problem Statement :  _Ilari wants to be able to keep track of his experiences on his flight journeys_


### Functional Requirements :

  1. An endpoint that returns all flight diary entries
  1. He wants to be able to save diary entries
   


**Fields in a Diary Entry** :

  + The `Date` of the entry
  + `Weather` conditions (`good`, `windy`, `rainy` or `stormy`)
  + `Visibility` (`good`, `ok` or `poor`)
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

### Decisions on how to structure our source code 

1. Place all source code under src directory, so source code is not mixed with configuration files.
      - move `index.ts` to src
      - change dev script to`"dev": "ts-node-dev src/index.ts"`
   
1. Place all `routers` and modules which are responsible for handling a set of specific resources such as diaries, under the directory `src/routes`.
      - `Router` taking care of all diary endpoints is in [`src/routes/diaries.ts`](./src/routes/diaries.ts "view source code") 
      - We'll route all requests to prefix `/api/diaries` to that specific router in `index.ts` like so : 
          ```javascript

          //index.ts

          import express from 'express';
          import diaryRouter from './routes/diaries'; // <- change here
          const app = express();
          app.use(express.json());
          
          const PORT = 3000;
          
          app.get('/ping', (_req, res) => {
            console.log('someone pinged here');
            res.send('pong');
          });
          
          app.use('/api/diaries', diaryRouter); // <- change here
          
          
          app.listen(PORT, () => {
              console.log(`Server running on port ${PORT}`);
          });
                   
          ```
    -  GET request to `http://localhost:3000/api/diaries` , should return message:  
         -  _Fetching all diaries!_
    
1. Write code for data manipulation in `src/services directory`
    
    - First, save the `entries.json` data to `data/entries.json`
    - Create a `src/services` directory and place the `diaryService.ts` file in it.
  
        ```javascript
            //diaryService.ts 
            import diaryData from '../../data/entries.json'; // this will give error 
              
            const getEntries = () => {
                return diaryData;
              };
              
            const addDiary = () => {
                return null;
              };
              
            export default {
                getEntries,
                addDiary
                };
      
        ```  
    - To get rid of the following error ,  add `"resolveJsonModule": true` to our `tsconfig.json` file :
       
       ```javascript

          Cannot find module '../../data/entries.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.ts(2732)

       ```

   - Add `/* eslint-disable @typescript-eslint/no-unsafe-return */` on top of` const getEntries = () => {` , till we define our types.
  
  
----------------------------------------------------------------

### Defining our types :

   > Create a file for our types, `types.ts`, where we'll define all our types for this project

  1. Type the `Weather` and `Visibility` values using a union type of the allowed strings in [types.ts](./src/types.ts "go to source code")
   
      ```javascript
         export type Visibility = 'great' | 'good' | 'ok' | 'poor';

         export type Weather = 'good' | 'windy' | 'rainy' | 'stormy';
      ```
    
  1. Next create a `DiaryEntry` type, which will be an interface:
  
      ```javascript
          export interface DiaryEntry {
            id: number;
            date: string;
            weather: Weather;
            visibility: Visibility;
            comment: string;
          }
      
      ```
  1. Type our imported JSON:
          