import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import CardItem from "../../layout/CardItem";
import PageLoader from "../../custom/PageLoader";
import { getCourses } from "../../../store/actions/course";
import { clearErrors } from "../../../store/actions/common";

const Courses = ({
  match,
  all_courses,
  clearErrors,
  getCourses,
  auth: { user },
}) => {
  const [loading, setLoading] = useState(true);

  // INITIALIZE MODULE LIST
  useEffect(() => {
    getCourses(setLoading);
    return () => {
      console.log(all_courses);
      clearErrors();
    };
  }, []);

  // const test = Array.from(Array(10).keys());
  return (
    <PageLoader loading={loading}>
      <h1>{console.log(match)}</h1>
      <Grid container spacing={3}>
        {all_courses &&
          Object.keys(all_courses).map((key) => (
            <Grid item xs={4} md={3} spacing={3}>
              <CardItem course={all_courses[key].course} />
            </Grid>
          ))}
      </Grid>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  all_courses: state.course.all_courses,
});
export default connect(mapStateToProps, { clearErrors, getCourses })(Courses);
