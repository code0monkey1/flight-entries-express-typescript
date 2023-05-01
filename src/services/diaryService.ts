
 import diaryData from '../../data/entries.json'; // this will give error initially
          
 /* eslint-disable @typescript-eslint/no-unsafe-return */
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
      
