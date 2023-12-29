//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { dexieDB, updateDataFromDexieTable } from './database/cache';
import { fireDB } from './database/firebase';
import { onSnapshot, collection, where, orWhere, query } from 'firebase/firestore';
import './App.css';
import GDVapp from './GDVapp';
import SignIn from './pages/SignIn';
import TKconfirm from './pages/TKconfirm/TKconfirm';
//import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  //const navigate = useNavigate();
  const onSignIn = () => setLogin(true);

  const [logIn, setLogin] = useState(true);

  console.log(dexieDB.shipment.toArray());

  //console.log(dexieDB);
  /*useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "GDsystem"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("GDsystem").put({
          id: systemData.id,
          name: systemData.name,
          
          TKpoint: systemData.TKpoint,
        });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "TKsystem"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("TKsystem").put({
          id: systemData.id,
          name: systemData.name,
          
        });
        return;
      });
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "orders"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("orders").put({
          id: systemData.id,
          senderName: systemData.senderName,
          senderPhone: systemData.senderPhone,
          senderAddress: systemData.senderAddress,
          receiverName: systemData.receiverName,
          receiverPhone: systemData.receiverPhone,
          receiverAddress: systemData.receiverAddress,
          type: systemData.type,
          weight: systemData.weight,
          cost: systemData.cost,
          startGDpoint: systemData.startGDpoint,
          startTKpoint: systemData.startTKpoint,
          endTKpoint: systemData.endTKpoint,
          endGDpoint: systemData.endGDpoint,
          status: systemData.status,
        });
        return;
      });
      console.log("data from DexieDB: orders", dexieDB.table("orders").toArray());
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const listener = onSnapshot(
      collection(fireDB, "orderHistory"),
      (snapshot) => {
        snapshot.docChanges().forEach(async (system) => {
          const systemDoc = system.doc;
          const systemData = systemDoc.data();
          await dexieDB.table("orderHistory").put({
            id: systemData.historyID,
            orderID: systemData.orderID,
            date: systemData.date,
            currentLocation: systemData.currentLocation,
            Description: systemData.Description,
            orderStatus: systemData.orderStatus,
          });
          return;
        });
        console.log("data from DexieDB: lịch sử", dexieDB.table("orderHistory").toArray());
        //logPackageDataFromDexieDB();
      }
    );
    return () => listener();
  }, []);

  

  useEffect(() => {
    const listener = onSnapshot(collection(fireDB, "shipment"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("shipment").put({
          id: systemData.shipmentID,
          date: systemData.createDate,
          counts: systemData.Counts,
          ordersList: systemData.details,
          startGDpoint: systemData.startGDpoint,
          startTKpoint: systemData.startTKpoint,
          endTKpoint: systemData.endTKpoint,
          endGDpoint: systemData.endGDpoint,
  //        startGDpointName: systemData.startGDpoint,
  //        startTKpointName: systemData.startTKpoint,
  //        endTKpointName: systemData.endTKpoint,
  //        endGDpointName: systemData.endGDpoint,
          status: systemData.status,
        });
        return;
      });
      // logPackageDataFromDexieDB();
       console.log("data from DexieDB: shipment", dexieDB.table("shipment").toArray());
    });
    return () => listener();
  }, []);

*/


  
  return (
    <div className="App">
        {/*<Routes>
          <Route path="/" element={<SignIn transfer={onSignIn}/>} />
          <Route
            path="/home"
            element={<Dashboard />}
          />
        </Routes>
        <TKconfirm/>*/}
      {logIn ? <GDVapp/> : <SignIn transfer={onSignIn}/>}
      
    </div>
  );
}

export default App;
