import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Navbar from "./Navbar";
import "../css/write.css";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    title: "",
    body: "",
    firstname: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token2");
    if (!token) {
      navigate("/login");  // Redirect to login if no token
    } else {
      const fetchFirstName = async () => {
        const res1 = await fetch("http://localhost:8999", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-access-token": token,
          },
        });
        const { firstName } = await res1.json();
        setValue(prevValue => ({ ...prevValue, firstname: firstName }));
      };
      fetchFirstName();
    }
  }, [navigate]);

  const handleBlog = async () => {
    const json = JSON.stringify(value);
    const res = await fetch("http://localhost:8999/blog", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token2"),
      },
    });
    if (res.ok) {
      setValue({
        title: "",
        body: "",
        firstname: "",
      });
      alert("Blog is Posted");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="body">
        <div className="main-div">
          <input
            value={value.title}
            type="text"
            placeholder="enter the title..."
            onChange={(e) => setValue({ ...value, title: e.target.value })}
          />
          <ReactQuill
            value={value.body}
            onChange={(content) => {
              setValue({ ...value, body: content });
            }}
            theme="snow"
            style={{
              color: "black",
              fontSize: "1.1rem",
              height: "35vh",
              border: "none",
            }}
          />
          <button className="button" onClick={handleBlog}>
            publish
          </button>
        </div>
      </div>
    </>
  );
}

export default Write;