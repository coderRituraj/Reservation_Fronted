import React , { useState }from "react";
import "./style.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Select from 'react-select';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const About = () => {
  const navigate = useNavigate();
  const searchTrain = () => {
    toast.success("search successfull")
    navigate("/searchtrain");
  };
  const data = [
    {
      value: 1,
      label: "AC 1 Tier",
    },
    {
      value: 2,
      label: "AC 2 Tier",
    },
    {
      value: 3,
      label: "AC 3 Tier",
    },
    {
      value: 4,
      label: "Sleeper",
    },
    {
      value: 5,
      label: "General",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Train Search</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center">
              <MDBCol lg="8">
                <MDBCard
                  className="my-8 rounded-3"
                  style={{ maxHeight: "900px" }}
                >
                  <MDBCardImage
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/CN_8015%2C_5690_and_5517_Hinton_-_Jasper.jpg"
                    className="w-100 rounded-top"
                    alt="Sample photo"
                    style={{ maxHeight: "200px" }}
                  />

                  <MDBCardBody className="px-8">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Train Info
                    </h3>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="From"
                      id="form1"
                      type="text"
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="To"
                      id="form1"
                      type="text"
                    />

                    <MDBRow>
                      {/** if date needed then use this. */}
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="datepicker mb-4"
                          label="Select a date"
                          id="form2"
                          type="date"
                        />
                      </MDBCol>
                      {/** if dropdown needed then use this. */}

                      <MDBCol md="6" className="mb-4">
                        {/* <MDBSelect
              data={[
                { text: 'Gender', value: 1, disabled: true },
                { text: 'Female', value: 2 },
                { text: 'Male', value: 3 }
              ]}
              /> */}
                      </MDBCol>
                      {/** if class is to be needed in dropdown then use this. */}
                    </MDBRow>

                    {/* <MDBSelect
          className='mb-4'
          data={[
            { text: 'Class', value: AC1},
            { text: 'Class 1', value: AC2 },
            { text: 'Class 2', value: AC3},
            { text: 'Class 3', value: Sleeper}
          ]}
          /> */}

                    <MDBRow>
                      <MDBCol md="6">
                        <Select
                          placeholder="Class"
                          value={selectedOption} // set selected value
                          options={data} // set list of the data
                          onChange={handleChange} // assign onChange function
                        />

                        {selectedOption && (
                          <div style={{ marginTop: 20, lineHeight: "25px" }}>
                            <b>Selected Option</b>
                            <br />
                            <div style={{ marginTop: 10 }}>
                              <b>Label: </b> {selectedOption.label}
                            </div>
                            <div>
                              <b>Value: </b> {selectedOption.value}
                            </div>
                          </div>
                        )}
                        {/* <MDBInput
                          wrapperClass="mb-4"
                          label="Class"
                          id="form3"
                          type="text"
                        /> */}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={searchTrain} variant="primary">Search Train</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default About;
