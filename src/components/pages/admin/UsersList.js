import React, { useEffect } from "react";
import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const UsersList = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Username", field: "username" },
      { title: "Fullname", field: "fullname" },
      { title: "Email", field: "email", type: "email" },
      {
        title: "Role",
        field: "role",
      },
      {
        title: "Created Date",
        field: "createddate",
      },
      {
        title: "Modified Date",
        field: "modifieddate",
      },
    ],
    data: [
      {
        username: "thanh_teacher",
        fullname: "Nguyen le Ngocj thanh ",
        email: "thanh@gmail.com",
        role: "Teacher",
        createdDate: moment("2020-05-29T14:49:05.661Z").format("MMM DD h:mm A"),
      },
    ],
  });

  useEffect(() => {
    const mockup = {
      username: "thanh_teacher",
      fullname: "Nguyen le Ngocj thanh ",
      email: "thanh@gmail.com",
      role: "Teacher",
      createdDate: moment("2020-05-29T14:49:05.661Z").format("MMM DD h:mm A"),
    };
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        ...mockup,
        id: i,
      });
    }

    setState({
      ...state,
      data,
    });
  }, []);

  return (
    <div style={{ maxWidth: `100%`, overflowY: "auto" }}>
      <MaterialTable
        icons={tableIcons}
        title="List Of Users"
        columns={state.columns}
        data={state.data}
        options={{
          pageSize: 10,
          headerStyle: {
            fontWeight: "bold",
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
};

export default UsersList;
