//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { dexieDB } from './database/cache';
import { fireStore } from './database/firebase';
import { onSnapshot, collection, where, orWhere, query } from 'firebase/firestore';
import './App.css';
import GDVapp from './GDVapp';
import SignIn from './pages/SignIn';
//import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  //const navigate = useNavigate();
  const onSignIn = () => setLogin(true);

  const [logIn, setLogin] = useState(true);

  /*useEffect(() => {
    //const q = query(collection(fireStore, "shipment"));

    const listener = onSnapshot(collection(fireStore, "shipment"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("shipments").put({
              id: systemData.id,
              createDate: systemData.createDate,
              Counts : systemData.Counts,
              startGDpoint: systemData.startGDpoint,
              startTKpoint: systemData.startTKpoint,
              endTKpoint: systemData.endTKpoint,
              endGDpoint: systemData.endGDpoint,
              details: systemData.details,
            });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);*/
  
  return (
    <div className="App">
        {/*<Routes>
          <Route path="/" element={<SignIn transfer={onSignIn}/>} />
          <Route
            path="/home"
            element={<Dashboard />}
          />
        </Routes>*/}
      {logIn ? <GDVapp/> : <SignIn transfer={onSignIn}/>}
    </div>
  );
}

export default App;
