import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { getList } from "./api/getList";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import TableHead from "./ui/TableHead";
import { IData } from "./interface";
import TableRow from "./ui/TableRow";
import InputTableRow from "./ui/InputTableRow";
import "./index.sass";

export default function PageTable(): ReactNode | Promise<ReactNode> {
  const [rows, setRows] = useState<IData[]>([]);

  useEffect(() => {
    getList().then((resp: AxiosResponse<IData[]>) => {
      function setParentIdToRows(row: IData, parentId: number | null) {
        row.parentId = parentId;
        row.child.forEach((childRow) => {
          setParentIdToRows(childRow, row.id);
        });
      }

      const rows = resp.data;
      rows.forEach((row) => {
        setParentIdToRows(row, null);
      });
      setRows(rows);
      console.log(rows);
    });
  }, []);

  const addRow = (
    row: IData,
    currId?: number,
    type?: "create" | "update" | "delete"
  ) => {
    setRows((prev) => {
      let isFound = false;
      const traversalTree = (
        currentRow: IData,
        callback: (row: IData) => void
      ) => {
        if (isFound) return;

        if (currentRow.id === row.parentId) {
          isFound = true;
          callback(currentRow);
          return;
        }

        currentRow.child.forEach((childRow) => {
          traversalTree(childRow, callback);
        });
      };

      switch (type) {
        case "create":
          if (row.parentId) {
            const copiedRows = [...prev];
            copiedRows.forEach((currentRow) =>
              traversalTree(currentRow, (currentRow) =>
                currentRow.child.push(row)
              )
            );
            return copiedRows;
          }
          return [...prev, row];

        case "update":
          if (row.parentId) {
            const copiedRows = [...prev];
            copiedRows.forEach((currentRow) => {
              traversalTree(currentRow, (currentRow) => {
                currentRow.child = currentRow.child.map((item) =>
                  item.id === currId ? row : item
                );
              });
            });
            return copiedRows;
          }
          return prev.map((currRow) => (currRow.id === currId ? row : currRow));

        case "delete":
          if (row.parentId) {
            const copiedRows = [...prev];
            copiedRows.forEach((currentRow) =>
              traversalTree(currentRow, (currentRow) => {
                currentRow.child = currentRow.child.filter(
                  (item) => item.id !== currId
                );
              })
            );
            return copiedRows;
          }
          return prev.filter((item) => item.id !== currId);

        default:
          return prev;
      }
    });
  };

  const rowsComponent = useMemo(() => {
    return (
      <>
        {rows.length > 0 ? (
          rows.map((row) => {
            return <TableRow row={row} addRow={addRow} key={row.rowName} />;
          })
        ) : (
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
              parentId: null,
              rowName: "",
              salary: 0,
              supportCosts: 0,
              child: [],
              id: 0,
            }}
            parentId={null}
          />
        )}
      </>
    );
  }, [rows]);

  return (
    <div className="table">
      <div className="table__header">
        <span className="table__text">Строительно-монтажные работы</span>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(32, 33, 36, 1)",
          borderRadius: "0px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead />
          <TableBody>{rowsComponent}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
