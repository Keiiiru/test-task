import axios from "axios";
import { eID, url } from "../../../share/constants";

export const getList = () =>
  axios.get(url + `/v1/outlay-rows/entity/${eID}/row/list`);
