import { useState, useEffect } from 'react';
import { TaskService, formatTaskResponse } from '../services/api';
import { isDateInSearchTerm } from '../utils/dateUtils';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      setSnackbar({
        open: true,
        message: 'Tarefa excluída com sucesso!',
        severity: 'success'
      });
      fetchTasks();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao excluir tarefa. Por favor, tente novamente.',
        severity: 'error'
      });
    }
  };

  const handleSubmitTask = async (formData, taskId = null) => {
    try {
      if (taskId) {
        await TaskService.updateTask(taskId, formData);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task => {
      const matchesStatus = statusFilter === 'todos' || task.status?.name === statusFilter || task.status === statusFilter;
      
      if (!searchTerm) return matchesStatus;

      const searchLower = searchTerm.toLowerCase();
      const matchesTitle = task.titulo.toLowerCase().includes(searchLower);
      const matchesDescription = task.descricao?.toLowerCase().includes(searchLower);
      const matchesDate = isDateInSearchTerm(task.dataConclusao, searchTerm);
      
      return matchesStatus && (matchesTitle || matchesDescription || matchesDate);
    });
    setFilteredTasks(filtered);
  }, [statusFilter, searchTerm, tasks]);

  return {
    tasks,
    filteredTasks,
    statusFilter,
    searchTerm,
    snackbar,
    setSnackbar,
    handleStatusFilterChange,
    handleSearchChange,
    handleDeleteTask,
    handleSubmitTask,
    fetchTasks
  };
}; 