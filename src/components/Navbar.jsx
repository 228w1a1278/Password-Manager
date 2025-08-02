import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-33 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt; </span>
          <span>Pass</span><span className="text-green-500">OP/&gt;
          
          </span>
        </div>
      {/* <ul>
        <li className="flex gap-4">
          <a className="hover:font-bold" href="/">Home</a>
          <a className="hover:font-bold" href="#">About</a>
          <a className="hover:font-bold" href="#">Contact</a>
        </li>
      </ul> */}
      <button className="text-black  bg-green-400 my-5 rounded-full flex justify-center items-center ring-white ring-1">
      <img className="invert w-12 p-1 rounded-full"src="/assets/Github.png" alt="" />
      <a
  href="https://github.com/your-username/your-repo"
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="font-bold px-1">Github</span>
</a>
     </button>
     {/* <button className="text-black  bg-green-400 my-5 rounded-full flex justify-center items-center ring-white ring-1">
      <img className="invert w-12 p-1 rounded-full"src="/assets/Github.png" alt="" />
      <span className="font-bold px-1">Github</span>
     </button> */}
    </div>
    </nav>
  );
}; 

export default Navbar;
