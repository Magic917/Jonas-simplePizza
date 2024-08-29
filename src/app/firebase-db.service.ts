import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getFirestore,getDocs,addDoc,collection, getDoc,doc, query, deleteDoc, updateDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC4ZD3nmpqSLD8przG-P4N8QJ0d3AdGBVY",
  authDomain: "jonassimplepizza.firebaseapp.com",
  projectId: "jonassimplepizza",
  storageBucket: "jonassimplepizza.appspot.com",
  messagingSenderId: "282348914899",
  appId: "1:282348914899:web:d1db6a3752dc0fcd016c26",
  measurementId: "G-XSSSPX1MP8"
};
// use firestore as db service
@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {

  private app:any;
  private db:any;
  constructor() {
    this.app=initializeApp(firebaseConfig);
    this.db=getFirestore(this.app);
   }

   // get all pizza size 
   async getSizes():Promise<any[]>{
    
    try{
      const querysnapshot=await getDocs(collection(this.db,"Pizza"));
     
      const data=querysnapshot.docs.map(doc=>{
        
        return{id:doc.id,data:doc.data()}
      });
      return Promise.resolve(data);
    }
    catch (e){
      console.error("Firestore error: pizza size data missing!",e);
      return[];
    }
   }
   //get all toppings
   async getToppings():Promise<any[]>{
    try{
      const querysnapshot=await getDocs(collection(this.db,"Toppings"));
     
      const data=querysnapshot.docs.map(doc=>{
        
        return{data:doc.data(),}
      });
      return Promise.resolve(data);
    }
    catch (e){
      console.error("Firestore error: pizza topping data missing!",e);
      return[];
    }
   }
}
