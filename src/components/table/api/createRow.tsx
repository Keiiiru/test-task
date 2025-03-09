import axios, { AxiosResponse } from "axios";
import { eID, url } from "../../../share/constants";
import { IData } from "../interface";

export const createRow = ({
  equipmentCosts = 0,
  estimatedProfit = 0,
  machineOperatorSalary = 0,
  mainCosts = 0,
  materials = 0,
  mimExploitation = 0,
  overheads = 0,
  parentId = null,
  rowName = "",
  salary = 0,
  supportCosts = 0,
}: IData): Promise<AxiosResponse> =>
  axios.post(url + `/v1/outlay-rows/entity/${eID}/row/create`, {
    equipmentCosts,
    estimatedProfit,
    machineOperatorSalary,
    mainCosts,
    materials,
    mimExploitation,
    overheads,
    parentId,
    rowName,
    salary,
    supportCosts,
  });
