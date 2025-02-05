import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

const BinanceTable = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [paginationPageSize, setPaginationPageSize] = useState(10);

    useEffect(() => {
        const url = "https://api.binance.com/api/v3/ticker/24hr";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const columns = Object.keys(data[0]).map((key) => ({
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    field: key,
                }));
                setColumnDefs(columns);
                setRowData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const paginationPageSizeChanged = (event) => {
        setPaginationPageSize(event.target.value);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
            <h1>Binance Ticker Data</h1>
            <div>
                <label htmlFor="paginationPageSize">Page Size: </label>
                <select id="paginationPageSize" onChange={paginationPageSizeChanged} value={paginationPageSize}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                pagination={true}
                paginationPageSize={paginationPageSize}
                domLayout="autoHeight"
                modules={[ClientSideRowModelModule]} 
            />
        </div>
    );
};

export default BinanceTable;