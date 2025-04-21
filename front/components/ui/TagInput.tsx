import React, { KeyboardEvent, useState } from "react";
import { X } from "lucide-react";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

const TagInput = ({ value, onChange, placeholder }: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = input.trim();

      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex-1 flex flex-wrap gap-2 p-2  rounded-md bg-background -primary focus-within:border-primary">
      <div>
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-1 rounded-md bg-primary/10 text-primary text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-primary/20 rounded-full p-0.5"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=""
        className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
      />
    </div>
  );
};

export default TagInput;
