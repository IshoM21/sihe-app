import MUIDataTable from "mui-datatables";
import React from "react";

export const TableJson = ({ data, columnas, options={}, title = '' }) => {
    

    return (
        <MUIDataTable
        title={title}
        data={data}
        columns={columnas}
        options={options}

    />
    )
}
