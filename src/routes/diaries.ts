import express from 'express';

const router = express.Router();

import diaryService from '../services/diaryService';

router.get('/', (_req, res) => {

  res.json(diaryService.getNonSensitiveEntries());
 
});

router.get("/:id", (req, res) => {
 
   const {id} = req.params;
   res.json(diaryService.findById(id));

});

router.post('/', (_req, res) => {
   res.send('Saving Entry');
});

export default router;