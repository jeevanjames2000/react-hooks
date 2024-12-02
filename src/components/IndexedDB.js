const dbName = "MyDynamicDatabase";
const storeName = "Users";
const request = indexedDB.open(dbName, 1);
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
  }
  console.log("Database setup complete");
};
request.onsuccess = function (event) {
  const db = event.target.result;
  console.log("Database opened successfully");
  addDataDynamically(db, {
    col1: "Dynamic Data 1",
    col2: "Dynamic Data 2",
    col3: "Dynamic Data 3",
  });
  getAllData(db);
};
request.onerror = function (event) {
  console.error("Database error:", event.target.errorCode);
};
function addDataDynamically(db, data) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.add(data);
  request.onsuccess = function () {
    console.log("Data added successfully:", data);
  };
  request.onerror = function (event) {
    console.error("Error adding data:", event.target.error);
  };
}
function getAllData(db) {
  const transaction = db.transaction([storeName], "readonly");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.getAll();
  request.onsuccess = function () {
    console.log("All data retrieved:", request.result);
  };
  request.onerror = function (event) {
    console.error("Error retrieving data:", event.target.error);
  };
}
request.onsuccess = function (event) {
  const db = event.target.result;
  addDataDynamically(db, {
    col1: "First Record",
    col2: "Sample 1",
    col3: "Example 1",
  });
  addDataDynamically(db, {
    col1: "Second Record",
    col2: "Sample 2",
    col3: "Example 2",
  });
  getAllData(db);
};
