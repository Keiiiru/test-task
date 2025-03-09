import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { IData } from "../interface";

const transform = {
  input: (value: number) =>
    isNaN(value) || value === 0 ? "" : value.toString(),
  output: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const output = parseInt(e.target.value, 10);
    return isNaN(output) ? 0 : output;
  },
};

const InputController: React.FC<{
  control: Control<IData>;
  name:
    | "child"
    | "rId"
    | "id"
    | "equipmentCosts"
    | "estimatedProfit"
    | "machineOperatorSalary"
    | "mainCosts"
    | "materials"
    | "mimExploitation"
    | "overheads"
    | "parentId"
    | "rowName"
    | "salary"
    | "supportCosts"
    | `child.${number}`;
  type: string;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ control, name, type, handleKeyDown }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (...event: unknown[]) => void
  ) => {
    switch (type) {
      case "number":
        onChange(transform.output(e));
        break;
      default:
        onChange(e);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <TextField
          variant="outlined"
          onChange={(e) => handleChange(e, onChange)}
          type={type}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              height: "36px",
              "& fieldset": {
                borderColor: "rgba(65, 65, 68, 1)", // Обычный цвет
              },
              "&:hover fieldset": {
                borderColor: "rgba(65, 65, 68, 1)", // Обычный цвет
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(65, 65, 68, 1)", // В фокусе
              },
            },
          }}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
};

export default InputController;
