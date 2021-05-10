/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle';
import ParentReport from '../../components/dashboard/ParentReport';
import ChildReport from '../../components/dashboard/ChildReport';
import useAuth from '../../hooks/useAuth';

const Dashboard = props => {
  const { t } = useTranslation();

  const { user } = useAuth();

  const pageTitle = {
    title: t('dashboard.title'),
    breadcrumbs: [],
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <PageTitle
            title={pageTitle.title}
            breadcrumbs={pageTitle.breadcrumbs}
          />
        </Col>
      </Row>
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
