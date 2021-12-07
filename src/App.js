import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
import Toast from "./components/Toast";
import toastMessage from "./constants/toastType";
import apiEndPoint from "./constants/ApiEndPoints";

import './App.css';

function App() {
  const [shorturl, setShorturl] = useState("")

  const formik = useFormik({
    initialValues: {
      longurl: '',
    },
    onSubmit: values => {
      axios.post(apiEndPoint.BASE_URL + "/urls", values)
        .then(function (response) {
          console.log(response);
          setShorturl(response.data.shorturl)
          toastMessage.success("Short Link Generated!")
        })
        .catch(function (error) {
          error = { ...error }
          console.log("error", error.response.data.message);
          let msg = error.response.data.message
          setShorturl("")
          toastMessage.error(msg)

        });

    },
  });

  return (
    <div className="App">
      <h1>Link Shortening App</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="link"
          name="longurl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.longurl}
        />
        <button type="submit">Short Link</button>
      </form>
      {shorturl && <p style={{ color: "green" }}> {shorturl}</p>}
      <Toast />
    </div>
  );
}

export default App;
