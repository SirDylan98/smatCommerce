import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Layout() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  console.log("Is the side bar open", sideBarOpen);
  return (
    <div className="bg-neutral-100 h-screen w-full  flex flex-row">
  
    	<div className="flex flex-col w-full lg:w-[80%] xl:w-[85%] flex-1">
    		<Header sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
    		<div className="flex-1 p-4 px-0 min-h-0 w-full overflow-y-auto overscroll-x-none">
    			<Outlet />
    		</div>
    	</div>
    </div>


  );
}
