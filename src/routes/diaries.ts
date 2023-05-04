import express from 'express';

const router = express.Router();

import diaryService from '../services/diaryService';

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

router.post('/', (_req, res) => {
   res.send('Saving Entry');
});

export default router;