
 import diaryData from '../../data/entries.json'; // this will give error initially
 
 // type assertion
 const diaries:DiaryEntry[] = diaryData as DiaryEntry[];

 import { DiaryEntry, SensitiveDiaryEntry } from '../types';

    const getEntries = ():DiaryEntry[] => {
                // we are taking a risk here by asserting  the return values type to be of type DiaryEntry
                
                return diaries;
            };
    
  
const getNonSensitiveEntries = (): SensitiveDiaryEntry[] => {
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
      
