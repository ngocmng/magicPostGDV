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

  console.log(dexieDB);

  useEffect(() => {
    /*dexieDB.table("orders")
    .where("id")
    .equals("DH279")
    .modify((record) => {
      record.status = "Đang chuyển đến điểm GD nhận";
    });
    //.update({ status: "Đang chuyển đến điểm GD nhận" });*/

    dexieDB.table("orders").toArray().then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error('Lỗi khi truy vấn dữ liệu:', error);
    });
  }, [])

  /*useEffect(() => {
    
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
              startGDpoint: systemData.startGDpoint,
              startTKpoint: systemData.startTKpoint,
              endTKpoint: systemData.endTKpoint,
              endGDpoint: systemData.endGDpoint,
              type: systemData.type,
              weight: systemData.weight,
              cost: systemData.cost,
              status: systemData.status,
            });
        return;
      });
      console.log(dexieDB);
      //logPackageDataFromDexieDB();
    });
    return () => listener();
  }, []);*/

  /*useEffect(() => {
    //const q = query(collection(fireDB, "shipment"));

    const listener = onSnapshot(collection(fireDB, "shipment"), (snapshot) => {
      snapshot.docChanges().forEach(async (system) => {
        const systemDoc = system.doc;
        const systemData = systemDoc.data();
        await dexieDB.table("shipment").put({
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

      dexieDB.table("shipment").toArray().then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Lỗi khi truy vấn dữ liệu:', error);
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
        </Routes>
        <TKconfirm/>*/}
      {logIn ? <GDVapp/> : <SignIn transfer={onSignIn}/>}
      
    </div>
  );
}

export default App;
