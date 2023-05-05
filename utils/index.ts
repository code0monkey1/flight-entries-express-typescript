import { NewDiaryEntry } from "../src/types";

// const isString = (text: unknown):text is string=>{
   
//   return typeof text === "string";

// };

// const isNumber = (text: unknown):text is number=>{
     
//      return !isNaN(Number(text));
// };



export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {

 console.log(object); // now object is no more unused
 const newEntry: NewDiaryEntry = {
   weather: 'cloudy', // fake the return value
   visibility: 'great',
   date: '2022-1-1',
   comment: 'fake news'
 };

 return newEntry;
};

