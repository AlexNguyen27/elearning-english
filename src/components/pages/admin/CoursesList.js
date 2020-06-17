import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
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
import { getCourses, editCourse, deleteCourse } from "../../../store/actions/course";

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

const CoursesList = ({ getCourses, all_courses, editCourse, deleteCourse }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Public", field: "active" },
      {
        title: "Total Students Enrolled",
        field: "totalStudentEnroll",
        editable: "never",
      },
      { title: "Instructor", field: "fullname", editable: "never" },
      { title: "Lectures", field: "lectures", editable: "never" },
    ],
    data: [],
  });
  const coursesArray = Object.keys(all_courses).map(
    (courseId) => all_courses[courseId]
  );
  useEffect(() => {
    getCourses(setLoading);

    const formatData = [];

    coursesArray.forEach((item) => {
      if (item.course) {
        formatData.push({
          id: item.course.id,
          description: item.course.description,
          name: item.course.name,
          active: item.course.active,
          totalStudentEnroll: item.course.totalStudentEnroll,
          lectures: item.course.letures.length,
          fullname: item.teacher.fullname,
        });
      }
    });

    setState({
      ...state,
      data: formatData,
    });
  }, []);
  return (
    <div style={{ maxWidth: `100%`, overflowY: "auto" }}>
      <MaterialTable
        icons={tableIcons}
        title="List Of Courses"
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
                editCourse(
                  setLoading,
                  newData.id,
                  newData.name,
                  newData.description,
                  "same",
                  newData.active
                );

                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                deleteCourse(setLoading, oldData.id);
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

const mapStateToProps = (state) => ({
  all_courses: state.course.all_courses,
});
export default connect(mapStateToProps, { getCourses, editCourse, deleteCourse })(
  CoursesList
);
