export type SidebarProps = {
  id: string;
  icon: string;
  label: string;
  name?: string;
  path?: string;
  children?: SidebarProps[];
};

export interface Profile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  gender: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
