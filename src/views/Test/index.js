import React, { useEffect, useState } from 'react';

const Test = () => {
  const [value, setValue] = useState(
    localStorage.getItem('myValueInLocalStorage') || ''
  );

  useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
}

export default Test;
