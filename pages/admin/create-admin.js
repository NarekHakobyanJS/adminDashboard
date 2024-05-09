import * as React from "react";
import axios from "axios";
import { useRouter } from 'next/router'
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { makeStyles } from "@material-ui/core/styles";

import StepOneData from "../../components/ProgressingStepper/StepOneData";
import StepTwoData from "../../components/ProgressingStepper/StepTwoData";
import StepThreeData from "../../components/ProgressingStepper/StepThreeData";
import { token } from "../../variables/token";

const styles = {
  grCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "64px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  stepWhite: {
    background: "transparent",
    padding: "1px",
    borderRadius: "10px",
  },
  root: {
    "& .MuiStepIcon-active": { color: "white" },
    "& .MuiStepIcon-completed": { color: "white" },
    "& .Mui-disabled .MuiStepIcon-root": { color: "white" }
  },
  bgCont: {
    "& .MuiSvgIcon-root": { fontSize: "32px" }
  },
  cardContent: {
    background: "red",
  },
};

const steps = ["USER INFO", "ROLE ADD", "SELECT"];

function CreateAdmin() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [userData, setUserData] = React.useState({
    full_name: "User 8",
    email: "user8@gmail.com",
    password: "User113355&&",
    phone: "+37498124578",
    password_confirmation: "User113355&&",
    images: [],
    permission_ids: [],
    role_ids: []
  })
  const [isEmptyValue, setIsEmptyValue] = React.useState("")
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (userData.full_name === "" || userData.password === "" || userData.email === "" || userData.password_confirmation === "") {
      setActiveStep(0)
      setIsEmptyValue("* Tere are some fields that are not filled in")
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
    if(activeStep === steps.length - 1){
      router.push("/admin/show-admin")
    }

    let data = new FormData()
    Object.keys(userData).forEach((key) => {
      if (key === 'images') {
        if (!userData[key][0]) return false;
        // userData[key].forEach((item) => {
        //   console.log(userData[key], item)
        // })
        data.append(`images[0][image]`, userData[key][0]['image'][0]);
        data.append(`images[0][scope]`, userData[key][0]['scope']);
        return true;
      }

      if (Array.isArray(userData[key])) {
        userData[key].forEach((item) => {
          data.append(`${key}[]`, item);
        })
        return true;
      }

      data.set(key, userData[key]);
      return true;
    });
    if(activeStep === steps.length - 1){
      if(userData.full_name !== "" && userData.password !== "" && userData.email !== "" && userData.password_confirmation !== ""){
        await axios.post("https://api.bilaton.pro/api/user", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        })
          .then(function (response) {
              if (response.status !== 201) return false;
  
              console.log(response);
          })
          .catch(function (error) {
              throw new Error(error);
          });
      } else {
        setActiveStep(0)
        setIsEmptyValue("* Tere are some fields that are not filled in")
      }
    }

  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box className={classes.grCont}>
      <GridItem xs={12} sm={12} md={12} style = {{ padding: "100px 0" }}>
        <Card>
          <CardHeader color="info">
            <Box sx={{ width: "100%" }}>
              <Stepper
                className={classes.root}
                style ={{ background: "transparent", padding: "1px" }}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </CardHeader>
          <CardBody>
            {activeStep === steps.length ? (
              <Box>
                <h4 sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </h4>
              </Box>
            ) : (
              <Box style={{ padding: "30px 0" }}>
                {activeStep === 0 ? (
                  <StepOneData setData={setUserData} data={userData} setIsEmptyValue = {setIsEmptyValue} isEmptyValue = {isEmptyValue}/>
                ) : activeStep === 1 ? (
                  <StepTwoData setData={setUserData} data={userData}/>
                ) : (
                  <StepThreeData setData={setUserData} data={userData}/>
                )}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 8 }}>
                  <Button
                    // color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                    <Button color="info" onClick={handleNext} disabled={activeStep === 0 && isEmptyValue !== ""}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Box>
              </Box>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </Box>
  );
}


CreateAdmin.layout = Admin;

export default CreateAdmin;
