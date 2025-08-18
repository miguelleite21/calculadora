import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import logoSrc from '../assets/pink.png';
import { cloths } from './utils';

applyPlugin(jsPDF);

export const generatePdf = async (name, qnt, images, details, result, peca, data) => {
  const doc = new jsPDF();

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

  const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });


  const logo = await loadImage(logoSrc);
  const logoWidth = 15;
  const logoHeight = (logo.height / logo.width) * logoWidth;
  const logoX = 15;
  doc.addImage(logoSrc, 'PNG', logoX, 10, logoWidth, logoHeight);
  let currentY = 10 + logoHeight + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text(`Orçamento ${name}`, logoX, currentY);

  currentY += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Data: ${data}`, logoX, currentY);
  currentY += 6;
  doc.text(`Peça: ${peca}`, logoX, currentY);
  currentY += 12;

  let modelagem = details.find(d => d.name === 'Modelagem')?.value || 0;
  let costura = details.find(d => d.name === 'Costura')?.value || 0;
  let lucro = details.find(d => d.name === 'Lucro')?.value || 0;
  const modelagemCosturaSum = modelagem + costura + lucro;

  let aviamentosSum = 0;
  const clothsHeaders = [];
  const clothsValues = [];
  details.forEach(d => {
    if (d.name === 'Modelagem' || d.name === 'Costura' || d.name === 'Lucro') return;
    const isCloth = cloths.some(c => c.name === d.name);
    if (isCloth) {
      clothsHeaders.push(`Tecido (${d.name})`);
      clothsValues.push(d.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    } else {
      aviamentosSum += d.value;
    }
  });

  const headers = [
    'Quantidade',
    'Peça',
    'Modelagem sob medida + costura',
    'Aviamentos (linhas, botão, zíper)',
    ...clothsHeaders,
    'Total'
  ];

  const values = [
    qnt || 1,
    peca || "Peça sob medida",
    modelagemCosturaSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    aviamentosSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    ...clothsValues,
    result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  ];

  doc.autoTable({
    startY: currentY,
    head: [headers],
    body: [values],
    theme: 'grid',
    styles: {
      font: 'AntraxaGoth', 
      fontSize: 10,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [255, 138, 163], 
      textColor: [255, 255, 255], 
      fontStyle: 'normal'
    },
    columnStyles: headers.reduce((acc, _, idx) => ({ ...acc, [idx]: { cellWidth: 'auto' } }), {}),
  });

  currentY = doc.lastAutoTable.finalY + 10;

  if (images.length > 0) {
    doc.setFontSize(12);
    doc.text('Imagens:', 10, currentY);
    currentY += 10;

    const maxImageWidth = 100;
    const pageHeight = doc.internal.pageSize.height;

    for (const imageFile of images) {
      const base64 = await readFileAsDataURL(imageFile);
      const img = await loadImage(base64);
      const imgWidth = maxImageWidth;
      const imgHeight = (img.height / img.width) * imgWidth;

      if (currentY + imgHeight + 10 > pageHeight) {
        doc.addPage();
        currentY = 10;
      }

      doc.addImage(base64, imageFile.type.includes('png') ? 'PNG' : 'JPEG', 10, currentY, imgWidth, imgHeight);
      currentY += imgHeight + 10;
    }
  }

  doc.save(`Orçamento ${name || ''} Pink Padise.pdf`);
};
