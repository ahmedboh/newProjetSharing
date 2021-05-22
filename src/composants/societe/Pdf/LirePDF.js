import React, { useEffect , useState } from 'react';
import Loader from '../../Loader';
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from './ControlPanel';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const LirePDF = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pdf , setPdf]=useState();
  const [nomPdf , setNomPdf]=useState();
  
  let history = useHistory();
  const getAttachement= async()=>{
    const res =await Axios.get(`rapportInter/attachement/${history.location.state.idRapport}`)
    setPdf(res.data.data);
    setNomPdf(res.data.nomFichier);
  }
  useEffect(() => {
    getAttachement()
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div>
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={`data:application/pdf;base64,${pdf}`}
          nomFile={nomPdf}
        />
        <Document
          file={`data:application/pdf;base64,${pdf}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
    </div>
  );
};

export default LirePDF;
