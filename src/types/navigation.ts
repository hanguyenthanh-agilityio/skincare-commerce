export interface MenuColumn {
  heading: string;
  items: string[];
}

export interface MenuItem {
  title: string;
  columns: MenuColumn[];
  imageUrl: string;
}

export interface HeaderMenuProps {
  data: MenuItem[];
}
