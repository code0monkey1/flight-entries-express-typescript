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
            ---
             // Best to convert these to Enums
          export enum Visibility {
              Great = 'great',
              Good = 'good',
              Ok = 'ok',
              Poor = 'poor',
            }
            
            // export type Weather = 'sunny' | 'windy' | 'rainy' | 'cloudy';
            
            export enum Weather {
              Sunny = 'sunny',
              Rainy = 'rainy',
              Cloudy = 'cloudy',
              Stormy = 'stormy',
              Windy = 'windy',
          }
       ( You can use the  `values` of the specified keys for various operations )
      ```
    
  1. Next create a `DiaryEntry` type, which will be an interface:
  
      ```javascript
          export interface DiaryEntry {
            id: number;
            date: string;
            weather: Weather;
            visibility: Visibility;
            comment?: string; // is optional
          }
      
      ```
       >  it is recommended that `within a` flat `directory`, `each file` with a valid node module extension has a `unique filename`.
                
      ```javascript
        // type assertion to get rid of the error with the `Weather`  and `Visibility` type.
        
        const diaries:DiaryEntry[] = diaryData as DiaryEntry[];
      ```
   1. Create a `NonSensitiveDiaryEntry` _type_ using the `Omit` utility type, which will be sent to the frontend ( and has the comment removed ) .   Create a `type alias` for it too , for code readability .
     
      ```javascript
        export type NonSensitiveDiaryEntry = Omit<DiaryEntry,'comment'>
        
      ```
  1. Ensure that `comments` are filtered out from the ` getNonSensitiveEntries` , because , just put putting  the `Omit` type in the return statement , you can't just ensure that `comments` would not go to the frontend ( you need to filter out comments explicitly )
  
      >Because `TypeScript doesn't modify the actual data` but only its type, `we need to exclude the fields ourselves`
  
  1. Finally , pass the sensitive entries to the frontend via Diaries route :
          
        ```javascript
                  // routes/diaries.ts
        
                  import express from 'express';
        
                  const router = express.Router();
                  
                  import diaryService from '../services/diaryService';
                  
                  router.get('/', (_req, res) => {
                  
                    res.json(diaryService.getNonSensitiveEntries());
                   
                  });
        ```
---

### Getting a specific diary entry give it's id :
    
  1. You need to account for the undefined value , when you query for some data.  
  
      ```javascript
      // services/diaryService.ts

      const findById = (id: number): DiaryEntry | undefined => {
        const entry = diaries.find(d => d.id === id);
        return entry;
      ```
   1. The route handler for it :

        ```javascript
            // routes/diaries.ts
                    import express from 'express';
                    import diaryService from '../services/diaryService'
                    
                    router.get('/:id', (req, res) => {
                      const diary = diaryService.findById(Number(req.params.id));
                    
                      if (diary) { // here you deal with the undefined value
                        res.send(diary);
                      } else {
                        res.status(404);
                      }
                    });
        ```
                    
 
 ---

 ## Proofing external data ( Extremely important to proof all the data you get from an external source )         


  1. **Adding new Diary Entry : ( Create New Diary Operation)** 
        
      > While accepting  a new entry from an external API ,  you need to **sanitize the data properly** , to **check they belong to the expected type** . If not , you need to _throw an Exception and reject the entry at the router_ level.  

      > For this we create a utility function `toNewDataEntry`, which takes in an unknown object and return to us a `NewDiaryEntry` type object ( which is a DiaryEntry , without an `id` )  

      ```javascript
     
       import { NewDiaryEntry } from './types';

      const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {

      console.log(object); // now object is no more unused
     // the actual new entry will be sent after validation
     const newEntry: NewDiaryEntry = {
           weather: 'cloudy', // temporary fake the return value
           visibility: 'great',
           date: '2022-1-1',
           comment: 'fake news'
         };
        
         return newEntry;
      };
        
      export default toNewDiaryEntry;
      ```

      > **unknown** is the ideal type for our kind of situation of input validation, since we don't yet need to define the type to match any type, but can first verify the type and then confirm the expected type.

  1. Steps to take to  sanitize external data  by using `TypeGuards` ( Chaining different type guards in a specific order to sanitize input data )
  
      + `First level of sanitization` : ensure that the `data` is present and is of type `string`
          + isString :
       
            ```javascript
              const isString = (text: unknown):text is string=>{
                 return typeof text === "string";
              }
            ```
       + Next , we move to a more general type , eg : a Date ( you need to have verified already that it's a string before confirming that the incoming string is a Date type)
         + isDate :
           
             ```javascript
                   // you need to already know that this is a string to use this function
                  const isDate= (date:string):boolean => {
                    
                          return Boolean(Date.parse(date));
                  };
             ```
      + Next, we move to an even more general type , where we chain the above 2 functions together to get the parsedDate .
         + parseDate :
             ```javascript
               const parseDate = (date:unknown):string => {
    
                    if(!date || !isString(date) || !isDate(date)){
                        
                        throw new Error('Incorrect or missing date: ' + date);
                      }
                  
                      return date;
                  
                };
             ```
      
        + isVisibility:
          > Similarly , we can go on doing this for `comments` and `Visibility` and `Weather`  

          ```javascript
             Eg : 

            const isVisibility = (param: string): param is Visibility => {
              return Object.values(Visibility).map(v => v.toString()).includes(param);
            };
            
            const parseVisibility = (visibility: unknown): Visibility => {
              if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
                  throw new Error('Incorrect or missing visibility: ' + visibility);
              }
              return visibility;
            };

          ```    
        + *toNewDiaryEntry* : ( The final function responsible for parsing the entry and returning a sanitized entry goes something like this : )
          ```javascript
                \\ util\index.ts
                export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
                     // you need to ensure that the data you expect to parse is present
                    if ( !object || typeof object !== 'object' ) {
                      throw new Error('Incorrect or missing data');
                    }
                  
                    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {

                     // only after you've verified that the data to be parsed in present, do you go and parse it .

                      const newEntry: NewDiaryEntry = {
                        weather: parseWeather(object.weather),
                        visibility: parseVisibility(object.visibility),
                        date: parseDate(object.date),
                        comment: parseComment(object.comment)
                      };
                        
                    return newEntry;
                }
              
                throw new Error('Incorrect data: some fields are missing');
                  };
          ```
          > _What is the **comment was optional** in the above function?_
          >
          >If a field, e.g. **comment would be optional**, the type narrowing should take that into account, and the operator _in_ could **not be used** quite as we did here, since the in test requires the field to be present.
       
  1. Finally , you catch any of the parsing errors in the router accepting the entry and return the proper failure message to the client :
        
        ```javascript
             //routes/diaries.ts

            router.post('/', (req, res) => {
            
              try{
                    // proofing on the data types would be performed here:
                      const diaryEntry = toNewDiaryEntry(req.body);
                             
                      diaryService.addDiary(diaryEntry);
                              
                      return res.json(diaryEntry);
                          
                }catch(e){
                      let errorMessage="Error : ";
                             
                        if(e instanceof Error)
                          errorMessage+=e.message;
                              
                        return res.status(400).send(errorMessage);
                 }
                          
                  });
        ```