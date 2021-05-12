/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import React from 'react';
import ParentReport from '../../components/dashboard/ParentReport';
import ChildReport from '../../components/dashboard/ChildReport';
import useAuth from '../../hooks/useAuth';

const Dashboard = props => {
  const { user } = useAuth();

  return (
    <Container fluid="sm">
      <Row className="mt-4">
        <Col>
          {user.role === 'child'
            && (
              <ChildReport {...props} />
            )}
          {user.role === 'parent'
            && (
              <ParentReport {...props} />
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
