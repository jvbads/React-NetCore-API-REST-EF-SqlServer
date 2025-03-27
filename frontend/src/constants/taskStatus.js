export const TASK_STATUS = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em Progresso',
  COMPLETED: 'Concluída'
};

export const TASK_STATUS_API = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'EmProgresso',
  COMPLETED: 'Concluida'
};

export const getStatusColor = (status) => {
  const statusName = status?.name || status;
  switch (statusName) {
    case TASK_STATUS.PENDING:
      return {
        color: '#ed6c02',
        backgroundColor: '#fff3e0',
        borderColor: '#ed6c02'
      };
    case TASK_STATUS.IN_PROGRESS:
      return {
        color: '#0288d1',
        backgroundColor: '#e3f2fd',
        borderColor: '#0288d1'
      };
    case TASK_STATUS.COMPLETED:
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

export const formatStatus = (status) => {
  const statusName = status?.name || status;
  switch (statusName) {
    case TASK_STATUS.PENDING:
      return TASK_STATUS.PENDING;
    case TASK_STATUS.IN_PROGRESS:
      return TASK_STATUS.IN_PROGRESS;
    case TASK_STATUS.COMPLETED:
      return TASK_STATUS.COMPLETED;
    default:
      return status;
  }
};

export const getStatusValue = (displayStatus) => {
  switch (displayStatus) {
    case TASK_STATUS.PENDING:
      return TASK_STATUS_API.PENDING;
    case TASK_STATUS.IN_PROGRESS:
      return TASK_STATUS_API.IN_PROGRESS;
    case TASK_STATUS.COMPLETED:
      return TASK_STATUS_API.COMPLETED;
    default:
      return displayStatus;
  }
}; 