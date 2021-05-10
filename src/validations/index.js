/* eslint no-eval: 0 */

const getRules = (strRules, inputs) => {
  const aux = strRules.split('|');
  const rules = [];
  aux.forEach(item => {
    const rule = {
      rule: item,
    };

    if (item.search('length') > -1) {
      const values = item.split(':')[1].split(',');
      rule.rule = 'length';
      // eslint-disable-next-line prefer-destructuring
      rule.min = values[0];
      // eslint-disable-next-line prefer-destructuring
      rule.max = values[1];
    }

    if (item.search('compare') > -1) {
      const field2 = item.split(':')[1].split(',')[0];
      rule.rule = 'compare';
      rule.value = inputs.find(input => input.name === field2).value;
    }

    rules.push(rule);
  });

  return rules;
};

const validate = (strRules, label, value, inputs, t) => {
  const rules = getRules(strRules, inputs);

  const isRequired = rules.find(rule => rule.rule === 'required');
  if (isRequired && !value) {
    return {
      isValid: false,
      message: t('validation.required', { field: label }),
    };
  }

  const hasComparation = rules.find(rule => rule.rule === 'compare');
  if (hasComparation && value !== hasComparation.value) {
    const field2 = strRules
      .split('|')
      .find(item => item.search('compare') > -1)
      .split(':')[1]
      .split(',')[1];
    return {
      isValid: false,
      message: t('validation.compare', { field: label, field2: t(field2) }),
    };
  }

  const greaterEqual = rules.find(rule => rule.rule === 'gte');
  if (greaterEqual && value < greaterEqual.value) {
    return {
      isValid: false,
      message: t('validation.greaterEqual', { field: label }),
    };
  }

  const lessEqual = rules.find(rule => rule.rule === 'lte');
  if (lessEqual && value > lessEqual.value) {
    return {
      isValid: false,
      message: t('validation.lessEqual', { field: label }),
    };
  }

  const messages = [
    t('validation.rule', { field: label }),
  ];
  const validation = [];
  validation.push('/^');

  rules.forEach(rule => {
    switch (rule.rule) {
      case 'number':
        validation.push('\\d');
        messages.push(t('validation.number'));
        break;
      case 'name':
        validation.push('[a-zA-Záéíóú ]');
        messages.push(t('validation.name'));
        break;
      case 'text':
        validation.push('[a-zA-Z0-9áéíóú ,.\\n]');
        messages.push(t('validation.text'));
        break;
      case 'email':
        validation.push('([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})');
        messages.push(t('validation.email'));
        break;
      case 'password':
        validation.push('[a-zA-Z0-9._%-@!$]');
        messages.push(t('validation.password', { min: rule.min, max: rule.max }));
        break;
      case 'length':
        validation.push(`{${rule.min},${rule.max}}`);
        messages.push(t('validation.length', { min: rule.min, max: rule.max }));
        break;
      default:
    }
  });

  validation.push('$/');

  const regex = eval(validation.join('')).test(value);
  if ((validation.length > 2) && !regex) {
    return {
      isValid: false,
      message: messages.join(''),
    };
  }

  return {
    isValid: true,
    message: 'Is Valid',
  };
};

export default validate;
