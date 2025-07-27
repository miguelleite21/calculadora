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
  Autocomplete,
  TextField,
  Paper,
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
  const [resultDetails, setResultDetails] = useState([]);

  const handleMetricChange = e => {
    const { name, value } = e.target;
    if (/^[0-9]*[,]?[0-9]*$/.test(value) || value === '')
      setMetrics(prev => ({ 
        ...prev, 
        [name]: value 
      }));
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
      setClothsOptions(prev => ({ 
        ...prev, 
        [name]: { 
          ...prev[name], 
          value 
        } 
      }));
  };

  const calculateResult = () => {
    const parse = val => parseFloat((val || '0').toString().replace(',', '.')) || 0;
  
    const pat = parse(metrics.pattern);
    const sew = parse(metrics.sewing);
    const baseCost = (pat + sew) * 25;
  
    let total = baseCost;
    const details = [];
  
    if (pat || sew) {
      details.push({ name: 'Modelagem + Costura', value: baseCost });
    }
  
    Object.entries(notionOptions).forEach(([key, opt]) => {
      if (opt.selected) {
        const base = rawNotions.find(n => n.key === key)?.value || 0;
        const quantity = parse(opt.value);
        const subtotal = base * quantity;
        total += subtotal;
        details.push({ name: rawNotions.find(n => n.key === key)?.name || key, value: subtotal });
      }
    });
  
    cloths.forEach(cloth => {
      const opt = clothsOptions[cloth.key];
      if (opt?.selected) {
        const meters = parse(opt.value);
        const subtotal = cloth.cost * meters;
        total += subtotal;
        details.push({ name: cloth.name, value: subtotal });
      }
    });
  
    setResult(total);
    setResultDetails(details);
  };
  
  const handleReset = () => {
    setMetrics(initialMetrics);
    setNotionOptions(initialNotions);
    setClothsOptions(initialClothsOpts);
    setResult(null);
  }

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
          <InputLabel htmlFor="pattern-input">Modelagem:</InputLabel>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,width: '100%' }}>
                  <Autocomplete
                  fullWidth
                    multiple
                    options={cloths}
                    disableCloseOnSelect
                    disablePortal
                    getOptionLabel={opt => `${opt.name} (R$ ${opt.cost})`}
                    value={cloths.filter(c => clothsOptions[c.key].selected)}
                    onChange={(_, selectedItems) => {
                      const selectedKeys = selectedItems.map(i => i.key)
                      setClothsOptions(prev =>
                        cloths.reduce((acc, cloth) => {
                          const was = prev[cloth.key].value
                          const sel = selectedKeys.includes(cloth.key)
                          return {
                            ...acc,
                            [cloth.key]: { selected: sel, value: sel ? was : '' }
                          }
                        }, {})
                      )
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Tecidos"
                        placeholder="Selecione ou busque..."
                        className="full-Imputs"
                        InputLabelProps={{
                          sx: {
                            color: '#a84d8d',
                            '&.Mui-focused': {
                              color: '#a84d8d',
                            }
                          }
                        }}
                        sx={{
                          // contorno do input quando focado
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ffc5d3'
                          }
                        }}
                      />
                    )}
                    PopperProps={{
                      sx: {
                        width: '100% !important',
                        overflowX: 'hidden',
                      }
                    }}
                    PaperComponent={props => <Paper {...props} />}
                    PaperProps={{
                      sx: {
                        width: '100%',
                        boxSizing: 'border-box',
                        // background da lista
                        bgcolor: '#ffe2f1',
                        // sombra personalizada
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }
                    }}
                    ListboxProps={{
                      sx: {
                        maxHeight: 200,
                        overflowY: 'auto',
                        // cor do texto de cada opção
                        '& .MuiAutocomplete-option': {
                          color: '#ffacb8',
                          '&.Mui-focused': {
                            bgcolor: '#ff8aa3',  
                            color: '#fff',  // bg quando hover/focus na opção
                          }
                        }
                      }
                    }}
                    renderTags={(selected, getTagProps) =>
                      selected.map((opt, idx) => (
                        <Chip
                          key={opt.key}
                          label={opt.name}
                          size="small"
                          sx={{ 
                            backgroundColor: '#ff8aa3',
                            color:"#fff",
                            '& .MuiChip-deleteIcon': { color: '#ffc5d3' }
                          }}
                          {...getTagProps({ index: idx })}
                        />
                      ))
                    }
                  />

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
          <fieldset className="section-aviamentos" style={{ paddingBottom: '2rem', position: 'relative' }}>
            <legend>Aviamentos</legend>
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

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            onClick={calculateResult}
            sx={{ flex: 2 }}    
            className='calc'
          >
            Calcular
          </Button>
          <Button
            className='reset'
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ flex: 1 }}    
          >
            Limpar
          </Button>
        </Box>
        

        {result !== null && (
          <Box id="result" sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
              Total: {result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
            <Box sx={{ borderTop: '1px solid #ffc5d3', pt: 1 }}>
              {resultDetails.map((item, idx) => (
                <Typography key={idx} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.name}</span>
                  <span>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </form>
    </Box>
  );
}
