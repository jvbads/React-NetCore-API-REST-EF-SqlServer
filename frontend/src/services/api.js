import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44396',
  headers: {
    'Content-Type': 'application/json',
  },
});

const formatTaskData = (task, id = null) => {
  const statusMap = {
    'Pendente': 0,
    'Em Progresso': 1,
    'Concluída': 2,
    'Concluida': 2,
    'EmProgresso': 1
  };

  const formattedTask = {
    id: id || task.id,
    titulo: task.title,
    descricao: task.description || null,
    status: statusMap[task.status] ?? 0,
    dataConclusao: task.completionDate ? 
      `${task.completionDate.getFullYear()}-${String(task.completionDate.getMonth() + 1).padStart(2, '0')}-${String(task.completionDate.getDate()).padStart(2, '0')}` : 
      null
  };

  Object.keys(formattedTask).forEach(key => {
    if (formattedTask[key] === null) {
      delete formattedTask[key];
    }
  });

  return formattedTask;
};

const formatTaskResponse = (task) => {
  const statusMap = {
    0: 'Pendente',
    1: 'Em Progresso',
    2: 'Concluída'
  };

  return {
    id: task.id,
    titulo: task.titulo,
    descricao: task.descricao || '',
    status: task.status?.name || statusMap[task.status] || 'Pendente',
    dataConclusao: task.dataConclusao || '',
    dataCriacao: task.dataCriacao
  };
};

const TaskService = {
  getAllTasks: async () => {
    try {
      const response = await api.get('/Task/GetAll');
      return response;
    } catch (error) {
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await api.get(`/Task/GetById/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const formattedTask = formatTaskData(task);
      const response = await api.post('/Task/Create', formattedTask);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const formattedTask = formatTaskData(task, id);
      const response = await api.put(`/Task/Update/${id}`, formattedTask);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/Task/Delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export { TaskService, formatTaskResponse };

export default api; 