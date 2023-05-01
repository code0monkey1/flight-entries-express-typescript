import express from 'express';

const router = express.Router();

import diaryService from '../services/diaryService';

router.get('/', (_req, res) => {
  const diaryEntries = diaryService.getEntries();
  res.json(diaryEntries);
 
});

router.post('/', (_req, res) => {
   res.send('Saving Entry');
});

export default router;