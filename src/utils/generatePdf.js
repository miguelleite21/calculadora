import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import logoSrc from '../assets/pink.png';
import { cloths } from './utils';
import fontBase64 from '../assets/fonts/gothicaClass.txt?raw';
applyPlugin(jsPDF);

export const generatePdf = async (name, images, pieces, date) => {
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
    doc.addFileToVFS('GothicaClass.ttf', fontBase64);
    doc.addFont('GothicaClass.ttf', 'GothicaClass', 'normal');

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
    doc.text(`Data: ${date}`, logoX, currentY);
    currentY += 12;

    const tableHeaders = ['Peça', 'Quantidade', 'Modelagem sob medida + costura + lucro', 'Aviamentos', 'Tecidos', 'Total Unitário', 'Descontos', 'Subtotal'];
    const tableBody = pieces.map(piece => {
      let modelagem = piece.details.find(d => d.name === 'Modelagem')?.value || 0;
      let costura = piece.details.find(d => d.name === 'Costura')?.value || 0;
      let lucro = piece.details.find(d => d.name === 'Lucro')?.value || 0;
      let desconto = piece.details.find(d => d.name === 'Desconto')?.value || 0;
      const modelagemCosturaSum = modelagem + costura + lucro;

      let aviamentosSum = 0;
      let tecidosSum = 0;
      piece.details.forEach(d => {
        if (d.name === 'Modelagem' || d.name === 'Costura' || d.name === 'Lucro' || d.name === 'Desconto') return;
        const isCloth = cloths.some(c => c.name === d.name);
        if (isCloth) {
          tecidosSum += d.value;
        } else {
          aviamentosSum += d.value;
        }
      });
      const unitTotal = tecidosSum + aviamentosSum + modelagemCosturaSum
      const subtotal = piece.total * piece.quantity;

      return [
        piece.name,
        piece.quantity,
        modelagemCosturaSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        aviamentosSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        tecidosSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        unitTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      ];
    });

    const grandTotal = pieces.reduce((acc, piece) => acc + (piece.total * piece.quantity), 0);
    const footRow = ['', '', '', '', '', '', 'Total', grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })];

    doc.autoTable({
      startY: currentY,
      head: [tableHeaders],
      body: tableBody,
      foot: [footRow],
      theme: 'grid',
      styles: { font: 'helvetica', fontSize: 10, textColor: [0, 0, 0], lineColor: [196, 196, 196], lineWidth: 0.1 },
      headStyles: { fillColor: [247, 192, 208] },
      footStyles: { fillColor: [255, 255, 255] },
      columnStyles: tableHeaders.reduce((acc, _, idx) => ({ ...acc, [idx]: { cellWidth: 'auto' } }), {}),
    });

    currentY = doc.lastAutoTable.finalY + 10;
if (images.length > 0) {
  doc.setFontSize(12);
  doc.text('Imagens:', 10, currentY);
  currentY += 10;

  const maxImageWidth = 80; 
  const margin = 10;
  const gap = 10; 
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const availableWidth = pageWidth - margin * 2;
  const availableHeightForPage = pageHeight - margin * 2;

  for (let i = 0; i < images.length; i += 2) {
    const pair = images.slice(i, i + 2);
    const loaded = await Promise.all(pair.map(async (file) => {
      const base64 = await readFileAsDataURL(file);
      const img = await loadImage(base64);
      return { file, base64, img };
    }));

    const cols = loaded.length; 
    let thumbWidth = Math.min(maxImageWidth, (availableWidth - gap * (cols - 1)) / cols);

    let heights = loaded.map(l => (l.img.height / l.img.width) * thumbWidth);
    let rowMaxHeight = Math.max(...heights);

    if (rowMaxHeight > (availableHeightForPage - (currentY - margin))) {
      const remainingSpace = pageHeight - margin - currentY;
      if (remainingSpace < 30) { 
        doc.addPage();
        currentY = margin;
      }
      const maxAllowedHeight = pageHeight - margin - currentY;
      const scaleFactor = maxAllowedHeight / rowMaxHeight;
      thumbWidth = thumbWidth * scaleFactor;
      heights = heights.map(h => h * scaleFactor);
      rowMaxHeight = rowMaxHeight * scaleFactor;
    }

    const rowWidth = thumbWidth * cols + gap * (cols - 1);
    const y = currentY;
    let x 
      if (cols === 1) {
        x = margin; 
      } else {
        x = margin + (availableWidth - rowWidth) / 2; 
      }

    for (let j = 0; j < cols; j++) {
      const item = loaded[j];
      const h = heights[j];
      const format = item.file.type && item.file.type.includes('png') ? 'PNG' : 'JPEG';
      doc.addImage(item.base64, format, x, y, thumbWidth, h);
      x += thumbWidth + gap;
    }
    currentY += rowMaxHeight + 10;
    if (currentY + 40 > pageHeight - margin && i + 2 < images.length) {
      doc.addPage();
      currentY = margin;
    }
  }
}


    doc.save(`Orçamento ${name || ''} Pink Paradise.pdf`);
};