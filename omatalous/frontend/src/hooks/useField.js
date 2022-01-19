import { useState } from 'react';

const useField = (type, name) => {

  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);
  const reset = () => setValue('');

  const getInputParameters = {type:type, value:value, onChange:onChange, name:name};

  return { type, value, onChange, name, reset, getInputParameters };

};

export default useField;