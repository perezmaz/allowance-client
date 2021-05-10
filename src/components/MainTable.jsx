/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint no-eval: 0 */
import React from 'react';
import {
  Table,
  Button,
  Pagination,
  Form,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  BsFillTrashFill,
  BsPencil,
  BsPlus,
  BsFillEyeFill,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const MainTable = props => {
  const {
    newItem,
    tableData,
    tablePages,
    tableColumns,
    actions,
    location,
  } = props;

  const { t } = useTranslation();

  const { pathname } = location;

  const showIcon = (icon, text) => {
    switch (icon) {
      case 'editar':
      case 'edit':
        return <BsPencil title={text} />;
      case 'eliminar':
      case 'delete':
        return <BsFillTrashFill title={text} />;
      case 'ver':
      case 'show':
        return <BsFillEyeFill title={text} />;
      default:
        return text;
    }
  };

  const showPages = () => {
    const pages = [];
    for (let i = 1; i <= tablePages.pages; i += 1) {
      pages.push(
        <LinkContainer
          to={`${pathname}?page=${i}`}
          key={`page-${i}`}
        >
          <Pagination.Item active={i === tablePages.activePage}>
            {i}
          </Pagination.Item>
        </LinkContainer>,
      );
    }

    return pages;
  };

  return (
    <div className="panel">
      {newItem
        && (
          <>
            <LinkContainer to={newItem.url}>
              <Button
                variant="primary"
              >
                <BsPlus className="icon" />
                {newItem.link}
              </Button>
            </LinkContainer>
          </>
        )}
      <Table
        striped
        hover
        responsive
        className="table mt-3"
      >
        <thead>
          <tr>
            {tableColumns.map(item => (
              <th key={`table-title-${item.title}`} className={item.style}>
                {item.title}
              </th>
            ))}
            <th className="w15">
              &nbsp;
            </th>
          </tr>
        </thead>
        {tableData.length > 0
          && (
            <tbody>
              {tableData.map(item => (
                <tr key={`table-data-row-${item._id}`}>
                  {tableColumns.map(column => {
                    if (column.type === 'checkbox') {
                      return (
                        <td key={`table-data-column-${item._id}-${column.title}`} className={column.style}>
                          <Form.Check
                            type="checkbox"
                            checked={eval(`item.${column.value}`)}
                            readOnly
                          />
                        </td>
                      );
                    }
                    return (
                      <td key={`table-data-column-${item._id}-${column.title}`} className={column.style}>
                        {eval(`item.${column.value}`)}
                      </td>
                    );
                  })}
                  <td className="d-flex flex-row justify-content-end">
                    {actions.map(action => {
                      if (action.url) {
                        return (
                          <div key={`table-action-column-${item.id}-${action.text}`}>
                            <LinkContainer to={action.url ? `${action.url}/${item._id}` : '#'}>
                              <Button
                                variant={action.variant}
                                className="mr-2"
                                title={action.text}
                                size="sm"
                              >
                                {showIcon(action.icon, action.text)}
                              </Button>
                            </LinkContainer>
                          </div>
                        );
                      }
                      return (
                        <div key={`table-action-column-${item.id}-${action.text}`}>
                          <Button
                            variant={action.variant}
                            className="mr-2"
                            title={action.text}
                            size="sm"
                            onClick={e => action.onClick(e, item._id, eval(`item.${action.recordName}`))}
                          >
                            {showIcon(action.icon, action.text)}
                          </Button>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        {tableData.length === 0
          && (
            <tbody>
              <tr>
                <td
                  colSpan={tableColumns.length + 1}
                  className="text-center"
                >
                  {t('no.records')}
                </td>
              </tr>
            </tbody>
          )}
      </Table>
      {tablePages.paginate && (
        <div className="d-flex flex-row">
          <h6 className="align-self-start font-bold pt-2 d-none d-sm-block">
            Mostrando
            &nbsp;
            {tablePages.totalPage}
            &nbsp;
            registros de
            &nbsp;
            {tablePages.totalRecords}
            &nbsp;
            registros
          </h6>
          <Pagination className="ml-auto" size="sm">
            {showPages()}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MainTable;
