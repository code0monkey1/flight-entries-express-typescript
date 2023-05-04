
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
    
    const addDiary = () => {
                return null;
              };
              
    export default {
                getEntries,
                getNonSensitiveEntries,
                addDiary
     };
      
