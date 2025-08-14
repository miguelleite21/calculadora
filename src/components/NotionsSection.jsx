// components/NotionsSection.js
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
import { rawNotions, splitIntoColumns } from '../utils/utils';

export default function NotionsSection({ notionOptions, onToggle, onValueChange }) {
  const [openAviamentos, setOpenAviamentos] = useState(true);
  const noParent = rawNotions.filter((item) => !item.parent);
  const noParentCols = splitIntoColumns(noParent, 2);

  if (noParentCols.length === 0) return null;

  return (
    <fieldset className="section-aviamentos" style={{ paddingBottom: '2rem', position: 'relative' }}>
      <legend>Aviamentos</legend>
      <IconButton className="kawaii-toggle-btn" size="small" onClick={() => setOpenAviamentos((a) => !a)}>
        {openAviamentos ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      {openAviamentos && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          {noParentCols.map((col, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {col.map((item) => (
                <Box key={item.key} className="aviamento-item" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <FormControlLabel
                    control={<Checkbox name={item.key} checked={notionOptions[item.key].selected} onChange={onToggle} />}
                    label={item.name}
                  />
                  {notionOptions[item.key].selected && (
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