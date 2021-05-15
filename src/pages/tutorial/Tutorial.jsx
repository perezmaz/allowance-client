/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Wizard from '../../components/tutorial/Wizard';

const Tutorial = props => (
  <Container fluid="sm">
    <Row>
      <Col>
        <Wizard {...props} />
      </Col>
    </Row>
  </Container>
);

export default Tutorial;
