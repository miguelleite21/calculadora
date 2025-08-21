import { useState } from 'react';
import { parseNumber } from '../utils/utils';
import { rawNotions, cloths } from '../utils/utils';
import { initialMetrics, initialNotions, initialClothsOpts } from '../utils/data';

export default function useCalculator() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [notionOptions, setNotionOptions] = useState(initialNotions);
  const [clothsOptions, setClothsOptions] = useState(initialClothsOpts);
  const [pieceName, setPieceName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);
  const [resultDetails, setResultDetails] = useState([]);
  const [pieces, setPieces] = useState([]);

  const handleMetricChange = e => {
    const { name, value } = e.target;
    if (/^[0-9]*[,]?[0-9]*$/.test(value) || value === '')
      setMetrics(prev => ({ ...prev, [name]: value }));
  };

  const handlePieceNameChange = (e) => setPieceName(e.target.value);

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value) || value === '') setQuantity(value);
  };

  const handleToggleNotion = e => {
    const { name, checked } = e.target;
    setNotionOptions(prev => ({
      ...prev,
      [name]: { selected: checked, value: checked ? prev[name].value : '' }
    }));
  };

  const handleValueNotion = e => {
    const { name, value } = e.target;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '')
      setNotionOptions(prev => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const handleValueCloth = e => {
    const { name, value } = e.target;
    if (/^[0-9]*[,]?[0-9]*$/.test(value) || value === '')
      setClothsOptions(prev => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const calculateResult = () => {
    const pat = parseNumber(metrics.pattern);
    const sew = parseNumber(metrics.sewing);
    const profit = parseNumber(metrics.profit);
    const baseCost = (pat + sew) * 25;

    let total = baseCost;
    const details = [];

    if (pat || sew) {
      details.push({ name: 'Modelagem', value: pat * 25 }, { name: 'Costura', value: sew * 25 });
    }

    Object.entries(notionOptions).forEach(([key, opt]) => {
      if (opt.selected) {
        const base = rawNotions.find(n => n.key === key)?.value || 0;
        const quantity = parseNumber(opt.value);
        const subtotal = base * quantity;
        total += subtotal;
        details.push({ name: rawNotions.find(n => n.key === key)?.name || key, value: subtotal });
      }
    });

    cloths.forEach(cloth => {
      const opt = clothsOptions[cloth.key];
      if (opt?.selected) {
        const meters = parseNumber(opt.value);
        const subtotal = cloth.cost * meters;
        total += subtotal;
        details.push({ name: cloth.name, value: subtotal });
      }
    });

    const profitValue = (total * profit) / 100;
    details.push({ name: 'Lucro', value: profitValue });

    total += profitValue;
    setResult(total);
    setResultDetails(details);
  };

  const resetForm = () => {
    setMetrics(initialMetrics);
    setNotionOptions(initialNotions);
    setClothsOptions(initialClothsOpts);
    setPieceName('');
    setQuantity(1);
    setResult(null);
    setResultDetails([]);
  };

  const handleReset = () => {
    resetForm();
    setPieces([]);
  };

  const addPiece = () => {
    const currentPiece = {
      name: pieceName,
      quantity: parseInt(quantity, 10),
      details: resultDetails,
      total: result
    };

    setPieces(prev => [...prev, currentPiece]);
    resetForm();
  };

  return {
    metrics,
    notionOptions,
    clothsOptions,
    pieceName,
    quantity,
    result,
    resultDetails,
    pieces,
    handleMetricChange,
    handlePieceNameChange,
    handleQuantityChange,
    handleToggleNotion,
    handleValueNotion,
    handleValueCloth,
    calculateResult,
    handleReset,
    addPiece,
    setClothsOptions
  };
}