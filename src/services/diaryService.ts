
 import diaryData from '../../data/entries.json'; // this will give error initially
 
 // type assertion
 const diaries:DiaryEntry[] = diaryData as DiaryEntry[];
 // we are taking a risk here by asserting 
 // ideally you'd use a type guard
                
 import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

 const getEntries = ():DiaryEntry[] => {
               
                return diaries;
            };
    
  
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  // you need to filter the comment out , as otherwise you would leak
  // the sensitive  `comments` data to the frontend.
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));

};

const findById= (id:string):DiaryEntry|undefined => {
    
   // if diary entry with given id is not found , then `undefined` will be returned
    const diaryEntry = diaries.find( entry => entry.id+"" === id);

    return diaryEntry;
};


    
    const addDiary = () => {
                return null;
              };
              
    export default {
                getEntries,
                getNonSensitiveEntries,
                addDiary,
                findById
     };
      
