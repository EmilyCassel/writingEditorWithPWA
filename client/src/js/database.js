import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, { //this si the jate database
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) { //this is jate object store
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("posting to database")

  let jateDb = await openDB("jate", 1) //reference to jate database
  let text = jateDb.transaction("jate", "readwrite") //jate object store 
  let jateStore = text.objectStore("jate")
  let requestObject = jateStore.put({value : content, id : 1})
  let result = await requestObject
  console.log("Save Successful", result)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log("data retrieval")
  
    let jateDb = await openDB("jate", 1) //reference to jate database
    let text = jateDb.transaction("jate", "readonly") //jate object store 
    let jateStore = text.objectStore("jate")
    let requestObject = jateStore.get(1)
    let result = await requestObject
    console.log("result.value", result)
    return result?.value
};

initdb();