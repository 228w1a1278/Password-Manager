import React, { useEffect, useRef, useState } from "react";

import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordARray] = useState([]);
  const showPassword = () => {
    // alert("show the password");
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/assets/closeicon.png")) {
      ref.current.src = "/assets/openicon.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/assets/closeicon.png";
      passwordRef.current.type = "text";
    }
  };


  const getPasswords=async() =>{
    let req=await fetch("http://localhost:3000/")
    let passwords=await req.json()
    console.log(passwords)
    setPasswordARray(passwords)
  }
  useEffect(() => {
   getPasswords()
  }, []);

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // Create a new unique ID for the password entry
      const newId = uuidv4();
      const newEntry = { ...form, id: newId };
  
      // Send POST request to save the new password in MongoDB
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
  
      // Update the state with the new password entry
      setPasswordARray([...passwordArray, newEntry]);
  
      // Reset the form fields
      setform({ site: "", username: "", password: "" });
  
      // Show success toast
      toast("Password saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // If validation fails, show an error toast
      toast("Error: Password not saved");
    }
  };
  
  const deletePassword = async (id) => {
    console.log("Deleting the password with id " + id);
    let c=confirm("Do you really want to delete this password")
    if(c){
    const newPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordARray(newPasswords);
    // localStorage.setItem("password", JSON.stringify(newPasswords));
    let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})})
    toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

   } };
  

  const editPassword = (id) => {
    toast("Password Edited", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("Editing the password with id" + id);
    setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
    const newPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordARray(newPasswords);
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>
      </div>
      <div className="   p-2 md:mycontainer min-h-[85.2vh]">
        <h1 className="=text-4xl text font-bold text-center">
          <span className="text-green-500">&lt; </span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-[70%] p-4 py-1"
          />

          <div className="flex  flex-col md:flex-row w-[70%] justify-between gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              className="rounded-full border border-green-500 w-[70%] p-3 py-1"
            />
            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
                className="rounded-full border border-green-500 w-[90%] p-3 py-1"
              />
              <span
                className="absolute right-[30px] top-[9px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/assets/openicon.png"
                  alt="openeye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400 gap-2 border border-green-900"
          >
            <lord-icon
              style={{ width: "25px", height: "25px" }}
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save{" "}
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl  w-[70%] mx-auto py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div className="text-center text-gray-600">
              No passwords to show
            </div>
          ) : (
            <table className="table-auto w-[70%] mx-auto rounded-md overflow-hidden mb-10">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" flex items-center justify-center py-2 border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border-white text-center ">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;