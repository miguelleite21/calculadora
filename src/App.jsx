import React, { useState } from 'react';
import './App.css';
import {
  Button,
  Box,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControlLabel,
  Checkbox
} from '@mui/material';

export default function App() {
  const [values, setValues] = useState({ molde: '', costura: '', teste: '' });
  const [options, setOptions] = useState({ botao: { selected: false, value: '' }, linha: { selected: false, value: '' }, ziper: { selected: false, value: '' } });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9]*$/.test(value) || value === '') {
      setValues({ ...values, [name]: value });
    }
  };

  const handleOptionToggle = (e) => {
    const { name, checked } = e.target;
    setOptions({ ...options, [name]: { ...options[name], selected: checked, value: checked ? options[name].value : '' } });
  };

  const handleOptionValue = (e) => {
    const { name, value } = e.target;
    if (/^[0-9]*$/.test(value) || value === '') {
      setOptions({ ...options, [name]: { ...options[name], value } });
    }
  };

  const calcularResultado = () => {
    const mold = parseInt(values.molde, 10) || 0;
    const cost = parseInt(values.costura, 10) || 0;
    const test = parseInt(values.teste, 10) || 0;
    let total = (mold + cost + test) * 22;

    const mult = { botao: 5, linha: 3, ziper: 10 };
    Object.entries(options).forEach(([key, opt]) => {
      if (opt.selected) {
        const val = parseInt(opt.value, 10) || 0;
        total += val * mult[key];
      }
    });

    setResult(total);
  };

  return (
    <Box className="kawaii-container">
      <form className="kawaii-form" onSubmit={(e) => e.preventDefault()}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora Pink Paradise
        </Typography>

        <InputLabel htmlFor="molde">Molde:</InputLabel>
        <OutlinedInput
          id="molde"
          name="molde"
          value={values.molde}
          onChange={handleChange}
          placeholder="0"
          fullWidth
          margin="dense"
        />

        <InputLabel htmlFor="costura">Costura:</InputLabel>
        <OutlinedInput
          id="costura"
          name="costura"
          value={values.costura}
          onChange={handleChange}
          placeholder="0"
          fullWidth
          margin="dense"
        />

        <InputLabel htmlFor="teste">Teste:</InputLabel>
        <OutlinedInput
          id="teste"
          name="teste"
          value={values.teste}
          onChange={handleChange}
          placeholder="0"
          fullWidth
          margin="dense"
        />

        <Typography variant="h6" sx={{ mt: 2 }}>Opções Adicionais:</Typography>
        {['botao', 'linha', 'ziper'].map((opt) => (
          <Box key={opt} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              control={<Checkbox name={opt} checked={options[opt].selected} onChange={handleOptionToggle} />}
              label={opt.charAt(0).toUpperCase() + opt.slice(1)}
            />
            {options[opt].selected && (
              <OutlinedInput
                name={opt}
                value={options[opt].value}
                onChange={handleOptionValue}
                placeholder="0"
                sx={{ width: '80px', ml: 2 }}
                margin="dense"
              />
            )}
          </Box>
        ))}

        <Button variant="contained" fullWidth onClick={calcularResultado} sx={{ mt: 2 }}>
          Resultado
        </Button>

        {result !== null && (
          <Typography id="result" variant="h6" sx={{ mt: 2, color: '#a84d8d' }}>
            Resultado: {result}
          </Typography>
        )}
      </form>
    </Box>
  );
}
