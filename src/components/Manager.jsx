import React, { useEffect, useRef, useState } from "react";

  import { ToastContainer, toast,Bounce } from 'react-toastify';
  
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

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordARray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    setPasswordARray([...passwordArray, form]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] });
  };

  const copyText =(text)=>{
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)
  }
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
      <div className="  mycontainer">
        <h1 className="=text-4xl text font-bold text-center">
          <span className="text-green-500">&lt; </span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-[70%] p-4 py-1"
          />

          <div className="flex w-[70%] justify-between gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="username"
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
           style={{width:"25px",height:"25px"}}
       src="https://cdn.lordicon.com/hqymfzvj.json"
       trigger="hover">
</lord-icon>
            Add Password{" "}
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl  w-[70%] mx-auto py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-[70%] mx-auto rounded-md overflow-hidden">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
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
                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.site)}
                        >
                        <lord-icon
                        style={{width:"25px",height:"25px","paddingTop":"3px","paddingLeft":"3px"}}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                        ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border-white text-center w-32">
                      <div className="flex items-center justify-center">
                      <span>{item.username}</span>

                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.username)}
                        >
                        <lord-icon
                        style={{width:"25px",height:"25px","paddingTop":"3px","paddingLeft":"3px"}}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                        ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border-white text-center w-32">
                      <div className="flex items-center justify-center">
                      <span>{item.password}</span>

                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.password)}
                        >
                        <lord-icon
                        style={{width:"25px",height:"25px","paddingTop":"3px","paddingLeft":"3px"}}
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                        ></lord-icon>
                        </div>
                        </div>
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
