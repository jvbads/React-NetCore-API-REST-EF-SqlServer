import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, useTheme, useMediaQuery, Card, CardContent, Stack, AppBar, Toolbar, Container,
  FormControl, InputLabel, Select, MenuItem, TextField, Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm';
import { TaskService, formatTaskResponse } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      const formattedTasks = response.data.map(task => formatTaskResponse(task));
      setTasks(formattedTasks);
      setFilteredTasks(formattedTasks);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao carregar tarefas. Por favor, tente novamente.',
        severity: 'error'
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (statusFilter === 'todos') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => {
        return task.status?.name === statusFilter || task.status === statusFilter;
      });
      setFilteredTasks(filtered);
    }
  }, [statusFilter, tasks]);

  useEffect(() => {
    const filtered = tasks.filter(task => {
      const matchesStatus = statusFilter === 'todos' || task.status?.name === statusFilter || task.status === statusFilter;
      
      if (!searchTerm) return matchesStatus;

      const searchLower = searchTerm.toLowerCase();
      
      const matchesTitle = task.titulo.toLowerCase().includes(searchLower);
      
      const matchesDescription = task.descricao?.toLowerCase().includes(searchLower);
      
      let matchesDate = false;
      if (task.dataConclusao) {
        const taskDate = new Date(task.dataConclusao);
        const dateStr = taskDate.toLocaleDateString('pt-BR');
        const dateStrReverse = dateStr.split('/').reverse().join('/');
        matchesDate = dateStr.includes(searchLower) || dateStrReverse.includes(searchLower);
      }
      
      return matchesStatus && (matchesTitle || matchesDescription || matchesDate);
    });
    setFilteredTasks(filtered);
  }, [statusFilter, searchTerm, tasks]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (task = null) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setOpen(false);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await TaskService.deleteTask(taskToDelete.id);
      setSnackbar({
        open: true,
        message: 'Tarefa excluída com sucesso!',
        severity: 'success'
      });
      handleDeleteClose();
      fetchTasks();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao excluir tarefa. Por favor, tente novamente.',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTask) {
        await TaskService.updateTask(selectedTask.id, formData);
        setSnackbar({
          open: true,
          message: 'Tarefa atualizada com sucesso!',
          severity: 'success'
        });
      } else {
        await TaskService.createTask(formData);
        setSnackbar({
          open: true,
          message: 'Tarefa criada com sucesso!',
          severity: 'success'
        });
      }
      handleClose();
      fetchTasks();
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.DataConclusao?.[0] || 
                          error.response?.data?.errors?.Status?.[0] ||
                          error.response?.data?.title ||
                          'Erro ao salvar tarefa. Por favor, tente novamente.';
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  const getStatusColor = (status) => {
    const statusName = status?.name || status;
    switch (statusName) {
      case 'Pendente':
        return {
          color: '#ed6c02',
          backgroundColor: '#fff3e0',
          borderColor: '#ed6c02'
        };
      case 'Em Progresso':
        return {
          color: '#0288d1',
          backgroundColor: '#e3f2fd',
          borderColor: '#0288d1'
        };
      case 'Concluída':
        return {
          color: '#2e7d32',
          backgroundColor: '#e8f5e9',
          borderColor: '#2e7d32'
        };
      default:
        return {
          color: '#757575',
          backgroundColor: '#f5f5f5',
          borderColor: '#757575'
        };
    }
  };

  const renderStatusChip = (status) => {
    const colors = getStatusColor(status);
    return (
      <Chip 
        label={formatStatus(status)} 
        size="small"
        sx={{ 
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
          color: colors.color,
          fontWeight: 500,
          '& .MuiChip-label': {
            px: 1.5,
            py: 0.5
          }
        }}
      />
    );
  };

  const formatStatus = (status) => {
    const statusName = status?.name || status;
    switch (statusName) {
      case 'Pendente':
        return 'Pendente';
      case 'EmProgresso':
        return 'Em Progresso';
      case 'Concluida':
        return 'Concluída';
      default:
        return statusName;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderMobileView = () => (
    <Stack spacing={2}>
      {filteredTasks.map((task) => (
        <Card 
          key={task.id}
          sx={{ 
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1, mr: 2 }}>
                  {task.titulo}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    onClick={() => handleOpen(task)}
                    size="small"
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.lighter' }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteClick(task)}
                    size="small"
                    sx={{ 
                      color: 'error.main',
                      '&:hover': { backgroundColor: 'error.lighter' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {task.descricao || 'Sem descrição'}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                pt: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {renderStatusChip(task.status)}
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.5,
                  color: 'text.secondary'
                }}>
                  <Typography variant="body2">
                    Criação: {formatDate(task.dataCriacao)}
                  </Typography>
                  <Typography variant="body2">
                    Conclusão: {formatDate(task.dataConclusao)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );

  const renderDesktopView = () => (
    <TableContainer 
      component={Paper}
      sx={{ 
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data de Criação</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data de Conclusão</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id} hover>
              <TableCell>{task.titulo}</TableCell>
              <TableCell>{task.descricao || '-'}</TableCell>
              <TableCell>
                {renderStatusChip(task.status)}
              </TableCell>
              <TableCell>{formatDate(task.dataCriacao)}</TableCell>
              <TableCell>{formatDate(task.dataConclusao)}</TableCell>
              <TableCell>
                <IconButton 
                  onClick={() => handleOpen(task)}
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.lighter' }
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDeleteClick(task)}
                  sx={{ 
                    color: 'error.main',
                    '&:hover': { backgroundColor: 'error.lighter' }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Gerenciador de Tarefas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />}
            onClick={() => handleOpen()}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderRadius: 1.5,
              textTransform: 'none',
              px: isMobile ? 1.5 : 3,
              py: isMobile ? 0.5 : 1,
              fontSize: isMobile ? '0.8125rem' : '0.9375rem',
              minWidth: isMobile ? 'auto' : '120px'
            }}
          >
            Nova Tarefa
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          mb: 2,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <TextField
            size="small"
            label="Pesquisar"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por título, descrição ou data (dd/mm/aaaa)"
            sx={{ 
              minWidth: 200,
              backgroundColor: 'background.paper',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
              sx={{
                backgroundColor: 'background.paper',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Em Progresso">Em Progresso</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isMobile ? renderMobileView() : renderDesktopView()}
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>
          {selectedTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        </DialogTitle>
        <DialogContent>
          <TaskForm
            task={selectedTask}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteClose}
        PaperProps={{
          sx: { 
            borderRadius: 1.5,
            maxWidth: isMobile ? '90%' : '400px',
            width: '100%'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 1,
            fontSize: isMobile ? '1.1rem' : '1.25rem'
          }}
        >
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Tem certeza que deseja excluir a tarefa "{taskToDelete?.titulo}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button 
            onClick={handleDeleteClose}
            size={isMobile ? "small" : "medium"}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            size={isMobile ? "small" : "medium"}
            sx={{ borderRadius: 1.5 }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 1.5
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskList; 