export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const isDateInSearchTerm = (date, searchTerm) => {
  if (!date || !searchTerm) return false;
  const dateStr = formatDate(date);
  const dateStrReverse = dateStr.split('/').reverse().join('/');
  const searchLower = searchTerm.toLowerCase();
  return dateStr.includes(searchLower) || dateStrReverse.includes(searchLower);
}; 