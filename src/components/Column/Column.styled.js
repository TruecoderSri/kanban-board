import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 4px;

  &:first-child {
    margin-left: 0;
  }
`;

export const Container = styled.div`
  min-width: 280px;
  max-width: 280px;
  border: 1px solid #f0f0f0;
  ${"" /* background: #353535; */}
  padding: 4px;
  align-self: flex-start;
  border: 0.2 px;
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 3px 4px;
  height: 10vh;
  border-bottom: 4px solid blue;

  span {
    font-size: 18px;
    margin-left: 4px;
  }
`;

export const ColumnTitle = styled.h4`
  margin-left: 0.5rem;
  font-weight: 600;
  ${"" /* text-transform: lowercase; */}
  ${"" /* font-family: poppins, sans-serif; */}
  font-size: 16px;
  color: black;
  max-width: 140px;
  white-space: nowrap;
  ${"" /* overflow: hidden; */}
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

export const IssueCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  width: auto;
  height: 16px;
  ${"" /* border: 1px solid #fff189; */}
  ${"" /* color: #fff189; */}
  font-weight: 400;
  padding: 0 4px;
`;
