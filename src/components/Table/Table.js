import React from 'react';
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import './Table.css'; 

const Table = ({ metaData }) => {
  const [data, setData] = React.useState(metaData);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterData = (e) => {
    let value = e.target.value;
    let filter = {
      logic: "or",
      filters: [
        {
          field: "imdbID",
          operator: "contains",
          value: value,
        },
        {
          field: "Title",
          operator: "contains",
          value: value,
        },
        {
          field: "Year",
          operator: "contains",
          value: value,
        },
        {
          field: "Type",
          operator: "contains",
          value: value,
        },
      ],
    };
    setData(filterBy(metaData, filter));
  };

  return (
    <div className="table-container"> 
      <Grid
        className="k-grid custom-table"
        data={data}
      >
        <GridToolbar>
          <Input className='input' onChange={filterData} />
        </GridToolbar>
        <Column field="imdbID" title="ID" className="k-grid-th" width={isMobile ? "60px" : "150px"}  />
        <Column field="Title" title="Title" className="k-grid-th" width={isMobile ? "200px" : "500px"} />
        <Column field="Year" title="Year" className="k-grid-th"  width={isMobile ? "30px" : "150px"} />
        <Column field="Type" title="Type" className="k-grid-th"  width={isMobile ? "45px" : "150px"}  />
      </Grid>
    </div>
  );
}

export default Table;
