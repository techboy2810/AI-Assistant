"use client";
// This is a client component
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import AiAssistantsList from "@/services/AiAssistantsList";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useConvex, useMutation } from "convex/react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { Loader, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);

  const insertAssistant = useMutation(
    api.userAiAssistants.insertSelectedAssistant
  );
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    user&& GetUserAiAssistants();
  }, [user]);

  const GetUserAiAssistants = async () => {
    const result = await convex.query(api.userAiAssistants.GetAllUserAiAssistants, {
      uid: user._id,
    });
    console.log(result);
    if (result.length > 0) {
      router.replace("/workspace");
      return;
    }
  };

  const onSelect = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id == assistant.id
    );
    if (item) {
      setSelectedAssistant(
        selectedAssistant.filter((item: ASSISTANT) => item.id !== assistant.id)
      );
      return;
    }
    setSelectedAssistant((prev) => [...prev, assistant]);
  };

  const IsAssistantSelected = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id == assistant.id
    );
    return item ? true : false;
  };

  const onClickContinue = async () => {
    if (!user?._id) {
      console.error("User ID is missing. Ensure the user is authenticated.");
      return;
    }

    setLoading(true);
    try {
      const result = await insertAssistant({
        records: selectedAssistant,
        uid: user._id, // Ensure `uid` is not undefined
      });
      console.log(result);
    } catch (error) {
      console.error("Mutation failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold">
              Welcome to the world of AI Assistants
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <p className="text-xl mt-2">
              Choose your AI Campanian to Simplify Your Task 🚀
            </p>
          </BlurFade>
        </div>

        <Button
          disabled={selectedAssistant?.length == 0 || loading}
          onClick={onClickContinue}>
          {loading ? <Loader2Icon className="animate-spin" /> : "Continue"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={index}
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
              onClick={() => onSelect(assistant)}>
              <Checkbox
                className="absolute m-2"
                checked={IsAssistantSelected(assistant)}
              />

              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">
                {assistant.name}{" "}
              </h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}{" "}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;
