import React, { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({title: ""});
  const [records, setRecords] = useState([]);
  // const [items, setItems] = useState([]);  

 // These methods will update the state properties.
 function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

   // This function will handle the submission.
 async function addItem(e) {
  e.preventDefault();

  // When a post request is sent to the create url, we'll add a new record to the database.
  const newPerson = { ...form };

  await fetch("http://localhost:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  })
  .catch(error => {
    window.alert(error);
    return;
  });

  setForm({ title: ""});
  // navigate("/");
}
useEffect(() => {
  async function getRecords() {
    const response = await fetch(`http://localhost:5000/todo/data/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
  }

  getRecords();

  return;
}, [form]);


console.log(records)

 // This method will delete a record
 async function deleteRecord(id) {
  await fetch(`http://localhost:5000/${id}`, {
    method: "DELETE"
  });

  const newRecords = records.filter((el) => el._id !== id);
  setRecords(newRecords);
}



  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form className="form" onSubmit={addItem}>
        <input 
        onChange={(e) => updateForm({title: e.target.value})} 
        type="text" 
        id="title" 
        value={form.title} />
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
      <div>
      <ul>
        {records.map((record, _id) => 
           <li key={_id}>{record.title}<span><button onClick={() => {deleteRecord(record._id)}} className="delete">x</button></span></li>
        )}

      </ul>
      </div>
    </div>
  );
}

export default App;
