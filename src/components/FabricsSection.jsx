import { useState } from 'react';
import {
  Box,
  IconButton,
  Chip,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { cloths } from '../utils/utils';
import CustomAutocomplete from './CustomAutocomplete';

export default function FabricsSection({ clothsOptions, onValueChange, setClothsOptions, customFabrics, setCustomFabrics }) {
  const [openFabrics, setOpenFabrics] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newFabric, setNewFabric] = useState({ name: '', cost: '' });

  const allFabrics = [...cloths, ...customFabrics];

  const handleAddCustomFabric = () => {
    if (!newFabric.name.trim() || !newFabric.cost) {
      return;
    }

    const customKey = `custom_${Date.now()}`;
    const fabric = {
      key: customKey,
      name: newFabric.name.trim(),
      cost: parseFloat(newFabric.cost.replace(',', '.')),
      isCustom: true,
    };

    setCustomFabrics((prev) => [...prev, fabric]);
    setClothsOptions((prev) => ({
      ...prev,
      [customKey]: { selected: true, value: '' },
    }));

    setNewFabric({ name: '', cost: '' });
    setOpenDialog(false);
  };

  const handleRemoveCustomFabric = (fabricKey) => {
    setCustomFabrics((prev) => prev.filter((f) => f.key !== fabricKey));
    setClothsOptions((prev) => {
      const newOptions = { ...prev };
      delete newOptions[fabricKey];
      return newOptions;
    });
  };

  return (
    <fieldset className="section-aviamentos">
      <legend>Tecidos</legend>
      <Box sx={{ position: 'relative', paddingBottom: '2rem' }}>
        <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpenFabrics((f) => !f)}>
          {openFabrics ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        {openFabrics && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <CustomAutocomplete
                options={allFabrics}
                value={allFabrics.filter((c) => clothsOptions[c.key]?.selected)}
                onChange={(_, selectedItems) => {
                  const selectedKeys = selectedItems.map((i) => i.key);
                  setClothsOptions(
                    allFabrics.reduce((acc, cloth) => {
                      const was = clothsOptions[cloth.key]?.value || '';
                      const sel = selectedKeys.includes(cloth.key);
                      return {
                        ...acc,
                        [cloth.key]: { selected: sel, value: sel ? was : '' },
                      };
                    }, {})
                  );
                }}
                multiple={true}
                label="Tecidos"
                placeholder="Selecione ou busque..."
                getOptionLabel={(opt) => `${opt.name} (R$ ${opt.cost.toFixed(2)})`}
                renderTags={(selected, getTagProps) =>
                  selected.map((opt, idx) => (
                    <Chip
                      key={opt.key}
                      label={opt.name}
                      size="small"
                      sx={{
                        backgroundColor: opt.isCustom ? '#9C27B0' : '#D83082',
                        color: '#fff',
                        '& .MuiChip-deleteIcon': { color: '#EF8DAA' },
                      }}
                      {...getTagProps({ index: idx })}
                    />
                  ))
                }
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenDialog(true)}
                className='calc'
              >
                <Add />
              </Button>
            </Box>

            {allFabrics.map((c) => {
              const opt = clothsOptions[c.key];
              return (
                opt?.selected && (
                  <Box key={c.key} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      <InputLabel htmlFor={`meter-${c.key}`} sx={{ flex: 1 }}>
                        {c.name} (m) - R$ {c.cost.toFixed(2)}/m
                        {c.isCustom && (
                          <Chip label="Personalizado" size="small" sx={{ ml: 1, backgroundColor: '#9C27B0', color: '#fff' }} />
                        )}
                      </InputLabel>
                      {c.isCustom && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveCustomFabric(c.key)}
                          sx={{ minWidth: 'auto', fontSize: '0.7rem' }}
                        >
                          Remover
                        </Button>
                      )}
                    </Box>
                    <OutlinedInput
                      id={`meter-${c.key}`}
                      name={c.key}
                      value={opt.value}
                      onChange={onValueChange}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} className="pdf-body">
        <DialogTitle className="pdf-title">Adicionar Tecido Personalizado</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Tecido"
            value={newFabric.name}
            onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })}
            placeholder="Ex: Linho Importado"
            sx={{
              mb: 2,
              mt: 2,
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF8DAA',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF8DAA',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D83082',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#D83082',
                '&.Mui-focused': {
                  color: '#D83082',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Preço por Metro (R$)"
            value={newFabric.cost}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]*[,]?[0-9]*$/.test(value) || value === '') {
                setNewFabric({ ...newFabric, cost: value });
              }
            }}
            placeholder="0,00"
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF8DAA',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF8DAA',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D83082',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#D83082',
                '&.Mui-focused': {
                  color: '#D83082',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#D83082' }}>
            Cancelar
          </Button>
          <Button onClick={handleAddCustomFabric} className="calc">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </fieldset>
  );
}