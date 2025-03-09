import { TableCell, TableHead as TableHeadMUI, TableRow } from "@mui/material";
import { tableCellStyles } from "../styles";

const TableHead = () => {
  return (
    <TableHeadMUI>
      <TableRow>
        <TableCell
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Уровень
        </TableCell>
        <TableCell
          align="left"
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Наименование работ
        </TableCell>
        <TableCell
          align="left"
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Основная з/п
        </TableCell>
        <TableCell
          align="left"
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Оборудование
        </TableCell>
        <TableCell
          align="left"
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Накладные расходы
        </TableCell>
        <TableCell
          align="left"
          sx={{
            ...tableCellStyles,
            color: "rgba(161, 161, 170, 1)",
            fontSize: "14px",
          }}
        >
          Сметная прибыль
        </TableCell>
      </TableRow>
    </TableHeadMUI>
  );
};

export default TableHead;
