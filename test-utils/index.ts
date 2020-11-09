export function getHeaderIds(state: any) {
  return state.headerGroups.map((headerGroup: any) =>
    headerGroup.headers.map((header: any) => header.id)
  )
}

export function getRowValues(state: any) {
  return state.rows.map((row: any) => row.cells.map((cell: any) => cell.value))
}
