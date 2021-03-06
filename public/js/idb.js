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

  function saveRecord(record) {
    const transaction = db.transaction(["pending_transaction"], "readwrite");
    const store = transaction.objectStore("pending_transaction");
  
    store.add(record);
  }

  function checkDatabase() {
    const transaction = db.transaction(["pending_transaction"], "readwrite");
    const store = transaction.objectStore("pending_transaction");
    const getAll = store.getAll();
    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
              method: "POST",
              body: JSON.stringify(getAll.result),
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
              }
            })
            .then(response => response.json())
            .then(() => {
              // delete records if successful
              const transaction = db.transaction(["pending_transaction"], "readwrite");
              const store = transaction.objectStore("pending_transaction");
              store.clear();
            });
        }
      };
    }

    function deletePending() {
        const transaction = db.transaction(["pending_transaction"], "readwrite");
        const store = transaction.objectStore("pending_transaction");
        store.clear();
      }
      
      window.addEventListener("online", checkDatabase);