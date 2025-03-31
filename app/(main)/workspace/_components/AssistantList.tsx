import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"; // Ensure correct import path

function AssistantList() {
  return (
    <div className="p-5 bg-secondary border-r-[1px] h-screen">
      <h2 className="font-bold text-lg">Your Personal AI Assistant</h2>

      <Button className="w-full mt-3">+ Add New Assistant</Button>

     <Input className='bg-white mt-3' placeholder='Search'/>

    </div>
  );
}

export default AssistantList;
