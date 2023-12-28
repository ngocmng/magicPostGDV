import Dexie from "dexie";
import { fireDB } from "./firebase";
import {
  doc, getDoc, getDocs, deleteDoc, updateDoc, setDoc,
  collection, query, where
} from "firebase/firestore";

const dexieDB = new Dexie("cached");
dexieDB.version(0).stores({
  GDsystem: "id, name, TKid, TKname",
  TKsystem: "id, name",
  orders: "id, status, regisDate",
  shipment: "shipmentID, createDate, Counts",
  //delivery: "id, GDpoint"
  orderHistory: "id, orderID, date, currentLocation",
});



const loadUserState = (email) => {
    localStorage.setItem("email", email);
    const emailName = email.slice(0, email.indexOf("@")).toUpperCase();
    //let id = "";
    let center = "";
    if (emailName.length > 4 && emailName.slice(0, 2) == "GD") {
        center = emailName.slice(0, 4);
        localStorage.setItem("center", center);
    }
  
    const loadProfile = async () => {
      const useDoc = await getDoc(doc(fireDB, "GDsystem", localStorage.getItem("center")));
      const data = useDoc.data();
      const TKname = data.TKpoint;
      const TKsystemRef = collection(fireDB, "TKsystem");
        let q = query(TKsystemRef, where('name', '==', TKname));
        let querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            // Nếu có ít nhất một bản ghi khớp, lấy ID của bản ghi đầu tiên
            querySnapshot.forEach((doc) => {
              localStorage.setItem("diemTK", doc.id);
            })
          }
      // const useDocCenter = await getDoc(doc(fireDB, center, idCenter));
      // const dataCenter = useDocCenter.data();
      // console.log(dataCenter);
      
    }
    loadProfile();
  };
  
const clearUserState = () => {
    ["center", "diemTK"].forEach((key) =>
      localStorage.setItem(key, "")
    );
};

async function deleteDataFromFireStoreAndDexie(collectionName, id) {
  try {
    const docRef = doc(fireDB, collectionName, id);
    await deleteDoc(docRef);
    await deleteDataFromDexieTable(collectionName, id);
    alert("Xóa tài khoản thành công!");
  } catch (error) {
    console.error("Loi khi xoa trong firestore: ", error);
  }
}

async function deleteDataFromDexieTable(tableName, id) {
  dexieDB
    .table(tableName)
    .where("id")
    .equals(id)
    .delete()
    .then(() => {
      console.log("xoa trong dexieDB");
    })
    .catch((error) => {
      console.error("Loi khi xoa data dexieDB", error);
    });
}

async function updateDataFromFireStoreAndDexie(collectionName, id, newData) {
  try {
    const docRef = doc(fireDB, collectionName, id);
    await updateDoc(docRef, newData);
    await updateDataFromDexieTable(collectionName, id, newData);
    alert("Cập nhật thông tin tài khoản thành công!");
  } catch (error) {
    console.error("Loi khi update trong firestore: ", error);
  }
}

async function updateDataFromDexieTable(tableName, id, newData) {
  try {
    await dexieDB.table(tableName).update(id, newData);
    console.log("update dexieDB");
  } catch (error) {
    console.error("Loi khi update data dexieDB", error);
  }
}

async function addDataToFireStoreAndDexie(collectionName, newData) {
  try {
    const docRef = doc(fireDB, collectionName, newData.id);
    await setDoc(docRef, newData);
    await addDataToDexieTable(collectionName, newData);
    if (collectionName === "orders") {
      alert("Đơn hàng đã được thêm thành công");
    }
    
    if(collectionName === "shipment") 
    alert("Đơn chuyển hàng đã được thêm thành công");
  } catch (error) {
    console.error("Loi khi add trong firestore: ", error);
  }
}

async function addDataToDexieTable(tableName, newData) {
  try {
    await dexieDB.table(tableName).add(newData);
    console.log("add dexieDB");
  } catch (error) {
    console.error("Loi khi add data dexieDB", error);
    console.log(dexieDB.table(tableName));
  }
}

export {dexieDB, loadUserState, clearUserState, 
        deleteDataFromFireStoreAndDexie, deleteDataFromDexieTable,
        updateDataFromFireStoreAndDexie, updateDataFromDexieTable, 
        addDataToFireStoreAndDexie, addDataToDexieTable, 
    };
  