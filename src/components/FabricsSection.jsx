import { useState } from 'react';
import {
  Box,
  IconButton,
  Autocomplete,
  TextField,
  Chip,
  Paper,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { cloths } from '../utils/utils';

export default function FabricsSection({ clothsOptions, onValueChange, setClothsOptions }) {
  const [openFabrics, setOpenFabrics] = useState(true);

  return (
    <fieldset className="section-aviamentos">
      <legend>Tecidos</legend>
      <Box sx={{ position: 'relative', paddingBottom: '2rem' }}>
        <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpenFabrics((f) => !f)}>
          {openFabrics ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        {openFabrics && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Autocomplete
              fullWidth
              multiple
              options={cloths}
              disableCloseOnSelect
              disablePortal
              getOptionLabel={(opt) => `${opt.name} (R$ ${opt.cost})`}
              value={cloths.filter((c) => clothsOptions[c.key].selected)}
              onChange={(_, selectedItems) => {
                const selectedKeys = selectedItems.map((i) => i.key);
                setClothsOptions(
                  cloths.reduce((acc, cloth) => {
                    const was = clothsOptions[cloth.key].value;
                    const sel = selectedKeys.includes(cloth.key);
                    return {
                      ...acc,
                      [cloth.key]: { selected: sel, value: sel ? was : '' },
                    };
                  }, {})
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Tecidos"
                  placeholder="Selecione ou busque..."
                  className="full-Imputs"
                  InputLabelProps={{
                    sx: {
                      color: '#D83082',
                      '&.Mui-focused': {
                        color: '#D83082',
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#EF8DAA',
                    },
                  }}
                />
              )}
              PopperProps={{
                sx: {
                  width: '100% !important',
                  overflowX: 'hidden',
                },
              }}
              PaperComponent={(props) => <Paper {...props} />}
              sx={{
                '& .MuiPaper-root': {
                  width: '100%',
                  boxSizing: 'border-box',
                  bgcolor: '#ffe2f1',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                },
              }}
              ListboxProps={{
                sx: {
                  maxHeight: 200,
                  overflowY: 'auto',
                  '& .MuiAutocomplete-option': {
                    color: '#F7C0D0',
                    '&.Mui-focused': {
                      bgcolor: '#D83082',
                      color: '#fff',
                    },
                  },
                },
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((opt, idx) => (
                  <Chip
                    key={opt.key}
                    label={opt.name}
                    size="small"
                    sx={{
                      backgroundColor: '#D83082',
                      color: '#fff',
                      '& .MuiChip-deleteIcon': { color: '#EF8DAA' },
                    }}
                    {...getTagProps({ index: idx })}
                  />
                ))
              }
            />
            {cloths.map((c) => {
              const opt = clothsOptions[c.key];
              return (
                opt.selected && (
                  <Box key={c.key} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column' }}>
                    <InputLabel htmlFor={`meter-${c.key}`}>{c.name} (m)</InputLabel>
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
    </fieldset>
  );
}