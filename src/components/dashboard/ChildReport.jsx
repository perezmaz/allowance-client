/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Badge,
  Card,
} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { list as listTracing } from '../../api/tracing';
import { list as listActivities } from '../../api/activity';
import useAuth from '../../hooks/useAuth';
import UserPhoto from '../../assets/img/user.png';
import api from '../../config/api';

const ParentReport = () => {
  const { t } = useTranslation();

  const [tracing, setTracing] = useState([]);

  const [tracingActivities, setTracingActivities] = useState([]);

  const [activities, setActivities] = useState([]);

  const { user } = useAuth();

  const mapTracing = data => {
    data.sort((a, b) => (
      Moment(a.date).unix() - Moment(b.date).unix()
    ));

    const reportData = {
      labels: [],
      percents: [],
    };

    data.forEach(record => {
      const percent = (record.realAmount * 100) / record.amount;
      reportData.labels.push(Moment(record.date).format('MM-YYYY'));
      reportData.percents.push(percent);
    });
    return reportData;
  };

  const mapTracingActivities = data => {
    const reportData = [];
    data.forEach(record => (
      record.activities.forEach(activity => {
        const findActivity = reportData.find(item => item.activity === activity.activity);
        if (!findActivity) {
          reportData.push({
            activity: activity.activity,
            tracingPercent: activity.tracingPercent,
          });
        } else {
          findActivity.tracingPercent = (activity.tracingPercent + findActivity.tracingPercent) / 2;
        }
      })
    ));
    return reportData;
  };

  const mapActivities = data => (
    data.map(record => (
      {
        activity: record.activity,
        percent: record.percent,
        description: record.description,
        category: record.category.category,
      }
    ))
  );

  const getTracingPercent = activity => {
    const finded = tracingActivities.find(item => item.activity === activity);
    if (finded) {
      return finded.tracingPercent;
    }
    return null;
  };

  useEffect(() => {
    listTracing().then(response => {
      if (response.code === 0) {
        setTracing(mapTracing(response.result));
        setTracingActivities(mapTracingActivities(response.result));
      }
    });
  }, []);

  useEffect(() => {
    listActivities().then(response => {
      if (response.code === 0) {
        setActivities(mapActivities(response.result));
      }
    });
  }, []);

  return (
    <>
      <Row className="mb-4">
        <Col md="6" className="d-flex align-items-center">
          <img
            src={user.avatar ? `${api.HOST}:${api.PORT}/avatar/${user.avatar}` : UserPhoto}
            alt="Avatar"
            className="avatar mr-3"
          />
          <span>
            <h4 className="text-primary">
              {user.name}
            </h4>
            <h6 className="text-secondary">
              {user.age}
              &nbsp;
              {user.age !== 'N/A' ? t('date.years') : ''}
            </h6>
          </span>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card>
            <Card.Body>
              <Line
                data={{
                  labels: tracing.labels,
                  datasets: [
                    {
                      label: t('dashboard.parent.compliance'),
                      data: tracing.percents,
                      fill: true,
                      tension: 0.1,
                      borderColor: '#fd7e14',
                      backgroundColor: '#ffefbe',
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 120,
                    },
                  },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          {activities.map(record => (
            <Card className="mb-3" key={record.activity}>
              <Card.Body>
                <Card.Title className="text-primary mb-4">{record.activity}</Card.Title>
                <Card.Subtitle className="mb-4 text-secondary">
                  {t('dashboard.parent.compliance')}
                  : &nbsp;
                  {getTracingPercent(record.activity) || '0'}
                  &nbsp;%
                </Card.Subtitle>
                <Card.Subtitle className="mb-4">
                  <Badge variant="info" className="mr-2">
                    {record.category}
                  </Badge>
                  {getTracingPercent(record.activity)
                    && getTracingPercent(record.activity) >= 60
                    && (
                      <Badge variant="success" className="mr-2">
                        {t('dashboard.parent.notable')}
                      </Badge>
                    )}
                  {getTracingPercent(record.activity)
                    && getTracingPercent(record.activity) < 40
                    && (
                      <Badge variant="danger" className="mr-2">
                        {t('dashboard.parent.toImprove')}
                      </Badge>
                    )}
                </Card.Subtitle>
                <Card.Text>
                  {record.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ParentReport;
