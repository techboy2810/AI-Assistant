import React from "react";
import { Button } from "@/components/ui/button";
import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";

function AIAssistants() {
  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">
            Welcome to the world of AI Assistants 🤖{" "}
          </h2>
          <p className="text-xl mt-2">
            {" "}
            Choose your AI Campanian to Simplify Your Task 🚀
          </p>
        </div>

        <Button>Continue </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Image
          src="/fitness-coach.png"
          alt="Fitness Coach"
          width={600}
          height={600}
        />

        {AiAssistantsList.map((assistant, index) => (
          <div key={index}>
            <Image
              src={assistant.image}
              alt={assistant.title}
              width={600}
              height={600}
              className="rounded-xl w-full h-[200px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
