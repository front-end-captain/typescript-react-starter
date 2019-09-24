import styled from "styled-components";
import { navMenuMaxWidth, navMenuMinWidth } from "@/style/theme.css";

const NavMenuWrapper = styled.div`
  flex: 0 0 ${navMenuMaxWidth}px;
  max-width: ${navMenuMaxWidth}px;
  min-width: ${navMenuMaxWidth}px;
  width: ${navMenuMaxWidth}px;

  &.nav-menu-collapsed {
    flex: 0 0 ${navMenuMinWidth}px;
    max-width: ${navMenuMinWidth}px;
    min-width: ${navMenuMinWidth}px;
    width: ${navMenuMinWidth}px;

    .nav-menu {
      .nav-link {
        span {
          display: none;
        }
      }
    }
  }

  .logo-container {
    display: flex;
    align-items: center;
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #001529;
    transition: all 0.3s;

    img {
      width: 36px;
    }

    h1 {
      padding-left: 24px;
      display: inline-block;
      color: #fff;
      font-size: 24px;
      flex: 1 1;
    }
  }

  .nav-menu {
    height: calc(100% - 64px);

    .nav-link {
      display: inline-block;
    }
  }
`;

export { NavMenuWrapper };
