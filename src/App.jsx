import React, { useState } from 'react';
import './App.css';
import {
  Button,
  Box,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { rawNotions, cloths } from './utils';

const categories = Object.values(
  rawNotions.reduce((acc, item) => {
    if (item.parent) {
      if (!acc[item.parent]) acc[item.parent] = { key: item.parent, name: item.parent, children: [] };
      acc[item.parent].children.push(item);
    }
    return acc;
  }, {})
);

function splitIntoColumns(items, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  items.forEach((item, idx) => cols[idx % numCols].push(item));
  return cols;
}

export default function App() {
  const [metrics, setMetrics] = useState({ pattern: '', sewing: '' });
  const [notionOptions, setNotionOptions] = useState(
    rawNotions.reduce((acc, item) => ({ ...acc, [item.key]: { selected: false, value: '' } }), {})
  );
  const [clothsOptions, setClothsOptions] = useState(
    cloths.reduce((acc, item) => ({ ...acc, [item.key]: { selected: false, value: '' } }), {})
  );
  const [openFabrics, setOpenFabrics] = useState(true);
  const [openAviamentos, setOpenAviamentos] = useState(true);
  const [openMap, setOpenMap] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.key]: true }), {})
  );
  const [result, setResult] = useState(null);

  const handleMetricChange = e => {
    const { name, value } = e.target;
    if (/^[0-9]*$/.test(value) || value === '') setMetrics(prev => ({ ...prev, [name]: value }));
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

  const handleFabricsChange = e => {
    const { value } = e.target;
    const selectedKeys = typeof value === 'string' ? value.split(',') : value;
    setClothsOptions(prev =>
      cloths.reduce((acc, cloth) => {
        const was = prev[cloth.key].value;
        const sel = selectedKeys.includes(cloth.key);
        return { ...acc, [cloth.key]: { selected: sel, value: sel ? was : '' } };
      }, {})
    );
  };

  const handleValueCloth = e => {
    const { name, value } = e.target;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '')
      setClothsOptions(prev => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const calculateResult = () => {
    const pat = parseFloat(metrics.pattern) || 0;
    const sew = parseFloat(metrics.sewing) || 0;
    let total = (pat + sew) * 22;

    Object.entries(notionOptions).forEach(([key, opt]) => {
      if (opt.selected) total += parseFloat(opt.value) || 0;
    });

    cloths.forEach(cloth => {
      const opt = clothsOptions[cloth.key];
      if (opt.selected) {
        const m = parseFloat(opt.value) || 0;
        total += cloth.cost * m;
      }
    });

    setResult(total);
  };

  const noParent = rawNotions.filter(item => !item.parent);
  const noParentCols = splitIntoColumns(noParent, 2);
  const toggleCategory = key => setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <Box className="kawaii-container">
      <form className="kawaii-form" onSubmit={e => e.preventDefault()}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Calculadora Pink Paradise
        </Typography>

        <fieldset className="section-geral">
          <legend>Geral</legend>
          <InputLabel htmlFor="pattern-input">Molde:</InputLabel>
          <OutlinedInput
            id="pattern-input"
            name="pattern"
            value={metrics.pattern}
            onChange={handleMetricChange}
            placeholder="0"
            margin="dense"
            className="full-Imputs"
          />
          <InputLabel htmlFor="sewing-input">Costura:</InputLabel>
          <OutlinedInput
            id="sewing-input"
            name="sewing"
            value={metrics.sewing}
            onChange={handleMetricChange}
            placeholder="0"
            margin="dense"
            className="full-Imputs"
          />
        </fieldset>

        <fieldset className="section-aviamentos">
          <legend>Tecidos</legend>
          <Box sx={{ position: 'relative', paddingBottom: '2rem' }}>
            <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpenFabrics(f => !f)}>
              {openFabrics ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            {openFabrics && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <InputLabel htmlFor="fabric-select-label">Tecidos</InputLabel>
                  <Select
                    id="fabric-select-label"
                    multiple
                    value={Object.keys(clothsOptions).filter(k => clothsOptions[k].selected)}
                    onChange={handleFabricsChange}
                    className="full-Imputs"
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map(key => {
                          const c = cloths.find(c => c.key === key);
                          return <Chip key={key} label={c.name} size="small" sx={{ backgroundColor: 'pink' }} />;
                        })}
                      </Box>
                    )}
                  >
                    {cloths.map(c => (
                      <MenuItem key={c.key} value={c.key}>
                        <Checkbox checked={clothsOptions[c.key].selected} />
                        {c.name} (R$ {c.cost})
                      </MenuItem>
                    ))}
                  </Select>
                {cloths.map(c => {
                  const opt = clothsOptions[c.key];
                  return (
                    opt.selected && (
                      <Box key={c.key} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1,flexDirection:"column" }}>
                        <InputLabel htmlFor={`meter-${c.key}`}>{c.name} (m)</InputLabel>
                        <OutlinedInput
                          id={`meter-${c.key}`}
                          name={c.key}
                          value={opt.value}
                          onChange={handleValueCloth}
                          placeholder="0"
                          endAdornment={<InputAdornment position="end">m</InputAdornment>}
                          className="neru"
                        />
                      </Box>
                    )
                  );
                })}
              </Box>
            )}
          </Box>
        </fieldset>

        {noParentCols.length > 0 && (
          <fieldset className="section-aviamentos">
            <legend>Outros Aviamentos</legend>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', position: 'relative', paddingBottom: '2rem' }}>
              <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpenAviamentos(a => !a)}>
                {openAviamentos ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {openAviamentos && (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  {noParentCols.map((col, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {col.map(item => (
                        <Box key={item.key} className="aviamento-item" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <FormControlLabel
                            control={<Checkbox name={item.key} checked={notionOptions[item.key].selected} onChange={handleToggleNotion} />} 
                            label={item.name}
                          />
                          {notionOptions[item.key].selected && (
                            <OutlinedInput
                              size="small"
                              name={item.key}
                              value={notionOptions[item.key].value}
                              onChange={handleValueNotion}
                              placeholder="0"
                              margin="dense"
                              className='neru'
                              endAdornment={<InputAdornment position="end">{item.unit}</InputAdornment>}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </fieldset>
        )}

        {categories.map(cat => {
          const cols = splitIntoColumns(cat.children, 2);
          return (
            <fieldset key={cat.key} className="section-aviamentos" style={{ paddingBottom: '2rem', position: 'relative' }}>
              <legend>{cat.name}</legend>
              <IconButton
                className="kawaii-toggle-btn"
                size="small"
                onClick={() => toggleCategory(cat.key)}
              >
                {openMap[cat.key] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {openMap[cat.key] && (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  {cols.map((col, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {col.map(item => (
                        <Box key={item.key} className="aviamento-item" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <FormControlLabel
                            control={<Checkbox name={item.key} checked={notionOptions[item.key]?.selected || false} onChange={handleToggleNotion} />}
                            label={item.name}
                          />
                          {notionOptions[item.key]?.selected && (
                            <OutlinedInput
                              size="small"
                              name={item.key}
                              value={notionOptions[item.key].value}
                              onChange={handleValueNotion}
                              placeholder="0"
                              margin="dense"
                              className='neru'
                              endAdornment={<InputAdornment position="end">{item.unit}</InputAdornment>}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              )}
            </fieldset>
          );
        })}

        <Button variant="contained" fullWidth onClick={calculateResult} sx={{ mt: 2 }}>
          Calcular
        </Button>

        {result !== null && (
          <Typography id="result" variant="h6">
            {result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
        )}
      </form>
    </Box>
  );
}
