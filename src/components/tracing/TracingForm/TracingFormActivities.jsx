/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Row,
  Col,
  Table,
  Form,
  Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import validate from '../../../validations';

const TracingFormActivities = props => {
  const { activities, setActivities, total, setTotal, isDisabled = false } = props;
  const { t } = useTranslation();

  const tracingPercentChange = (event, id) => {
    const { value } = event.target;
    const validatedInput = validate('number|required|length:1,3', t('tracing.subform.list.column4'), value, [], t);
    let totalActivities = 0;

    const newInputs = activities.filter(item => {
      const refItem = item;
      if (id === item._id) {
        refItem.tracingPercent = value;
        refItem.isInvalid = false;
        refItem.validationMessage = '';
        refItem.realAmount = 0;
        if (!validatedInput.isValid) {
          refItem.isInvalid = true;
          refItem.validationMessage = validatedInput.message;
        } else {
          refItem.realAmount = refItem.amount * (value / 100);
        }
      }
      totalActivities += refItem.realAmount;
      return true;
    });

    setTotal(totalActivities);
    setActivities(newInputs);
  };

  return (
    <>
      <Row>
        <Col>
          <h5 className="mt-5 text-primary">{t('tracing.subform.title')}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            striped
            hover
            responsive
            className="table mt-3 d-none d-sm-block"
          >
            <thead>
              <tr>
                <th>{t('tracing.subform.list.column1')}</th>
                <th className="w20 text-center">{t('tracing.subform.list.column2')}</th>
                <th className="w20 text-center">{t('tracing.subform.list.column3')}</th>
                <th className="w20 text-center">{t('tracing.subform.list.column4')}</th>
                <th className="w20 text-center">{t('tracing.subform.list.column5')}</th>
              </tr>
            </thead>
            {activities.length > 0
              && (
                <>
                  <tbody>
                    {activities.map((record, index) => (
                      <tr key={`activity-row-${record._id}`}>
                        <td>
                          {record.activity}
                        </td>
                        <td className="text-center">
                          {record.percent}
                        </td>
                        <td className="text-center">
                          {record.amount}
                        </td>
                        <td className="text-center">
                          <Form.Control
                            name={`percent${index}`}
                            type="text"
                            isInvalid={record.isInvalid}
                            value={record.tracingPercent}
                            onChange={e => tracingPercentChange(e, record._id)}
                            disabled={isDisabled}
                          />
                          <Form.Control.Feedback type="invalid">
                            {record.validationMessage}
                          </Form.Control.Feedback>
                        </td>
                        <td className="text-center">
                          {record.realAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light">
                      <td>
                        <strong>{t('total')}</strong>
                      </td>
                      <td colSpan="3">
                        &nbsp;
                      </td>
                      <td className="text-center text-success">
                        <strong>{total}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </>
              )}
            {activities.length === 0
              && (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center">
                      {t('no.records')}
                    </td>
                  </tr>
                </tbody>
              )}
          </Table>

          {activities.map((record, index) => (
            <Card className="mt-3 d-sm-none" border="info">
              <Card.Header as="h5" className="text-primary bg-light">
                {record.activity}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="d-flex flex-row">
                    <div className="mr-3 text-secondary">
                      <strong>
                        {t('tracing.subform.list.column2')}
                        :
                      </strong>
                    </div>
                    <div>
                      {record.percent}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-row">
                    <div className="mr-3 text-secondary">
                      <strong>
                        {t('tracing.subform.list.column3')}
                        :
                      </strong>
                    </div>
                    <div>
                      {record.amount}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-row">
                    <div className="mr-3 text-secondary">
                      <strong>
                        {t('tracing.subform.list.column4')}
                        :
                      </strong>
                    </div>
                    <div className="w20">
                      <Form.Control
                        name={`percent${index}`}
                        type="text"
                        isInvalid={record.isInvalid}
                        value={record.tracingPercent}
                        onChange={e => tracingPercentChange(e, record._id)}
                        disabled={isDisabled}
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        {record.validationMessage}
                      </Form.Control.Feedback>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-row">
                    <div className="mr-3 text-secondary">
                      <strong>
                        {t('tracing.subform.list.column5')}
                        :
                      </strong>
                    </div>
                    <div>
                      {record.realAmount}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          {activities.length === 0
            && (
              <h6>
                {t('no.records')}
              </h6>
            )}
        </Col>
      </Row>
    </>
  );
};

export default TracingFormActivities;
