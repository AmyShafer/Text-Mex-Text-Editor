import { openDB } from 'idb';

const initdb = async () =>
  openDB('tmte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('tmte')) {
        console.log('tmte database already exists');
        return;
      }
      db.createObjectStore('tmte', { keyPath: 'id', autoIncrement: true });
      console.log('tmte database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to the database
  const tmteDB = await openDB('tmte', 1);

  // create a new transaction
  const tx = tmteDB.transaction('tmte', 'readwrite');

  // open up the desired object sore
  const store = tx.objectStore('tmte');

  // pass in the content
  const request = store.put({ id: 1, value: content});

  // get the confirmation 
  const result = await request;

  // check that you got the correct value
  console.log(result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    // connect to the database
    const tmteDB = await openDB('tmte', 1);

    // create a new transaction
    const tx = tmteDB.transaction('tmte', 'readonly');
  
    // open up the desired object sore
    const store = tx.objectStore('tmte');
  
    // pass in the content
    const request = store.get(1);
  
    // get the confirmation 
    const result = await request;
  
    // check that you got the correct value
    result ? console.log("Data Retrieved!") : console.log("Data not found.");
    return result?.value; 
};

initdb();
