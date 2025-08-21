import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import { generatePdf } from '../utils/generatePdf'; 

export default function ResultDisplay({ result, details, addPiece, pieces,handleReset }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [images, setImages] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reset=()=>{
    handleReset()
    setImages([])
    setData('')
    setName('')
  }
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setImages(selectedFiles);
  };

  const handleGenerate = async () => {
    await generatePdf(name, images, pieces, data);
    handleClose();
    reset()
  };

  return (
    <Box id="result" sx={{ mt: 3 }}>
      {result !== null &&(
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Total: {result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
          <Button onClick={handleOpen} sx={{ ml: 1 }} className='pdf'>
            pdf
          </Button>
        </Box>
        <Box sx={{ borderTop: '1px solid #ffc5d3', pt: 1 }}>
          {details.map((item, idx) => (
            <Typography key={idx} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.name}</span>
              <span>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </Typography>
          ))}
        </Box>
        <Button onClick={addPiece} sx={{ mt: 2 }} className="calc">Incluir mais peças</Button>
      </>
      )}
      {pieces.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
            Peças Adicionadas
          </Typography>
          {pieces.map((p, idx) => (
            <Typography key={idx} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{p.name} (Quant: {p.quantity})</span>
              <span>{p.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </Typography>
          ))}
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} className='pdf-body'>
        <DialogTitle variant="h4" gutterBottom sx={{ textAlign: 'center' }}  className='pdf-title'>Gerar PDF</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Cliente"
            value={name}
            placeholder="Digite o nome do cliente"
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, mt:2,
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffc5d3',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffc5d3',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff8aa3',
              },
            }}
            InputLabelProps={{
                    sx: {
                      color: '#a84d8d',
                      '&.Mui-focused': {
                        color: '#a84d8d',
                      },
                    },
            }}
          />
          <TextField
            fullWidth
            label="Data"
            value={data}
            placeholder="data"
            onChange={(e) => setData(e.target.value)}
            type="date"
            
            sx={{ mb: 2, mt:2,
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffc5d3',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffc5d3',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff8aa3',
              },
            }}
            InputLabelProps={{
                    shrink: true, 
                    sx: {
                      color: '#a84d8d',
                      '&.Mui-focused': {
                        color: '#a84d8d',
                      },
                    },
                  }}
          />
         <label htmlFor="file-upload" className="custom-file-upload">
            Imagens
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {images.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1, color: '#ff8aa3' }}>
              {images.length} imagem(s) selecionada(s)
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGenerate} className="calc">
            Gerar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}