import React from 'react';
import PrintIcon from '@material-ui/icons/Print';

const PDFPrinter = ({ file }) => {
  const print = () => {
    const pdfFrame = document.createElement('iframe');
    pdfFrame.style.visibility = 'hidden';
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
  };
  return (
    <PrintIcon className="fas fa-print clickable" onClick={print} title="download"/>
  );
};

export default PDFPrinter;
