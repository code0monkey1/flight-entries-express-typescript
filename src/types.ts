export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type Weather = 'sunny' | 'windy' | 'rainy' | 'cloudy';

export interface DiaryEntry {
      id: number;
      date: string;
      weather: Weather;
      visibility: Visibility;
      comment?: string; // comments are optional
    }

export type NonSensitiveDiaryEntry =Omit<DiaryEntry,'comment'>; 