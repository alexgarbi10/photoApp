export const formatDate = (value) => {
  const date = new Date(value);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  const formattedDate = `${ day }/${ month }/${ year } ${ hours }:${ minutes }:${ seconds }`;
  return formattedDate;
};
