/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint no-eval: 0 */
import React from 'react';
import {
  Button,
  Form,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  BsFillTrashFill,
  BsPencil,
  BsPlus,
  BsFillEyeFill,
} from 'react-icons/bs';

const MainList = props => {
  const {
    newItem,
    tableData,
    tableColumns,
    actions,
  } = props;

  const showIcon = (icon, text) => {
    switch (icon) {
      case 'editar':
      case 'edit':
        return <BsPencil title={text} />;
      case 'eliminar':
      case 'delete':
        return <BsFillTrashFill title={text} />;
      case 'ver':
      case 'show':
        return <BsFillEyeFill title={text} />;
      default:
        return text;
    }
  };

  return (
    <div className="panel">
      {newItem
        && (
          <>
            <LinkContainer to={newItem.url}>
              <Button
                variant="primary"
              >
                <BsPlus className="icon" />
                {newItem.link}
              </Button>
            </LinkContainer>
          </>
        )}
      {tableData.map(item => (
        <Card key={`card-${item._id}`} className="mt-3" border="info">
          <Card.Header as="h5" className="text-primary bg-light">
            {eval(`item.${tableColumns[0].value}`)}
          </Card.Header>
          <Card.Body>
            {tableColumns.map((column, index) => {
              if (index > 0) {
                if (column.type === 'checkbox') {
                  return (
                    <Row key={`row-${item._id}-${column.title}`} className="mb-3">
                      <Col className="d-flex flex-row">
                        <div className="mr-3 text-secondary">
                          <strong>
                            {column.title}
                            :&nbsp;
                          </strong>
                        </div>
                        <div>
                          <Form.Check
                            type="checkbox"
                            checked={eval(`item.${column.value}`)}
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row>
                  );
                }
                return (
                  <Row key={`row-${item._id}-${column.title}`}>
                    <Col className="d-flex flex-row">
                      <div className="mr-3 text-secondary">
                        <strong>
                          {column.title}
                          :&nbsp;
                        </strong>
                      </div>
                      <div>
                        {eval(`item.${column.value}`)}
                      </div>
                    </Col>
                  </Row>
                );
              }
              return '';
            })}
          </Card.Body>
          <Card.Footer className="d-flex flex-row bg-white">
            {actions.map(action => {
              if (action.url) {
                return (
                  <div key={`table-action-column-${item.id}-${action.text}`}>
                    <LinkContainer to={action.url ? `${action.url}/${item._id}` : '#'}>
                      <Button
                        variant={action.variant}
                        className="mr-2"
                      >
                        {showIcon(action.icon, action.text)}
                        &nbsp;
                        {action.text}
                      </Button>
                    </LinkContainer>
                  </div>
                );
              }
              return (
                <div key={`table-action-column-${item.id}-${action.text}`}>
                  <Button
                    variant={action.variant}
                    className="mr-2"
                    onClick={e => action.onClick(e, item._id, eval(`item.${action.recordName}`))}
                  >
                    {showIcon(action.icon, action.text)}
                    &nbsp;
                    {action.text}
                  </Button>
                </div>
              );
            })}
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default MainList;
