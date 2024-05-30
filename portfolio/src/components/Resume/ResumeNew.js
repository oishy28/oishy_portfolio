import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Oishy_Fatema_Akhand_cv.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateScale = () => {
    const { width, height } = dimensions;
    // Adjust scale based on both width and height
    if (width > 786 && height > 600) {
      return 1.3;
    } else if (width > 786) {
      return 1.1;
    } else if (height > 600) {
      return 0.8;
    } else {
      return 0.6;
    }
  };

  const scale = calculateScale();

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px", marginBottom: "20px"}}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={8} className="d-flex justify-content-center">
            <Document file={pdf}>
              <Page pageNumber={1} scale={scale} />
              <Page pageNumber={2} scale={scale} />
            </Document>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
