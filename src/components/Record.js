import React from "react";
import {BootstrapTable, 
       TableHeaderColumn} from 'react-bootstrap-table';
  

const Record = ({ record }) => {
  return (

    
    <div className="record">
      <span className="recordName">{record.name}</span>
      <span className="recordCategory">{record.category}</span>
    </div>
  );
};


export default Record;