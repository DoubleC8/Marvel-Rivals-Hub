"use client";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-[17%] flex justify-between items-center border-t-[2px]
     border-[var(--accent-color)] px-4 py-5 mb-2 sm:mb-0"
    >
      <div
        className="max-w-9/10 relative flex-1 overflow-hidden rounded-lg ring-[var(--accent-color)] ring-[2px]
      shadow-sm py-1 px-3 focus-within:ring-[var(--purple)] "
      >
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message...`}
          className="block w-full resize-none border-0 text-lg
        bg-transparent placeholder:text-gray-400 placeholder:text-lg
        focus:outline-none focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <button
          className="min-w-[5.5rem] h-11 px-5 rounded-lg flex justify-center items-center
    bg-gradient-to-bl from-violet-500 to-[var(--purple)] 
    font-bold text-lg hover:cursor-pointer hover:opacity-85 ease-in-out duration-100"
          disabled={isLoading}
          onClick={sendMessage}
          type="submit"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
