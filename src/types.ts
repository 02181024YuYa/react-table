export interface TableOptions {
  data: unknown[]
  columns: Column[]
  debug?: boolean
  defaultColumn?: Column
  initialState?: TableState
  state?: TableState
  onStateChange?: (newState: TableState, instance: TableInstance) => void
  getSubRows?: <T extends { subRows?: any[] }>(
    originalRow: T,
    index: number
  ) => unknown[]
  getRowId?: <T>(originalRow: T, index: number, parent?: Row) => string
  enableFilters?: boolean
  filterFromChildrenUp?: boolean
  paginateExpandedRows?: boolean

  // withColumnFilters
  onColumnFiltersChange?: (
    updater: Updater<TableState['columnFilters']>,
    instance: TableInstance
  ) => void
  filterTypes?: Record<string, FilterFn>
  manualColumnFilters?: boolean
  autoResetColumnFilters?: boolean
  disableFilters?: boolean
  disableColumnFilters?: boolean
  enableFacetedFilters?: boolean
  enableUniqueValues?: boolean
  enableMinMaxValues?: boolean

  // withColumnOrder
  onColumnOrderChange?: (
    updater: Updater<TableState['columnOrder']>,
    instance: TableInstance
  ) => void

  // withColumnPinning
  onColumnPinningChange?: (
    updater: Updater<TableState['columnPinning']>,
    instance: TableInstance
  ) => void
  disablePinning: boolean

  // withColumnResizing
  onColumnResizingChange?: (
    updater: Updater<TableState['columnResizing']>,
    instance: TableInstance
  ) => void
  disableResizing?: boolean

  // withColumnVisibility
  onColumnVisibilityChange?: (
    updater: Updater<TableState['columnVisibility']>,
    instance: TableInstance
  ) => void
  disableHiding?: boolean

  // withExpanding
  onExpandedChange?: (
    updater: Updater<TableState['expanded']>,
    instance: TableInstance
  ) => void
  autoResetExpanded?: boolean
  manualExpanding?: boolean
  manualExpandedKey?: string

  // withSorting
  onSortingChange?: (
    updater: Updater<TableState['sorting']>,
    instance: TableInstance
  ) => void
  sortTypes?: Record<string, SortFn>
  manualSorting?: boolean
  autoResetSorting?: boolean
  isMultiSortEvent?: (event: any) => boolean
  disableMultiSort?: boolean
  disableSortRemove?: boolean
  disableMultiRemove?: boolean
  maxMultiSortColCount?: number
  disableSorting?: boolean
}

export interface TableInstance {
  options: TableOptions
  plugs: PluginPlugs
  setState: (...any: any[]) => any
  columns: TableColumn[]
  allColumns: TableColumn[]
  leafColumns: TableColumn[]
  state: TableState
  reset: () => void
  getColumnWidth: (id?: ColumnId) => number
  getTotalWidth: () => number
  getTableHeadProps: (userProps?: any) => TableHeadProps
  getTableFooterProps: (userProps?: any) => TableFooterProps
  getTableBodyProps: (userProps?: any) => TableBodyProps
  getTableProps: (userProps?: any) => TableProps
  headerGroups: HeaderGroup[]
  footerGroups: FooterGroup[]
  flatHeaders: Header[]
  flatFooters: Footer[]
  rows: Row[]
  flatRows: Row[]
  rowsById: Record<RowId, Row>

  // withColumnFilters
  setColumnFilters: (updater: Updater<TableState['columnFilters']>) => void
  resetColumnFilters: () => void
  getColumnCanFilter: (columnId?: ColumnId) => boolean
  getColumnIsFiltered: (columnId?: ColumnId) => boolean
  getColumnFilterValue: (columnId?: ColumnId) => any
  getColumnFilterIndex: (columnId?: ColumnId) => number
  setColumnFilterValue: (columnId?: ColumnId, value?: any) => void

  // withColumnOrder
  setColumnOrder: (updater: Updater<TableState['columnOrder']>) => void
  resetColumnOrder: () => void

  // withColumnPinning
  setColumnPinning: (updater: Updater<TableState['columnPinning']>) => void
  resetColumnPinning: () => void
  toggleColumnPinning: (
    columnId: ColumnId,
    side: ColumnPinningSide,
    value?: boolean
  ) => void
  getColumnCanPin: (columnId: ColumnId) => boolean
  getColumnIsPinned: (columnId: ColumnId) => ColumnPinningStatus
  getColumnPinnedIndex: (columnId: ColumnId) => number
  centerLeafColumns: Column[]
  leftLeafColumns: Column[]
  rightLeafColumns: Column[]
  centerHeaderGroups: HeaderGroup[]
  leftHeaderGroups: HeaderGroup[]
  rightHeaderGroups: HeaderGroup[]

  // withColumnResizing
  setColumnResizing: (updater: Updater<TableState['columnResizing']>) => void
  getColumnCanResize: (columnId: ColumnId) => boolean
  getColumnIsResizing: (columnId: ColumnId) => boolean

  // withColumnVisibility
  setColumnVisibility: (
    updater: Updater<TableState['columnVisibility']>
  ) => void
  getColumnIsVisible: (columnId: ColumnId) => boolean
  toggleColumnVisibility: (columnId: ColumnId, value?: boolean) => void
  getColumnCanHide: (columnId: ColumnId) => boolean
  toggleAllColumnsVisible: (value?: boolean) => void
  getIsAllColumnsVisible: () => boolean
  getIsSomeColumnsVisible: () => boolean
  preVisibleLeafColumns: TableColumn[]
  getToggleAllColumnsVisibilityProps: (
    userProps?: any
  ) => ToggleAllColumnsVisibilityProps

  // withExpanding
  setExpanded: (updater: Updater<TableState['expanded']>) => void
  resetExpanded: () => void
  getIsAllRowsExpanded: () => boolean
  getExpandedDepth: () => number
  toggleRowExpanded: (rowId: RowId, value?: boolean) => void
  toggleAllRowsExpanded: (value?: boolean) => void
  getToggleAllRowsExpandedProps: (userProps?: any) => ToggleAllRowsExpandedProps

  // withSorting
  setSorting: (updater: Updater<TableState['sorting']>) => void
  resetSorting: () => void
  toggleColumnSorting: (
    columnId?: ColumnId,
    desc?: boolean,
    multi?: boolean
  ) => void
  getColumnCanSort: (columnId?: ColumnId) => boolean
  getColumnSortedIndex: (columnId?: ColumnId) => number
  getColumnIsSorted: (columnId?: ColumnId) => boolean
  getColumnIsSortedDesc: (columnId?: ColumnId) => boolean
  clearColumnSorting: (columnId?: ColumnId) => void
}

export type ColumnId = string | number
export type RowId = string | number
export type CellId = string | number

export type Updater<T> = T | ((old: T) => T)
export type FromUpdater<T extends (...any: any[]) => any> = T extends (
  old: infer U
) => any
  ? U
  : T

export interface TableState {
  columnFilters?: ColumnFilter[]
  columnOrder?: ColumnId[]
  columnPinning?: ColumnPinning
  columnResizing?: ColumnResizing
  columnVisibility?: ColumnVisibility
  expanded?: Expanded
  sorting?: SortObj[]
}

export interface Row<T = any> {
  id: RowId
  subRows: Row[]
  getRowProps: (userProps?: any) => RowProps
  original: T
  index: number
  depth: number
  values: RowValues
  originalSubRows: T[]
  leafRows: Row[]
  cells: Cell[]
  getVisibleCells: () => Cell[]

  // withExpanding
  toggleExpanded?: (value?: boolean) => void
  getIsExpanded?: () => boolean
  getCanExpand?: () => boolean
  getToggleExpandedProps?: (userProps?: any) => ToggleExpandedProps
}

export interface RowValues {
  [key: string]: any
}

export interface Column {
  Header?: unknown | ((...any: any) => JSX.Element)
  accessor?: string | ((originalRow: any, index: number, row: Row) => unknown)
  id?: ColumnId
  Cell?: unknown | ((...any: any) => JSX.Element)
  defaultIsVisible?: boolean
  width?: number
  minWidth?: number
  maxWidth?: number
  columns?: Column[]

  // withColumnFilters
  filterType?: FilterType
  disableAllFilters?: boolean
  disableFilter?: boolean
  defaultCanFilter?: boolean
  defaultCanFilterColumn?: boolean

  // withSorting
  sortDescFirst?: boolean
  disableSorting?: boolean
  defaultCanSort?: boolean
  sortType?: SortType

  // withColumnFilters
  enableUniqueValues?: boolean
  enableMinMaxValues?: boolean
  defaultCanPin?: boolean

  // withColumnResizing
  disableResizing?: boolean
  defaultCanResize?: boolean

  // withColumnVisibility
  disableHiding?: boolean
  defaultCanHide?: boolean

  // withExpanding
  isExpanderColumn?: boolean

  // withColumnPinning
  disablePinning?: boolean
}

export interface TableColumn extends Column {
  id: ColumnId
  accessor?: (originalRow: any, index: number, row: Row) => unknown
  depth: number
  originalColumn: Column
  parent?: TableColumn
  prepared?: boolean
  render?: (Comp?: any, props?: any) => JSX.Element | null
  getWidth?: () => number
  columns?: TableColumn[]

  // withSorting
  sortInverted?: boolean
  getCanSort?: () => boolean
  getSortedIndex?: () => number
  getIsSorted?: () => boolean
  toggleSorting?: (desc?: boolean, multi?: boolean) => void
  clearSorting?: () => void
  getIsSortedDesc?: () => boolean
  getToggleSortingProps?: (userProps?: any) => ToggleSortingProps

  // withColumnFilters
  getCanFilter?: () => boolean
  getFilterIndex?: () => number
  getIsFiltered?: () => boolean
  getFilterValue?: () => unknown
  setFilterValue?: (value: unknown) => void
  preFilteredRows?: Row[]
  preFilteredUniqueValues?: Map<unknown, number>
  preFilteredMinMaxValues?: [MinMaxValue, MinMaxValue]

  // withColumnResizing
  getIsResizing?: () => boolean
  getCanResize?: () => boolean
  getResizerProps?: (userProps?: any) => ResizerProps

  // withColumnVisibility
  getIsVisible?: () => boolean
  getCanHide?: () => boolean
  toggleVisibility?: (value?: boolean) => void
  getToggleVisibilityProps?: (userProps?: any) => ToggleColumnVisibilityProps

  // withColumnPinning
  getCanPin?: () => boolean
  getPinnedIndex?: () => number
  getIsPinned?: () => ColumnPinningStatus
  togglePinning?: (side: ColumnPinningSide, value?: boolean) => void
}

type MinMaxValue = number | string

export interface Cell {
  id: CellId
  getCellProps: (userProps?: any) => CellProps
  row: Row
  column: TableColumn
  value: any
  render: (Comp?: any, props?: any) => JSX.Element | null
}

export interface Plugin {
  name: string
  after: string[]
  plugs: PluginPlugs
}

export interface Header extends TableColumn {
  isPlaceholder: boolean
  column: TableColumn
  getHeaderProps: (userProps?: any) => HeaderProps
  getFooterProps: (userProps?: any) => FooterProps
  getWidth: () => number
  subHeaders: Header[]
}

export interface Footer extends Header {}

export interface HeaderGroup {
  headers: Header[]
}
export interface FooterGroup {
  footers: Footer[]
}
export interface TableProps {}
export interface TableBodyProps {}
export interface TableHeadProps {}
export interface TableFooterProps {}
export interface HeaderGroupProps {}
export interface FooterGroupProps {}
export interface HeaderProps {}
export interface FooterProps {}
export interface RowProps {}
export interface CellProps {}

export type UseReduceOptions = (
  options: TableOptions,
  { instance }: { instance: TableInstance }
) => TableOptions
export type UseInstanceAfterState = (instance: TableInstance) => TableInstance
export type UseReduceColumns = (
  columns: TableColumn[],
  { instance }: { instance: TableInstance }
) => TableColumn[]
export type UseReduceAllColumns = (
  allColumns: TableColumn[],
  { instance }: { instance: TableInstance }
) => TableColumn[]
export type UseReduceLeafColumns = (
  leafColumns: TableColumn[],
  { instance }: { instance: TableInstance }
) => TableColumn[]
export type DecorateColumn = (
  column: TableColumn,
  { instance }: { instance: TableInstance }
) => TableColumn
export type UseReduceHeaderGroups = (
  headerGroups: HeaderGroup[],
  { instance }: { instance: TableInstance }
) => HeaderGroup[]
export type UseReduceFooterGroups = (
  footerGroups: FooterGroup[],
  { instance }: { instance: TableInstance }
) => FooterGroup[]
export type UseReduceFlatHeaders = (
  flatHeaders: Header[],
  { instance }: { instance: TableInstance }
) => Header[]
export type DecorateHeader = (
  header: Header,
  { instance }: { instance: TableInstance }
) => Header
export type DecorateRow = (
  row: Row,
  { instance }: { instance: TableInstance }
) => Row
export type DecorateCell = (
  cell: Cell,
  { instance }: { instance: TableInstance }
) => Cell
export type UseInstanceAfterDataModel = (
  instance: TableInstance
) => TableInstance
export type ReduceTableProps = (
  tableProps: TableProps,
  { instance }: { instance: TableInstance }
) => TableProps
export type ReduceTableBodyProps = (
  tableBodyProps: TableBodyProps,
  { instance }: { instance: TableInstance }
) => TableBodyProps
export type ReduceTableHeadProps = (
  tableHeadProps: TableHeadProps,
  { instance }: { instance: TableInstance }
) => TableHeadProps
export type ReduceTableFooterProps = (
  tableFootProps: TableFooterProps,
  { instance }: { instance: TableInstance }
) => TableFooterProps
export type ReduceHeaderGroupProps = (
  headerGroupProps: HeaderGroupProps,
  { instance }: { instance: TableInstance }
) => HeaderGroupProps
export type ReduceFooterGroupProps = (
  footerGroupProps: FooterGroupProps,
  { instance, header }: { instance: TableInstance; header: Header }
) => FooterGroupProps
export type ReduceHeaderProps = (
  headerProps: HeaderProps,
  { instance, header }: { instance: TableInstance; header: Header }
) => HeaderProps
export type ReduceFooterProps = (
  footerProps: FooterProps,
  { instance, header }: { instance: TableInstance; header: Header }
) => HeaderProps
export type ReduceRowProps = (
  rowProps: RowProps,
  { instance, row }: { instance: TableInstance; row: Row }
) => RowProps
export type ReduceCellProps = (
  cellProps: CellProps,
  { instance, cell }: { instance: TableInstance; cell: Cell }
) => CellProps

export type PluginPlugs = {
  useReduceOptions?: UseReduceOptions
  useInstanceAfterState?: UseInstanceAfterState
  useReduceColumns?: UseReduceColumns
  useReduceAllColumns?: UseReduceAllColumns
  useReduceLeafColumns?: UseReduceLeafColumns
  decorateColumn?: DecorateColumn
  useReduceHeaderGroups?: UseReduceHeaderGroups
  useReduceFooterGroups?: UseReduceFooterGroups
  useReduceFlatHeaders?: UseReduceFlatHeaders
  decorateHeader?: DecorateHeader
  decorateRow?: DecorateRow
  decorateCell?: DecorateCell
  useInstanceAfterDataModel?: UseInstanceAfterDataModel
  reduceTableProps?: ReduceTableProps
  reduceTableBodyProps?: ReduceTableBodyProps
  reduceTableHeadProps?: ReduceTableHeadProps
  reduceTableFooterProps?: ReduceTableFooterProps
  reduceHeaderGroupProps?: ReduceHeaderGroupProps
  reduceFooterGroupProps?: ReduceFooterGroupProps
  reduceHeaderProps?: ReduceHeaderProps
  reduceFooterProps?: ReduceFooterProps
  reduceRowProps?: ReduceRowProps
  reduceCellProps?: ReduceCellProps
}

export interface PluginPlugFn {
  (...any: any): any
  after?: string[]
}

export type PlugName = keyof PluginPlugs

export type PlugType = [PlugName, PluginPlugBuilder]

export type PluginPlugBuilder = any

export interface RendererMeta {}

// withColumnFilters

export type FilterType =
  | 'text'
  | 'exactText'
  | 'exactTextCase'
  | 'includes'
  | 'includesAll'
  | 'exact'
  | 'equals'
  | 'between'
  | string
  | FilterFn

export interface ColumnFilter {
  id: ColumnId
  value: any
}

export interface FilterFn {
  (rows: Row[], columnIds: ColumnId[], filterValue: any): Row[]
  autoRemove?: (filterValue: any, column: TableColumn) => boolean
}

// withColumnPinning

export interface ColumnPinning {
  left?: ColumnId[]
  right?: ColumnId[]
}

export type ColumnPinningSide = 'left' | 'right'
export type ColumnPinningStatus = ColumnPinningSide | false

// withColumnResizing

export interface ColumnResizing {
  columnWidths?: Record<ColumnId, number>
  isResizingColumn?: false | ColumnId
  startX?: null | number
  headerIdWidths?: [ColumnId, number][]
  columnWidth?: number
}

export interface ResizerProps {
  onMouseDown?: any
  onTouchStart?: any
  draggable?: boolean
  role?: 'separator' | string
}

// withColumnVisibility
export type ColumnVisibility = Record<ColumnId, boolean>

export interface ToggleAllColumnsVisibilityProps {
  onChange?: any
  title?: string
  checked?: boolean
  indeterminate?: boolean
}

export interface ToggleColumnVisibilityProps {
  type: 'checkbox' | any
  onChange?: any
  title?: string
  checked?: boolean
}

// withExpanding

export type Expanded = Record<RowId, boolean>

export interface ToggleAllRowsExpandedProps {
  onClick?: any
  title?: string
}

export interface ToggleExpandedProps {
  onClick?: any
  title?: string
}

// withSorting

export interface SortObj {
  id: ColumnId
  desc?: boolean
}

export type SortType =
  | 'basic'
  | 'alphanumeric'
  | 'text'
  | 'datetime'
  | 'basic'
  | string
  | SortFn

export type SortFn = (
  rowA: Row,
  rowB: Row,
  columnId: ColumnId,
  desc: boolean
) => number

export interface ToggleSortingProps {
  onClick?: any
  title?: string
}
