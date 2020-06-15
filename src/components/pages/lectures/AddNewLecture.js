import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';

import {
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

import { addNewCourse } from '../../../store/actions/course';
import { clearErrors } from '../../../store/actions/common';
// COMPONENTS
import Button from '@material-ui/core/Button';
import TextFieldInputWithHeader from '../../custom/TextFieldInputWithheader';

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { GET_ERRORS, BASE_URL } from '../../../store/actions/types';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const AddLectureModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  addNewCourse,
}) => {
  const dispatch = useDispatch();
  // NEW ROLE NAME STATE
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState({
    name: '',
    file: '',
  });

  const { name, description } = formData;

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({});
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const error = {};

    Object.keys(formData).map((key) => {
      if (formData[key].trim() === '') {
        error[key] = 'This field is required';
      }
    });

    // console.log(error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === '{}') {
      addNewCourse(name, description, image.file, isActive);
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeActive = (event) => {
    if (event.target.value === 'true') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleCapture = ({ target }) => {
    console.log('target-----', target);
    const fileReader = new FileReader();
    // const name = target.accept.includes("image") ? "images" : "videos";
    const fileName = target.files[0].name;
    // TODO
    // ONLY UPLOAD TYPE image/*
    fileReader.readAsDataURL(target.files[0]);
    console.log(target.files[0]);
    fileReader.onload = (e) => {
      console.log(e.target);
      setImage({
        name: fileName,
        file: e.target.result,
      });
    };
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <ModalHeader toggle={() => closeModal()}>Add New Lecture</ModalHeader>

      {/** MODAL BODY */}
      <Form onSubmit={(e) => onSubmit(e)}>
        <ModalBody>
          <Row>
            <Col xs="12">
              <TextFieldInputWithHeader
                id="outlined-multiline-flexible"
                name="name"
                label="New course name"
                fullWidth
                value={name}
                onChange={onChange}
                error={errors.name}
              />
            </Col>
            <Col xs="12" className="mt-4">
              <TextField
                id="outlined-multiline-static"
                label="Description"
                name="description"
                fullWidth
                value={description}
                multiline
                rows={4}
                onChange={onChange}
                variant="outlined"
                error={errors.description}
                defaultValue="New course description"
              />
            </Col>
          </Row>
          <Row className="py-2 px-3">
            <FormControl component="fieldset">
              <FormLabel component="legend">Puclic your new course? </FormLabel>
              <RadioGroup
                aria-label="Public"
                name="isActive"
                value={isActive}
                onChange={(e) => handleChangeActive(e)}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Public"
                />
              </RadioGroup>
            </FormControl>
          </Row>
          <Row className="py-1">
            <Col xs="4">
              <Button variant="contained" component="label">
                Upload File
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleCapture}
                  style={{ display: 'none' }}
                />
              </Button>
            </Col>
            <Col xs="8" className="text-break">
              <h6>{image.name}</h6>
            </Col>
            {/* <MediaCapture /> */}
          </Row>
        </ModalBody>

        {/** MODAL FOOTER */}
        <ModalFooter>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
          <Button
            variant="contained"
            className="ml-2"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { addNewCourse, clearErrors })(
  AddLectureModal
);