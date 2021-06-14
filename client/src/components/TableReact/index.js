import React, { useState } from 'react'
import cx from 'classnames'
//import Skeleton from '@material-ui/lab/Skeleton'
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
import SVG from 'react-inlinesvg'

//import Select from '../Select'

import styles from './assets/TableReact.module.scss'
import  next from '../../images/next.svg'
import doubleLeft from '../../images/doubleLeft.svg'
import doubleRight from '../../images/doubleRight .svg'
//import menuIcon from '../../images/svg/menu.svg'
// A great library for fuzzy filtering/sorting items
//import matchSorter from 'match-sorter'


const DefaultColumnFilter = ({
         column: { filterValue, preFilteredRows, setFilter }
     }) => {
    const count = preFilteredRows.length;
    
    return (
        
        <input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
        
        
    );
};


const GlobalFilter = ({ total, preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
    const count = total || preGlobalFilteredRows.length;
    console.log("filterValue= "+count);
    return (
        <span>
            
      {'Search'}:{' '}
            <input
                className={styles.search}
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} ${'records'}...`}
                style={{ fontSize: '1.1rem', border: '0' }}
            />
            
            
    </span>
  
    )
};



// Our table component
const Table = ({ columns, data }) => {

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize },
            visibleColumns,
            preGlobalFilteredRows,
            setGlobalFilter
        } = useTable(
            {
                columns,
                data,
                filterTypes,
                defaultColumn,
                initialState: { pageIndex: 0 }
            },
            useFilters, // useFilters!
            useGlobalFilter,  //useGlobalFilter!
            usePagination
        );




    return (
        <>
            <table className={styles.table} {...getTableProps()}>
                <thead className={styles.header}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}

                            </th>

                        ))}
                    </tr>
                ))}

                <tr>
                    <th
                        colSpan={visibleColumns.length}
                        style={{
                            textAlign: "left"
                        }}
                    >
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            //globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr className={styles.row} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                
                                return (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    
                                );
                            })}
                            
                        </tr>
                    );
                 
                })}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button className={styles.previous_next} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <SVG src={doubleLeft} />
                </button>{" "}
                <button className={styles.previous_next} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <SVG src={next} style={{ transform: 'rotate(180deg)' }} />
                </button>{" "}

                <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                  </span>{" "}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>

                <button className={styles.previous_next} onClick={() => nextPage()} disabled={!canNextPage}>
                    <SVG src={next} />
                </button>{" "}
                <button className={styles.previous_next} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <SVG src={doubleRight} />
                </button>{" "}

            </div>

        </>
    )
};

export default Table