import axios from "axios";
import { eID, url } from "../../../share/constants";

export const deleteRow = (rID: number | undefined) => {
  axios.delete(url + `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`);
};
