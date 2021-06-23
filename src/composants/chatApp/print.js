import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Stat from '../societe/statistique/Stat';

const Example = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Stat ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};