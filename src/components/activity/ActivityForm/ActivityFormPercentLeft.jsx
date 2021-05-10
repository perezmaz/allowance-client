/* eslint-disable react/prop-types */
import React from 'react';
import {
  Col,
  Row,
  Alert,
} from 'react-bootstrap';

const ActivityFormPercentLeft = props => {
  const { percentLeft } = props;
  return (
    <Row>
      <Col>
        <Alert variant="info" className="fs-13 text-center">
          Porcentaje disponible&nbsp;
          {percentLeft}
        </Alert>
      </Col>
    </Row>
  );
};

export default ActivityFormPercentLeft;
