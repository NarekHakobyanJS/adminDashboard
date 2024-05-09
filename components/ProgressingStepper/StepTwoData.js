import * as React from "react";
import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
import { token } from "../../variables/token";

const styles = {
    grCont: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "64px",
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
    formLabel:{
        display: "flex",
        justifyContent: "flex-start",
        columnGap: "20px",
    },
};

function StepTwoData({ data, setData }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    // Get All Roles
    const [dataRole, setDataRole] = React.useState([]) 
    React.useEffect(() => {
        axios.get("https://api.bilaton.pro/api/roles", {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then((request) => setDataRole(request.data.data))
        .catch((error) => console.log(error))
    }, [])

    // Change checkbox array
    const [checked, setChecked] = React.useState([]);
    const handleChecked = (e, index) => {
        let prev = checked;
        let itemIndex = prev.indexOf(index);
        if (itemIndex !== -1) {
          prev.splice(itemIndex, 1);
        } else {
          prev.push(index);
        }
        setChecked([...prev]);
        console.log(index, "checked")
    };
    React.useEffect(() => {
        setData({
            ...data,
            "role_ids": checked
        })
    }, [checked]);

    return (
        <Box className={classes.grCont}>
            <GridContainer>
                {dataRole.map((item) => (
                    <GridItem key={item.id} xs={12} sm={12} md={3}>
                        <FormGroup style={{margin: "0 auto", width: "200px"}}>
                            <FormControlLabel
                                className={classes.formLabel}
                                control={
                                    <Checkbox
                                        className={classes.bgCont}
                                        color="default"
                                        name="role_ids"
                                        checked={checked.includes(item.id)}
                                        onChange={(e) => handleChecked(e, item.id)}
                                    />
                                } 
                                label={item.name}
                            />
                        </FormGroup>
                    </GridItem>
                ))}
            </GridContainer>
        </Box>
    )
}

export default StepTwoData;