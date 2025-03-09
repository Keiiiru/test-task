import { TableCell, TableRow as TableRowMUI } from "@mui/material";
import { tableCellStyles } from "../styles";
import { useForm } from "react-hook-form";
import InputController from "./InputController";
import { createRow } from "../api/createRow";
import { IData } from "../interface";
import FileIcon from "../../../assets/icons/FileIcon";
import { updateRow } from "../api/updateRow";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

const InputTableRow: React.FC<{
  addRow: (
    row: IData,
    rId?: number,
    type?: "create" | "update" | "delete"
  ) => void;
  parentId: number | null;
  type: string;
  row: IData;
  setIsChanging?: Dispatch<SetStateAction<boolean>>;
  setIsAdding?: Dispatch<SetStateAction<boolean>>;
}> = ({ addRow, type, row, setIsChanging, parentId }) => {
  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm({
    defaultValues: { ...row },
    mode: "onChange",
  });

  const handleSubmit = useCallback(() => {
    const values = getValues();
    console.log(row);
    if (isDirty) {
      const data: IData = {
        equipmentCosts: values.equipmentCosts,
        estimatedProfit: values.estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: values.overheads,
        parentId: parentId ?? null,
        rowName: values.rowName,
        salary: values.salary,
        supportCosts: 0,
        child: row.child,
        id: row.id,
      };

      if (type === "create") {
        createRow(data).then((resp) => (data.id = resp.data.current.id));
        addRow(data, row.id, "create");
      } else {
        updateRow(data);
        addRow(data, row.id, "update");
      }
    }

    if (setIsChanging) {
      setIsChanging((prev) => !prev);
    }
  }, [getValues, row, isDirty, setIsChanging, parentId, type, addRow]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleSubmit]);

  return (
    <TableRowMUI sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={tableCellStyles}>
        <FileIcon />
      </TableCell>

      <TableCell
        align="left"
        sx={{
          ...tableCellStyles,
          width: "50%",
        }}
      >
        <InputController control={control} name="rowName" type="string" />
      </TableCell>

      <TableCell align="left" sx={tableCellStyles}>
        <InputController control={control} name="salary" type="number" />
      </TableCell>

      <TableCell align="left" sx={tableCellStyles}>
        <InputController
          control={control}
          name="equipmentCosts"
          type="number"
        />
      </TableCell>

      <TableCell align="left" sx={tableCellStyles}>
        <InputController control={control} name="overheads" type="number" />
      </TableCell>

      <TableCell align="left" sx={tableCellStyles}>
        <InputController
          control={control}
          name="estimatedProfit"
          type="number"
        />
      </TableCell>
    </TableRowMUI>
  );
};

export default InputTableRow;
