import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

const SearchTrains = () => {
  const [trains, setTrains] = useState([]);
  const getTrains = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setTrains(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Native name",
      selector: (row) => row.nativeName,
    },
    {
      name: "capital",
      selector: (row) => row.capital,
    },
    {
      name:"Action",
      cell: (row) => (<button className="btn btn-primary" onClick={() => alert(row.alpha2Code)}>BOOK</button>),
    }
  ];
  useEffect(() => {
    getTrains();
  }, []);

  return (
    <DataTable
      // title="List of Trains"
      columns={columns}
      data={trains}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="550px"
      highlightOnHover
    />
  );
};

export default SearchTrains;
