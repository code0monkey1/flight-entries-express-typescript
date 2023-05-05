import { NewDiaryEntry, Visibility, Weather } from "../src/types";

const isString = (text: unknown):text is string=>{
   
  return typeof text === "string";

};

const isDate= (date:string):boolean => {
  
        return Boolean(Date.parse(date));
};

const parseDate = (date:unknown):string => {
  
  if(!date || !isString(date) || !isDate(date)){
      
      throw new Error('Incorrect or missing date: ' + date);
    }

    return date;

};

const parseComment = (comment:unknown):string => {

   if(!comment || !isString(comment)){
     throw new Error('Incorrect or missing comment: ' + comment);
   }
   return comment;
};

const isWeather=(weather:string):weather is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(weather);
};
const parseWeather=(weather:unknown): Weather => {
     
     // all validation happened here , where it was confirmed that the weather is valid
     if(!weather || !isString(weather) || !isWeather(weather)){
      throw new Error("The weather is an invalid value : "+weather);
     }
     
     return weather;
};

const isVisibility=(visibility:string):visibility is Visibility => {
   
  return Object.values(Visibility).map(v => v.toString()).includes(visibility);

};
const parseVisibility=(visibility:unknown):Visibility => {
  
    if(!visibility || !isString(visibility) || !isVisibility(visibility)){
      throw new Error("The visibility is invalid "+visibility);
    }

    return visibility;
};
export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {

     console.debug("debugging the object received",JSON.stringify(object,null,2)); // now object is no more unused
      
    if(!object || typeof object !== "object") {
      throw new Error("Invalid input");
    }

    if( !("comment" in object)||
      !("date" in object ) || 
      !("weather" in object) || 
      !("visibility" in object)) {

        throw new Error("Fields in input missing "+ JSON.stringify(object,null,2));
    }

  const newEntry: NewDiaryEntry = {
    weather: parseWeather(object.weather), 
    visibility: parseVisibility(object.visibility),
    date: parseDate(object.date),
    comment: parseComment(object.comment),
  };

 return newEntry;
};

