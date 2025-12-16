export interface NavLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  heading: string;
  items: NavLink[];
}

export interface MenuItem {
  title: string;
  columns: MenuColumn[];
  imageUrl: string;
}

export interface DropdownMenuProps {
  data: MenuItem[];
  className?: string;
}

export interface DrawerMenuProps {
  data: MenuItem[];
  navLinks: NavLink[];
}
