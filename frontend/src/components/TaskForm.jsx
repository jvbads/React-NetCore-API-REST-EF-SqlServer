import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { TASK_STATUS, getStatusValue, formatStatus } from '../constants/taskStatus';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.PENDING,
    completionDate: null
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.titulo,
        description: task.descricao || '',
        status: task.status,
        completionDate: task.dataConclusao ? new Date(task.dataConclusao) : null
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      completionDate: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: getStatusValue(formData.status)
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!formData.title}
            helperText={!formData.title ? 'O título é obrigatório' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value={TASK_STATUS.PENDING}>{formatStatus(TASK_STATUS.PENDING)}</MenuItem>
              <MenuItem value={TASK_STATUS.IN_PROGRESS}>{formatStatus(TASK_STATUS.IN_PROGRESS)}</MenuItem>
              <MenuItem value={TASK_STATUS.COMPLETED}>{formatStatus(TASK_STATUS.COMPLETED)}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Conclusão"
              value={formData.completionDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: false
                }
              }}
              minDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={!formData.title}
            >
              {task ? 'Atualizar' : 'Criar'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm; 