import express from 'express';

const router = express.Router();

import { toNewDiaryEntry } from '../../utils';

import diaryService from '../services/diaryService';

import { DiaryEntry } from '../types';

router.get('/', (_req, res) => {

  res.json(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {

   const diary = diaryService.findById(req.params.id);
    
   if(!diary)
      res.status(404).end();
   else
      res.json(diary);
});

router.post('/', (req, res) => {
  
  try{
  // proofing on the data types would be performed here:
   const diaryEntry = toNewDiaryEntry(req.body);
   
   const addedEntry:DiaryEntry =diaryService.addDiary(diaryEntry);
    
   return res.json(addedEntry);

  }catch(e){
     let errorMessage="Error : ";
   
     if(e instanceof Error)
        errorMessage+=e.message;
    
     return res.status(400).send(errorMessage);
  }
});

export default router;