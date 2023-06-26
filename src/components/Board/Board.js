import React, { useState } from "react";
import { Button, Tooltip, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import "./board.css";

import { Column, ColumnFormModal } from "../Column";
import { Columns, Container, Sidebar } from "./Board.styled";

import Storage from "../../services/StorageService";

import { generateBoard } from "../../utils/helper";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [columns, setColumns] = useState(generateBoard);
  const [columnModalVisible, setColumnModalVisible] = useState(false);

  const addColumn = (title) => {
    const newColumnList = [
      ...columns,
      {
        id: uuidv4(),
        title: title,
        issues: [],
      },
    ];
    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
    setColumnModalVisible(false);
    message.success("New column is added.");
  };

  const removeColumn = (id) => {
    const newColumnList = columns.filter((column) => column.id !== id);
    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
    message.success("Column is removed.");
  };

  const addIssue = (issueCol, issue) => {
    const newColumnList = columns.map((col) => {
      if (col.id === issueCol.id) {
        return {
          ...col,
          issues: [
            ...col.issues,
            {
              id: uuidv4(),
              title: issue.title,
              description: issue.description,
            },
          ],
        };
      }
      return col;
    });
    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
    message.success("New issue is added.");
  };

  const editIssue = (issueCol, issue) => {
    const newColumnList = columns.map((col) => {
      if (col.id === issueCol.id) {
        return {
          ...col,
          issues: col.issues.map((i) => (i.id === issue.id ? issue : i)),
        };
      }
      return col;
    });
    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
    message.success("Issue is edited.");
  };

  const removeIssue = (issueCol, issue) => {
    const newColumnList = columns.map((column) => {
      if (issueCol.id === column.id) {
        return {
          ...column,
          issues: column.issues.filter((i) => i.id !== issue.id),
        };
      }
      return column;
    });
    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
    message.success("Issue is removed.");
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const newColumnList = [...columns];

    // Moving within the same column
    if (sourceColumn === destinationColumn) {
      const newIssues = Array.from(sourceColumn.issues);
      const [removedIssue] = newIssues.splice(source.index, 1);
      newIssues.splice(destination.index, 0, removedIssue);

      newColumnList[sourceColumnIndex] = {
        ...sourceColumn,
        issues: newIssues,
      };
    } else {
      // Moving to a different column
      const sourceIssues = Array.from(sourceColumn.issues);
      const [removedIssue] = sourceIssues.splice(source.index, 1);

      const destinationIssues = Array.from(destinationColumn.issues);
      destinationIssues.splice(destination.index, 0, removedIssue);

      newColumnList[sourceColumnIndex] = {
        ...sourceColumn,
        issues: sourceIssues,
      };

      newColumnList[destinationColumnIndex] = {
        ...destinationColumn,
        issues: destinationIssues,
      };
    }

    setColumns(newColumnList);
    Storage.setItem("kanbanBoardData", newColumnList);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        <Columns>
          {columns.map((column, index) => (
            <Column
              key={column.id}
              item={column}
              isFirstColumn={index === 0}
              isLastColumn={index === columns.length - 1}
              onRemove={removeColumn}
              onIssueAdd={addIssue}
              onIssueEdit={editIssue}
              onIssueRemove={removeIssue}
            />
          ))}
          <Droppable droppableId="new-column">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Tooltip
                  placement="topLeft"
                  title="Add new column"
                  arrowPointAtCenter
                >
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => setColumnModalVisible(true)}
                  >
                    Add Column
                  </Button>
                </Tooltip>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Columns>
        <Sidebar>{/* Add sidebar content here */}</Sidebar>
      </Container>
      <ColumnFormModal
        visible={columnModalVisible}
        onSubmit={addColumn}
        onCancel={() => setColumnModalVisible(false)}
      />
    </DragDropContext>
  );
};

export default Board;
