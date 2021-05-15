/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  BsFillGridFill,
} from 'react-icons/bs';
import {
  GiPiggyBank,
  GiStairsGoal,
} from 'react-icons/gi';
import {
  FaClipboardList,
  FaChild,
  FaHome,
} from 'react-icons/fa';
import {
  Card,
  Button,
} from 'react-bootstrap';
import ChildForm from '../child/ChildForm';
import AllowanceForm from '../allowance/AllowanceForm';
import CategoryForm from '../category/CategoryForm';
import ActivityForm from '../activity/ActivityForm';
import { TUTORIAL } from '../../config/localStorage';
import { logout } from '../../api/auth';

const Wizard = props => {
  const [steps, setSteps] = useState([true, true, true, true, true, true]);

  const [currentStep, setCurrentStep] = useState(0);

  const activateStep = currentIndex => {
    const buttons = document.getElementsByClassName('wizard-menu-button');
    for (let i = 0; i < buttons.length; i += 1) {
      const index = +buttons[i].id.split('-')[1];
      const content = document.getElementById(`content-${index}`);
      content.classList.add('d-none');
      if (index < currentIndex) {
        buttons[i].classList.remove('btn-dark', 'text-dark', 'btn-info', 'text-info');
        buttons[i].classList.add('btn-success', 'text-success');
      } else if (index === currentIndex) {
        buttons[i].classList.remove('btn-dark', 'text-dark', 'btn-success', 'text-success');
        buttons[i].classList.add('btn-info', 'text-info');
        content.classList.remove('d-none');
      } else {
        buttons[i].classList.remove('btn-success', 'text-success', 'btn-info', 'text-info');
        buttons[i].classList.add('btn-dark', 'text-dark');
      }
    }
    setCurrentStep(currentIndex);
  };

  const showIcon = currentIndex => {
    switch (currentIndex) {
      case 0:
        return <FaHome className="icon" />;
      case 1:
        return <FaChild className="icon" />;
      case 2:
        return <GiPiggyBank className="icon" />;
      case 3:
        return <BsFillGridFill className="icon" />;
      case 4:
        return <FaClipboardList className="icon" />;
      case 5:
        return <GiStairsGoal className="icon" />;
      default:
    }
    return '';
  };

  const start = () => {
    setSteps([
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    activateStep(1);
  };

  const skip = async event => {
    event.preventDefault();
    localStorage.setItem(TUTORIAL, 'completed');
    window.location = '/';
  };

  const tutorialLogout = event => {
    event.preventDefault();
    logout();
    window.location = '/';
  };

  const saveChild = () => {
    setSteps([
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    activateStep(2);
  };

  const saveAllowance = () => {
    setSteps([
      true,
      true,
      false,
      false,
      true,
      true,
    ]);

    activateStep(3);
  };

  const saveCategory = () => {
    setSteps([
      true,
      true,
      false,
      false,
      false,
      true,
    ]);

    activateStep(4);
  };

  const saveActivity = () => {
    setSteps([
      true,
      true,
      false,
      false,
      false,
      false,
    ]);

    activateStep(5);
  };

  return (
    <Card className="mt-5 m0 p0">
      <Card.Body className="d-flex wizard m0 p0">
        <div className="wizard-menu pt-3">
          {steps.map((step, index) => (
            <div key={index} className="d-flex flex-column align-items-center">
              <Button
                variant={index === 0 ? 'info' : 'dark'}
                className={index === 0 ? 'wizard-menu-button text-primary' : 'wizard-menu-button text-dark'}
                id={`button-${index}`}
                disabled={step}
                onClick={() => activateStep(index)}
              >
                {showIcon(index)}
              </Button>
              {index < steps.length - 1 && <div className="wizard-menu-divider" />}
            </div>
          ))}
        </div>
        <div className="p-2">
          <div className="wizard-content" id="content-0">
            <h3 className="text-primary m-4">Bienvenido a Control Mesadas</h3>
            <p className="m-4">
              Si eres usuario nuevo y necesitas ayuda para realizar la configuración inicial
              puedes continuar, o si por el contrario deseas explorar la aplicación por tu cuenta
              puedes saltarte esta parte.
            </p>
            <div className="m-5 text-right">
              <Button
                onClick={start}
                variant="primary"
                className="mr-2 mt-2"
              >
                Continuar
              </Button>
            </div>
          </div>
          <div className="wizard-content d-none" id="content-1">
            <h3 className="text-primary m-4">Hijos</h3>
            <p className="m-4">
              Para comenzar debes agregar a tu representado, esto es necesario para hacer la
              mayoria de las acciones en el sistema, comenzaremos agregando un solo representado,
              cuando hayas finalizado la inducción podrás agregar más.
            </p>
            <ChildForm
              tutorial
              saveCallBack={saveChild}
              {...props}
            />
          </div>
          <div className="wizard-content d-none" id="content-2">
            <h3 className="text-primary m-4">Mesada</h3>
            <p className="m-4">
              Ya que has agregado a tu representado, puedes fijarle una mesada para un rango de
              tiempo, este monto será referencial posteriormente para cuando quieras hacer
              un seguimiento.
            </p>
            <AllowanceForm
              tutorial
              saveCallBack={saveAllowance}
              refresh={currentStep}
              {...props}
            />
          </div>
          <div className="wizard-content d-none" id="content-3">
            <h3 className="text-primary m-4">Categorías</h3>
            <p className="m-4">
              Para organizar mejor las actividades que evaluarás para tu representado,
              te invitamos a crear categorías. Por el momento solo podrás agregar una categoría,
              cuando hayas finalizado la inducción podrás agregar más.
            </p>
            <CategoryForm
              tutorial
              saveCallBack={saveCategory}
              {...props}
            />
          </div>
          <div className="wizard-content d-none" id="content-4">
            <h3 className="text-primary m-4">Actividades</h3>
            <p className="m-4">
              Para hacer el seguimiento de tu representado debes agregar las actividades
              que deseas monitorear, El peso de aca actividad representa la importancia que tiene
              para la evaluación.
              Por el momento solo podrás agregar una actividad,
              cuando hayas finalizado la inducción podrás agregar más.
            </p>
            <ActivityForm
              tutorial
              saveCallBack={saveActivity}
              refresh={currentStep}
              {...props}
            />
          </div>
          <div className="wizard-content d-none" id="content-5">
            <h3 className="text-primary m-4">Felicidades</h3>
            <p className="m-4">
              Has culminado el proceso de inducción, ya puedes comenzar a utilizar Control
              Mesadas, el resto de las funcionalidades te las explicaremos en el transcurso
              del camino
            </p>
            <div className="m-5 text-right">
              <Button
                onClick={skip}
                variant="primary"
                className="mt-2"
              >
                Salir
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
      {currentStep < steps.length - 1
        && (
          <Card.Footer className="text-right">
            <Button
              onClick={tutorialLogout}
              variant="link"
              className="mr-2 mt-2 text-underline"
            >
              Cerrar sesión
            </Button>
            <Button
              onClick={skip}
              variant="link"
              className="mt-2 text-underline"
            >
              Saltar
            </Button>
          </Card.Footer>
        )}
    </Card>
  );
};

export default Wizard;
