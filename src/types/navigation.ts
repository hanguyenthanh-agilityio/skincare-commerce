export interface NavLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  heading: string;
  items: string[];
}

export interface MenuItem {
  title: string;
  columns: MenuColumn[];
  imageUrl: string;
}

export interface DropdownMenuProps {
  data: MenuItem[];
}

export interface DrawerMenuProps {
  data: MenuItem[];
  navLinks: NavLink[];
}
