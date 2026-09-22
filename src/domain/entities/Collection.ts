export default interface Collection {
  id: string;
  name: string;
  icon?: string; // path
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
