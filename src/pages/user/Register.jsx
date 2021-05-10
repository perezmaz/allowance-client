/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import RegisterForm from '../../components/user/RegisterForm';

const Register = props => (
  <Row className="m0 p0 mt-2">
    <Col xs={{ span: 10, offset: 1 }} sm={{ span: 4, offset: 4 }}>
      <RegisterForm {...props} />
    </Col>
  </Row>
);

export default Register;
