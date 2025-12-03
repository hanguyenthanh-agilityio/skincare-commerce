export interface MenuColumn {
  heading: string;
  items: string[];
}

export interface DrawerMenuItem {
  title: string;
  columns: MenuColumn[];
  imageUrl: string;
}

export interface DropdownMenuProps {
  data: DrawerMenuItem[];
}
