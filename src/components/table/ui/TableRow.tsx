import { TableCell, TableRow as TableRowMUI } from "@mui/material";
import FileIcon from "../../../assets/icons/FileIcon";
import { tableCellStyles } from "../styles";
import { IData } from "../interface";
import { useState } from "react";
import InputTableRow from "./InputTableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { deleteRow } from "../api/deleteRow";

const TableRow = ({
  row,
  addRow,
  depth = 0,
}: {
  row: IData;
  addRow: (
    row: IData,
    rId?: number,
    type?: "create" | "update" | "delete"
  ) => void;
  depth?: number;
}) => {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isAddingChild, setIsAddingChild] = useState<boolean>(false);
  console.log(row);

  const handleDelete = () => {
    deleteRow(row.id);
    addRow(row, row.id, "delete");
  };

  return (
    <>
      {!isChanging ? (
        <TableRowMUI
          key={row.rowName}
          onDoubleClick={() => {
            setIsChanging((prev) => !prev);
          }}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell
            component="th"
            scope="row"
            sx={{
              ...tableCellStyles,
              position: "relative",
              pl: `${depth * 24 + 16}px`,
              pt: `32px`,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                borderColor: "#fff",
              },
              "&::before":
                depth !== 0
                  ? {
                      width: "12px",
                      borderBottom: "1px solid #fff",
                      left: `${depth * 24 + 4}px`,
                      top: "calc(65% - 1px)",
                      transform: "translateY(-50%)",
                    }
                  : {},
              "&::after":
                depth !== 0
                  ? {
                      borderLeft: "1px solid #fff",
                      minHeight: "100%",
                      left: `${depth * 24 + 4}px`,
                      top: "-30px",
                      zIndex: "0",
                    }
                  : {},
            }}
          >
            <div className="icons">
              <div
                className="file-icon"
                onClick={() => setIsAddingChild((prev) => !prev)}
              >
                <FileIcon />
              </div>
              <div className="delete-icon" onClick={handleDelete}>
                <DeleteIcon />
              </div>
            </div>
          </TableCell>

          <TableCell
            align="left"
            sx={{
              ...tableCellStyles,
              width: "50%",
            }}
          >
            {row.rowName}
          </TableCell>

          <TableCell align="left" sx={tableCellStyles}>
            {row.equipmentCosts}
          </TableCell>

          <TableCell align="left" sx={tableCellStyles}>
            {row.salary}
          </TableCell>

          <TableCell align="left" sx={tableCellStyles}>
            {row.overheads}
          </TableCell>

          <TableCell align="left" sx={tableCellStyles}>
            {row.estimatedProfit}
          </TableCell>
        </TableRowMUI>
      ) : (
        <InputTableRow
          addRow={addRow}
          type="update"
          row={row}
          setIsChanging={setIsChanging}
          parentId={row.parentId}
        />
      )}
      {isAddingChild && (
        <InputTableRow
          addRow={addRow}
          type="create"
          row={{
            equipmentCosts: 0,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: row.id, // обязательно здесь!
            rowName: "",
            salary: 0,
            supportCosts: 0,
            child: [],
            id: 0, // или генерируйте уникальный id, если требуется
          }}
          parentId={row.id}
          setIsChanging={setIsAddingChild}
        />
      )}
      {row.child &&
        row.child.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            addRow={addRow}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

export default TableRow;
