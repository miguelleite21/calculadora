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
import CustomAutocomplete from './CustomAutocomplete';

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
            <CustomAutocomplete
              options={cloths}
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
              multiple={true}
              label="Tecidos"
              placeholder="Selecione ou busque..."
              getOptionLabel={(opt) => `${opt.name} (R$ ${opt.cost})`}
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