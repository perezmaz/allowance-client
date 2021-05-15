/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TracingFormNotes = props => {
  const { notes } = props;
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col>
          <h5 className="mt-5 text-primary">{t('note.list.title')}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            striped
            hover
            responsive
            className="table mt-3"
          >
            <thead>
              <tr>
                <th className="w15 text-center d-none d-sm-block">{t('note.list.column1')}</th>
                <th>{t('note.list.column3')}</th>
              </tr>
            </thead>
            {notes.length > 0
              && (
                <>
                  <tbody>
                    {notes.map(record => (
                      <tr key={`note-row-${record._id}`}>
                        <td className="text-center d-none d-sm-block">
                          {record.date}
                        </td>
                        <td>
                          {record.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            {notes.length === 0
              && (
                <tbody>
                  <tr>
                    <td colSpan="2" className="text-center">
                      {t('no.records')}
                    </td>
                  </tr>
                </tbody>
              )}
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default TracingFormNotes;
