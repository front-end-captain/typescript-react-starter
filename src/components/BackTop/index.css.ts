import styled from "styled-components";

const BackTopWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  height: 36px;
  font-size: 16px;
  text-align: center;
  background: #1890ff;
  border-radius: 4px;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  box-shadow: 8px 8px 6px 2px #ccc;
  transition: all 0.3s;

  &.back-top-visible {
    opacity: 1;
    width: 36px;
    pointer-events: auto;
  }

  .anticon {
    color: #fff;
    font-size: 24px;
  }
`;

export { BackTopWrapper };
