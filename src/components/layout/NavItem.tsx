import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavItemProps = LinkProps

export function NavItem(props: NavItemProps) {
  const { pathname } = useLocation()
  return <Link data-current={pathname === props.to} {...props} />
}
