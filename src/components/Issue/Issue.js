import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IssueTitle } from "./Issue.styled";

const { Paragraph } = Typography;

const Issue = ({ item, onEdit, onRemove, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            style={{ padding: "0.5rem" }}
            actions={[
              <EditOutlined key="edit" onClick={onEdit} />,
              <DeleteOutlined
                key="delete"
                onClick={onRemove}
                style={{ color: "red" }}
              />,
            ]}
          >
            <IssueTitle>{item.title}</IssueTitle>
            <div className="flex flex-container">
              <div
                className="flex flex-col"
                style={{ fontSize: "15px", marginTop: "0.5rem" }}
              >
                <p>Mathur Family</p>
              </div>
              <div
                className="sub-details"
                style={{ fontSize: "13px", fontWeight: "700", opacity: "0.8" }}
              >
                <p>$30,000 | 8/26/2020</p>
              </div>
            </div>
            {/* <Paragraph className="mh-100 description">{item.description}</Paragraph> */}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

Issue.propTypes = {
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  index: PropTypes.number,
};

export default Issue;
