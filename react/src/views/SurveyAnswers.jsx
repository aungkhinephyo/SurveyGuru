import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import Datatable from "react-data-table-component";

export default function SurveyAnswers() {
  const { slug } = useParams();
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        maxWidth: "100px",
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  useEffect(() => {
    axiosClient
      .get(`/surveys/${slug}/answers`)
      .then(({ data }) => {
        setTableData(data.data);

        const columns = data.columns;
        const rows = data.rows;
        let newTableHeaders = [];

        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          const rowData = rows[i];
          newTableHeaders.push({
            name: column,
            selector: (row) => row[rowData],
            sortable: true,
          });
        }

        setTableHeaders([...newTableHeaders]);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        return error;
      });
  }, []);

  return (
    <div className="px-8 mt-8">
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      <h3 className="text-2xl font-semibold mb-4">Survey Answers</h3>
      <Datatable
        columns={tableHeaders}
        data={tableData}
        customStyles={customStyles}
        fixedHeader
        pagination
      ></Datatable>
    </div>
  );
}
