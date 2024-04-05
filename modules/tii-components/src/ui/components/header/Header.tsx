import React, { useState, useEffect } from "react";
import { HeaderProps, NavMenuIconState } from "../../../props";
import {
  HeaderNameBoardDiv,
  HeaderNameBoardInitialDiv,
  InternalNameBoardHeader,
  HeaderName,
  HeaderSignOut,
  HeaderWrapper,
  HeaderCollapseDiv,
} from "./Header.styles";
import { SideBarMenuFoldedIcon, SideBarMenuUnfoldIcon } from "../../icons";
import { If } from "../../constructs";

export const Header = React.memo((props: HeaderProps) => {
  const {
    navMenuIconState,
    onNavMenuIconClick,
    profile: { displayName },
    onSignOutClick,
  } = props;
  const [isNavMenuExpanded, setNavMenuExpanded] = useState(
    navMenuIconState == NavMenuIconState.EXPANDED
  );
  useEffect(() => {
    setNavMenuExpanded(navMenuIconState == NavMenuIconState.EXPANDED);
  }, [navMenuIconState]);

  // const displayName = props.profile.displayName
  const profileIcon = displayName.charAt(0).toUpperCase();

  const handleMenuClick = () => {
    const currentIsMenuIconExpanded = !isNavMenuExpanded;
    if (currentIsMenuIconExpanded) {
      onNavMenuIconClick(NavMenuIconState.EXPANDED);
    } else {
      onNavMenuIconClick(NavMenuIconState.COLLAPSED);
    }
    setNavMenuExpanded(currentIsMenuIconExpanded);
  };
  return (
    <HeaderWrapper>
      <If condition={navMenuIconState != NavMenuIconState.DISABLED}>
        <HeaderCollapseDiv
          onClick={handleMenuClick}
          data-testid="headerCollapsed"
        >
          <If condition={isNavMenuExpanded}>
            <SideBarMenuFoldedIcon />
          </If>
          <If condition={!isNavMenuExpanded}>
            <SideBarMenuUnfoldIcon />
          </If>
        </HeaderCollapseDiv>
      </If>

      <HeaderNameBoardDiv>
        <HeaderNameBoardInitialDiv>{profileIcon} </HeaderNameBoardInitialDiv>

        <InternalNameBoardHeader>
          <HeaderName>{displayName}</HeaderName>
          <HeaderSignOut onClick={onSignOutClick}>Sign Out</HeaderSignOut>
        </InternalNameBoardHeader>
      </HeaderNameBoardDiv>
    </HeaderWrapper>
  );
});
