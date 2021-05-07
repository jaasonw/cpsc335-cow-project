import axios from "axios";

export async function getSupplierList() {
  let query = await axios.get("/api/getSupplierList");
  return query.data;
}
