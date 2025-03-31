import { div } from "motion/react-m";
import React from "react";
import AssistantList from "./_components/AssistantList";

function Workspace() {
  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5 h-full">
        {/* Assistant List  */}
        <div className="hidden md:block">
          <AssistantList />
        </div>

        {/* Chat UI */}
        <div className=" md:col-span-4 lg:col-span-3">
          {/* Chat UI */}
          CHAT UI
        </div>

        {/* Settings */}
        <div className="hidden lg:block ">
          SETTINGS
        </div>
      </div>
    </div>
  );
}

export default Workspace;
