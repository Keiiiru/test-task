export interface IData {
  child: IData[];
  rId?: number;
  id: number;
  equipmentCosts: number | undefined;
  estimatedProfit: number | undefined;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number | undefined;
  parentId: number | null;
  rowName: string | undefined;
  salary: number | undefined;
  supportCosts: number;
}
