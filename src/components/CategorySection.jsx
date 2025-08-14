// components/CategorySection.js
import { useState } from 'react';
import {
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { splitIntoColumns } from '../utils/utils';

export default function CategorySection({ category, notionOptions, onToggle, onValueChange }) {
  const [open, setOpen] = useState(true);
  const cols = splitIntoColumns(category.children, 2);

  return (
    <fieldset key={category.key} className="section-aviamentos" style={{ paddingBottom: '2rem', position: 'relative' }}>
      <legend>{category.name}</legend>
      <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpen((prev) => !prev)}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      {open && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {cols.map((col, idx) => (
            <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {col.map((item) => (
                <Box key={item.key} className="aviamento-item" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <FormControlLabel
                    control={<Checkbox name={item.key} checked={notionOptions[item.key]?.selected || false} onChange={onToggle} />}
                    label={item.name}
                    sx={{
                      alignItems: 'flex-start',
                      '.MuiFormControlLabel-label': {
                        whiteSpace: 'normal',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                  {notionOptions[item.key]?.selected && (
                    <OutlinedInput
                      size="small"
                      name={item.key}
                      value={notionOptions[item.key].value}
                      onChange={onValueChange}
                      placeholder="0"
                      margin="dense"
                      className="neru"
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
}