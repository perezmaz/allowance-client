/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import ActivateForm from '../../components/user/ActivateForm';

const Activate = props => (
  <Row className="m0 p0 mt-2">
    <Col xs={{ span: 10, offset: 1 }} sm={{ span: 4, offset: 4 }}>
      <ActivateForm {...props} />
    </Col>
  </Row>
);

export default Activate;
