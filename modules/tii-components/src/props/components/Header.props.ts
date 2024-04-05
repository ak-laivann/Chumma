import { ProfileObject } from "../constructs";

export enum NavMenuIconState {
  EXPANDED,
  COLLAPSED,
  DISABLED,
}
export interface HeaderProps {
  profile: ProfileObject;
  onSignOutClick: () => void;
  navMenuIconState: NavMenuIconState;
  onNavMenuIconClick: (a: NavMenuIconState) => void;
}
