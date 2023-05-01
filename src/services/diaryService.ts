
 import diaryData from '../../data/entries.json'; // this will give error initially

 import { DiaryEntry } from '../types';

    const getEntries = ():DiaryEntry[] => {
                // we are taking a risk here by asserting  the return values type to be of type DiaryEntry
                
                return (diaryData as DiaryEntry[]);
            };
              
    const addDiary = () => {
                return null;
              };
              
    export default {
                getEntries,
                addDiary
     };
      
