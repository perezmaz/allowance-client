/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Badge,
  Tabs,
  Tab,
  Card,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { list } from '../../api/tracing';
import { list as childList } from '../../api/child';
import NoAvatar from '../../assets/img/user.png';
import api from '../../config/api';

const ChildReport = () => {
  const { t } = useTranslation();

  const [records, setRecords] = useState([]);

  const mapData = data => {
    const reportData = [];

    data.sort((a, b) => (
      a.child.name.localeCompare(b.child.name) || Moment(a.date).unix() - Moment(b.date).unix()
    ));

    data.forEach(record => {
      const findRecord = reportData.find(item => item.child.name === record.child.name);
      const percent = (record.realAmount * 100) / record.amount;
      if (!findRecord) {
        reportData.push({
          child: {
            name: record.child.name,
            age: record.child.age,
            avatar: record.child.avatar,
          },
          tracking: [
            {
              _id: record._id,
              amount: record.amount,
              date: Moment(record.date).format(t('date.partialFormat')),
              realAmount: record.realAmount,
              percent,
            },
          ],
          labels: [Moment(record.date).format(t('date.partialFormat'))],
          percents: [percent],
          activities: record.activities.map(item => (
            {
              _id: item._id,
              activity: item.activity,
              tracingPercent: item.tracingPercent,
            }
          )),
        });
      } else if (findRecord.tracking.length <= 6) {
        findRecord.tracking = [
          ...findRecord.tracking,
          {
            _id: record._id,
            amount: record.amount,
            date: Moment(record.date).format(t('date.partialFormat')),
            realAmount: record.realAmount,
            percent,
          },
        ];
        findRecord.labels = [
          ...findRecord.labels,
          Moment(record.date).format(t('date.partialFormat')),
        ];
        findRecord.percents = [
          ...findRecord.percents,
          percent,
        ];
        findRecord.activities = record.activities.map(item => {
          const findedItem = findRecord.activities
            .find(findItem => findItem.activity === item.activity);
          if (!findedItem) {
            return (
              {
                _id: item._id,
                activity: item.activity,
                tracingPercent: item.tracingPercent,
              }
            );
          }

          findedItem.tracingPercent = (item.tracingPercent + findedItem.tracingPercent) / 2;

          return (
            {
              _id: findedItem._id,
              activity: findedItem.activity,
              tracingPercent: findedItem.tracingPercent,
            }
          );
        });
      }
    });

    reportData.forEach(item => item.activities.sort((a, b) => a.tracingPercent - b.tracingPercent));

    return reportData;
  };

  useEffect(() => {
    list().then(response => {
      if (response.code === 0) {
        if (response.result.length > 0) {
          setRecords(mapData(response.result));
        } else {
          childList().then(childResponse => {
            if (childResponse.code === 0) {
              const empty = childResponse.result.map(item => (
                {
                  child: {
                    _id: item._id,
                    name: item.child.name,
                    age: item.child.age || 'N/A',
                  },
                  activities: [],
                }
              ));
              setRecords(mapData(empty));
            }
          });
        }
      }
    });
  }, []);

  const defineStatus = percent => {
    if (percent < 60 && percent >= 40) {
      return 'warning';
    }

    if (percent < 40) {
      return 'danger';
    }

    return 'success';
  };

  const defineActivities = (activities, min, max, type) => {
    const badges = [];
    activities.forEach(item => {
      if ((item.tracingPercent > min) && (item.tracingPercent < max)) {
        badges.push(
          <LinkContainer
            to={`activity/edit/${item._id}`}
            key={`badge-${type}-${item.activity}`}
          >
            <Badge
              variant={type}
              className="mr-2 text-underline"
            >
              {item.activity}
            </Badge>
          </LinkContainer>,
        );
      }
    });

    if (badges.length > 0) {
      return badges;
    }

    return (
      <h6>{t('no.records')}</h6>
    );
  };

  return (
    <Tabs defaultActiveKey="0" transition={false} id="noanim-tab-example">
      {records.map((record, index) => (
        <Tab eventKey={index} title={record.child.name} key={record.child.name}>
          <Card>
            <Card.Body>
              <Row>
                <Col className="d-flex align-items-center">
                  <img
                    src={record.child.avatar ? `${api.HOST}:${api.PORT}/avatar/${record.child.avatar}` : NoAvatar}
                    alt="Avatar"
                    className="avatar mr-3"
                  />
                  <span>
                    <h4 className="text-primary">
                      {record.child.name}
                    </h4>
                    <h6 className="text-secondary">
                      {record.child.age}
                      &nbsp;
                      {record.child.age !== 'N/A' ? t('date.years') : ''}
                    </h6>
                  </span>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md="6">
                  <h5 className="text-primary">{t('dashboard.parent.tracing')}</h5>
                  <Table
                    hover
                    responsive
                    className="table"
                  >
                    <thead>
                      <tr>
                        <th>
                          {t('dashboard.parent.list.column1')}
                        </th>
                        <th className="text-center">
                          {t('dashboard.parent.list.column2')}
                        </th>
                        <th className="text-center">
                          {t('dashboard.parent.list.column3')}
                        </th>
                        <th className="text-center">
                          {t('dashboard.parent.list.column4')}
                        </th>
                      </tr>
                    </thead>
                    {records.tracking
                      && (
                        <tbody>
                          {record.tracking.map(row => (
                            <tr key={row._id}>
                              <td>
                                <LinkContainer to={`tracing/edit/${row._id}`}>
                                  <span className="text-primary text-underline">
                                    {row.date}
                                  </span>
                                </LinkContainer>
                              </td>
                              <td className="text-center">
                                {row.amount}
                              </td>
                              <td className="text-center">
                                {row.realAmount}
                              </td>
                              <td className="text-center">
                                <Badge variant={defineStatus(row.percent)}>
                                  {row.percent}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    {!records.tracking
                      && (
                        <tbody>
                          <tr>
                            <td colSpan="4" className="text-center">
                              {t('no.records')}
                            </td>
                          </tr>
                        </tbody>
                      )}
                  </Table>
                </Col>
                <Col md="6">
                  <Line
                    data={{
                      labels: record.labels,
                      datasets: [
                        {
                          label: t('dashboard.parent.compliance'),
                          data: record.percents,
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
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6} className="mt-3">
                  <h5 className="text-primary">{t('dashboard.parent.toImprove')}</h5>
                  {defineActivities(record.activities, 0, 40, 'danger')}
                </Col>
                <Col md={6} className="mt-3">
                  <h5 className="text-primary">{t('dashboard.parent.notable')}</h5>
                  {defineActivities(record.activities, 60, 100, 'success')}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
};

export default ChildReport;
