export const shouldRenderColumn = (columns: any, key: string) => {
  const displayColumns = columns.filter((column: any) => column.isShow);
  return displayColumns.some((column: any) => column.key === key);
};
