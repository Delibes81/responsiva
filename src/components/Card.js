import React, { useState } from 'react'
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, ImageRun } from 'docx'
import { useEffect } from 'react'
import logoSvg from '../assets/Logo_Notaria121_ALTA (1).png'

function getBase64Image(imgUrl, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      callback(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
    };
    img.src = imgUrl;
  }

export default function ResponsivaGenerator() {
  const [formData, setFormData] = useState({
    marca: 'DELL',
    modelo: 'VOSTRO 500',
    serialNumber: 'HK5ZMKG3',
    recipient: 'Lic. Victor Medina'
  });

  const [logoBase64, setLogoBase64] = useState('');

  useEffect(() => {
    getBase64Image(logoSvg, setLogoBase64);
  }, []);

  const serialNumbers = ['HK5ZMKG3', 'AB123CD45', 'XY789ZW01']
  const recipients = ['Lic. Victor Medina', 'Lic. Maria Rodriguez', 'Lic. Juan Perez']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const generateWord = () => {
    const { marca, modelo, serialNumber, recipient } = formData
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: logoBase64,
                transformation: {
                  width: 150,
                  height: 100,
                },
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Ciudad de México a ${new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}`,
                size: 24, // Tamaño de la fuente en medio puntos (24 puntos = 48)
              }),
            ],
            spacing: { before: 400, line: 360 },
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Notaria 121 de la CDMX',
                size: 24,
                bold: true,
              }),
            ],
            spacing: { before: 400, line: 360 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Asunto: Responsiva EQUIPO DE COMPUTO',
                size: 24,
                bold: true,
              }),
            ],
            spacing: { line: 360 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Sirva éste como comprobante de entrega del equipo marca: ${marca}, Modelo: ${modelo}, S/N: ${serialNumber}, con eliminador original y lector de huellas "HID" con N° de serie P320E09639, en la Notaria 121 de la Ciudad de México, y se entrega a ${recipient} quien en lo sucesivo se le denominará "EL RESPONSABLE", para el mejor desarrollo de sus funciones, quien se compromete a resguardarlo y darle un uso estrictamente laboral.`,
                size: 24,
              }),
            ],
            spacing: { before: 400, line: 360 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Asimismo, hacemos de su conocimiento que no podrá modificar la configuración del equipo ni instalar software sin ser previamente autorizado.`,
                size: 24,
              }),
            ],
            spacing: { before: 400, line: 360 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `En caso de robo o extravío del equipo citado en esta carta, “EL RESPONSABLE” deberá cubrir el monto total del equipo.
En caso de daño parcial “EL RESPONSABLE” cubrirá el monto total resultante de la reparación.
`,
                size: 24,
              }),
            ],
            spacing: { before: 400, line: 360 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `El equipo entregado se encuentra en perfectas condiciones, con gasto por uso normal.`,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 1800 },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Receptor',
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: '__________________________',
                            size: 24,
                          }),
                        ],
                        spacing: { before: 1000 },
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: recipient,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'ABOGADO',
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    borders: {
                      top: { size: 0, color: "FFFFFF" },
                      bottom: { size: 0, color: "FFFFFF" },
                      left: { size: 0, color: "FFFFFF" },
                      right: { size: 0, color: "FFFFFF" },
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Otorga',
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: '__________________________',
                            size: 24,
                          }),
                        ],
                        spacing: { before: 1000 },
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Arturo Tirado Serrano',
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'SISTEMAS',
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    borders: {
                      top: { size: 0, color: "FFFFFF" },
                      bottom: { size: 0, color: "FFFFFF" },
                      left: { size: 0, color: "FFFFFF" },
                      right: { size: 0, color: "FFFFFF" },
                    },
                  }),
                ],
              }),
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { size: 0, color: "FFFFFF" },
              bottom: { size: 0, color: "FFFFFF" },
              left: { size: 0, color: "FFFFFF" },
              right: { size: 0, color: "FFFFFF" },
              insideHorizontal: { size: 0, color: "FFFFFF" },
              insideVertical: { size: 0, color: "FFFFFF" },
            },
          }),
        ],
      }],
    })
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'responsiva.docx')
    })
  }

  return (
    <Container className="mt-5">
      <Card className="mb-4">
        <Card.Header>
          <Card.Title>Generador de Responsiva</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Marca</Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="text" 
                  name="marca"
                  value={formData.marca} 
                  onChange={handleInputChange} 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Modelo</Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="text" 
                  name="modelo"
                  value={formData.modelo} 
                  onChange={handleInputChange} 
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Número de Serie</Form.Label>
              <Col sm="9">
                <Form.Select 
                  name="serialNumber"
                  value={formData.serialNumber} 
                  onChange={handleInputChange}
                >
                  {serialNumbers.map((sn) => (
                    <option key={sn} value={sn}>{sn}</option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Se entrega a</Form.Label>
              <Col sm="9">
                <Form.Select 
                  name="recipient"
                  value={formData.recipient} 
                  onChange={handleInputChange}
                >
                  {recipients.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={generateWord} size="lg" className="w-100">
            Generar Documento Word
          </Button>
        </Col>
      </Row>
    </Container>
  )
}