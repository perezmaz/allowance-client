/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const PageTitle = props => {
  const location = useLocation();
  const { pathname } = location;
  const { title, breadcrumbs } = props;

  return (
    <div className="d-flex flex-row">
      <h5 className="text-primary m0 p0">
        {title}
      </h5>
      <Breadcrumb className="m0 p0 breadcrumb ml-auto d-none d-md-block">
        {breadcrumbs.map(item => (
          <LinkContainer
            key={`breadcrumbs-${item.link}`}
            to={item.url}
          >
            <Breadcrumb.Item
              active={item.url === pathname}
            >
              {item.link}
            </Breadcrumb.Item>
          </LinkContainer>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default PageTitle;
