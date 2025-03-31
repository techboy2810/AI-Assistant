import React from "react";
import  Provider  from "./provider";


function Workspacelayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <div>
      <Provider>
        {children}
      </Provider>
    </div>
  )
}

export default Workspacelayout;
