export interface Transaction {
  id: number;
  supplier_id: number;
  date: string;
  delivery_cost: number;
  quantity: number;
  cost: number;
  owner_id: string;
}
