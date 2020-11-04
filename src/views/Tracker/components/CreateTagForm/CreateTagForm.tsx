import { TextField } from "@material-ui/core";
import React, { useState } from "react";

interface CreateTagFormProps {
  onSave: (tag: string, color: string) => void;
}

const CreateTagForm: React.FC<CreateTagFormProps> = ({ onSave }) => {
  const [tagName, setTagName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.currentTarget.value);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const color = "test";

    if (tagName && color) {
      onSave(tagName, color);
    }
  };
  return (
    <form onSubmit={handleSave}>
      <TextField id="tag-name" value={tagName} onChange={handleChange} />
    </form>
  );
};

export default CreateTagForm;
