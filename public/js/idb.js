let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function (event) { 
    const db = event.target.result; 
    db.createObjectStore('pending_transaction', {
      autoIncrement: true
    });
  };

request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = function (event) {
    console.log("Sorry!" + event.target.errorCode);
  };


  window.addEventListener("online", checkDatabase);