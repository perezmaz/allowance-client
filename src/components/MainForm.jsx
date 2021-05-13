/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'moment/locale/es';
import Datetime from 'react-datetime';
import { LinkContainer } from 'react-router-bootstrap';
import UploadAvatar from './UploadAvatar';
import validate from '../validations';

const MainForm = props => {
  const {
    information,
    controls,
    actions,
    inputs = [],
    setInputs = () => {},
    hasDivider = true,
    formHeader = '',
    formFooter = '',
    extendForm = '',
  } = props;

  const { t } = useTranslation();

  const onInputChange = (event, afterChange) => {
    const { name, value, checked } = event.target;
    let newValue = value;
    if (event.target.type === 'checkbox') {
      newValue = checked;
    }
    const control = controls.find(aux => aux.name === name);
    let validatedInput = null;
    const { validation, label } = control;
    if (validation) {
      validatedInput = validate(validation, label, value, inputs, t);
    }

    const newInputs = inputs.filter(item => {
      const refItem = item;
      if (refItem.name === name) {
        refItem.value = newValue;
        refItem.isInvalid = false;
        refItem.validationMessage = '';
        if ((validatedInput) && (!validatedInput.isValid)) {
          refItem.isInvalid = true;
          refItem.validationMessage = validatedInput.message;
        }
      }
      return true;
    });

    setInputs(newInputs);

    if (afterChange) {
      afterChange(event);
    }
  };

  const onAvatarChange = data => {
    const { name, file, preview } = data;
    const newInputs = inputs.filter(item => {
      const refItem = item;
      if (refItem.name === name) {
        refItem.value = preview;
        refItem.file = file;
      }
      return true;
    });

    setInputs(newInputs);
  };

  const defineDateProps = control => (
    {
      name: control.name,
      disabled: control.disabled ? control.disabled : false,
      readOnly: true,
    }
  );

  const showControl = control => {
    const simpleTypes = ['text', 'email', 'password'];
    const complexTypes = ['textarea', 'select'];

    switch (control.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'textarea':
      case 'select':
        return (
          <Form.Control
            name={control.name}
            type={simpleTypes.find(item => item === control.type) ? control.type : undefined}
            disabled={control.disabled ? control.disabled : false}
            readOnly={control.readOnly ? control.readOnly : false}
            plaintext={control.readOnly ? control.readOnly : false}
            isInvalid={inputs.find(aux => aux.name === control.name).isInvalid}
            value={inputs.find(aux => aux.name === control.name).value}
            as={complexTypes.find(item => item === control.type) ? control.type : undefined}
            onChange={(
              control.afterChange ? e => onInputChange(e, control.afterChange) : onInputChange
            )}
            rows={control.rows ? control.rows : 3}
          >
            {control.options && control.options.map(option => (
              <option
                value={option.value}
                key={`${control.name}-option-${option.text}`}
              >
                {option.text}
              </option>
            ))}
          </Form.Control>
        );
      case 'datetime':
        return (
          <Datetime
            dateFormat={t('date.format')}
            timeFormat={false}
            locale={t('date.locale')}
            inputProps={defineDateProps(control)}
            value={inputs.find(aux => aux.name === control.name).value !== '' ? inputs.find(aux => aux.name === control.name).value : new Date()}
            utc
            onChange={date => {
              const newInputs = inputs.filter(item => {
                const refItem = item;
                if (refItem.name === control.name) {
                  refItem.value = date.format(t('date.format'));
                }
                return true;
              });
              setInputs(newInputs);

              if (control.afterChange) {
                control.afterChange(date.format(t('date.format')));
              }
            }}
          />
        );
      case 'checkbox':
      case 'radio':
      case 'multi-checkbox':
      case 'multi-radio':
        if (['multi-checkbox', 'multi-radio'].find(item => item === control.type)) {
          const type = control.type.replace('multi-', '');
          const renderControl = [];

          control.options.forEach(option => {
            renderControl.push(
              <Form.Check
                key={`check-${option.text}`}
                type={type}
                label={option.text}
                inline
                disabled={control.disabled ? control.disabled : false}
                value="1"
              />,
            );
          });

          return (
            <div>
              {renderControl}
            </div>
          );
        }

        return (
          <Form.Check
            name={control.name}
            type={control.type}
            disabled={control.disabled ? control.disabled : false}
            checked={inputs.find(aux => aux.name === control.name).value}
            onChange={onInputChange}
            value={inputs.find(aux => aux.name === control.name).value}
          />
        );
      case 'link':
        return (
          <LinkContainer
            to={control.url}
            className="m0 p0"
          >
            <Button variant="link">{control.label}</Button>
          </LinkContainer>
        );
      case 'avatar':
        return (
          <UploadAvatar
            avatar={inputs.find(aux => aux.name === control.name).value}
            setAvatar={onAvatarChange}
            name={control.name}
          />
        );
      default:
        return '';
    }
  };

  const createControl = control => (
    <Form.Group controlId={control.id}>
      {control.type !== 'link' && (
        <Form.Label>
          {control.label}
          {control.validation && control.validation.search('required') > -1
            && <span className="text-danger ml-1">*</span>}
        </Form.Label>
      )}
      {showControl(control)}
      <Form.Control.Feedback type="invalid">
        {inputs.find(aux => aux.name === control.name) ? inputs.find(aux => aux.name === control.name).validationMessage : ''}
      </Form.Control.Feedback>
    </Form.Group>
  );

  const validateAll = (event, submit) => {
    const newInputs = [];
    let formValid = true;

    controls.forEach(control => {
      const input = inputs.find(aux => aux.name === control.name);
      if (input) {
        input.isInvalid = false;
        input.validationMessage = '';
        if (control.validation) {
          const validatedInput = validate(
            control.validation,
            control.label,
            input.value,
            inputs,
            t,
          );
          if (!validatedInput.isValid) {
            formValid = false;
            input.isInvalid = true;
            input.validationMessage = validatedInput.message;
          }
        }
        newInputs.push(input);
      }
    });

    setInputs(newInputs);

    if (formValid) {
      submit(event);
    }
  };

  return (
    <div className="panel">
      <Form>
        {formHeader}
        <Row>
          {controls.map(control => (
            <Col
              key={`col-control-${control.name}`}
              xs={control.sizeXs}
              md={control.sizeMd}
            >
              {createControl(control)}
            </Col>
          ))}
        </Row>
        {extendForm}
        {hasDivider && (
          <Row>
            <Col className="divider" />
          </Row>
        )}
        <Row>
          <Col className="d-flex flex-row align-items-center">
            <div className="d-none d-md-block">
              {information}
            </div>
            <div className="ml-auto">
              {actions.map(action => {
                if (action.url) {
                  return (
                    <LinkContainer
                      to={action.url ? action.url : '#'}
                      key={`form-link-${action.text}`}
                    >
                      <Button
                        variant={action.variant}
                        className="mr-2"
                        title={action.text}
                      >
                        {action.text}
                      </Button>
                    </LinkContainer>
                  );
                }
                return (
                  <Button
                    key={`form-action-${action.text}`}
                    variant={action.variant}
                    className="mr-2"
                    title={action.text}
                    onClick={e => validateAll(e, action.onClick)}
                  >
                    {action.text}
                  </Button>
                );
              })}
            </div>
          </Col>
        </Row>
        {formFooter}
      </Form>
    </div>
  );
};

export default MainForm;
