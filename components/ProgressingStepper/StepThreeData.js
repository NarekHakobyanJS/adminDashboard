import * as React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
// import { dataPermissions } from "./data";
import { token } from "../../variables/token";
import Slider from "react-slick";
import axios from "axios";

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


function StepThreeData({ data, setData }) {
    const useStyles = makeStyles(styles);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    const classes = useStyles();

    // Get All Permitions
    const [dataPermissions, setDataPermissions] = React.useState([])
    React.useEffect(() => {
        axios.get("https://api.bilaton.pro/api/permissions", {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then((request) => setDataPermissions(request.data.data))
        .catch((error) => console.log(error))
    }, [])

    // Filter and remove Same Name Permitions
    const res = dataPermissions.filter((value, index, self) => {
        return (
          self.findIndex((v) => v.title === value.title) === index
        );
    });

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
            "permission_ids": checked
        })
    }, [checked]);

    return (
        <GridContainer>
            <Slider {...settings} style={{width: "100%"}}>
                {res.map((item, index) => (
                    <GridItem key={index} xs={12} sm={12} md={4} className={classes.cardContent}>
                        <Card style={{width: "360px"}}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CardHeader color="rose">
                                        <h4 className={classes.cardTitleWhite}>{item.title}</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer >
                                            {dataPermissions.map((elem, findex) => (
                                                <GridItem key={elem.id} xs={12} sm={12} md={6}>
                                                    {elem.title === item.title 
                                                    ? 
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        className={classes.bgCont}
                                                                        color="default"
                                                                        name="permission_ids"
                                                                        checked={checked.includes(elem.id)}
                                                                        onChange={(e) => handleChecked(e, elem.id)}
                                                                    />
                                                                }
                                                                label={elem.action} 
                                                            />
                                                        </FormGroup>
                                                    : 
                                                        <></>
                                                    }
                                                </GridItem>
                                            ))}
                                            
                                        </GridContainer>                                   
                                    </CardBody>
                                </GridItem>
                            </GridContainer>
                        </Card>
                    </GridItem>
                ))}
            </Slider>
        </GridContainer>
    )
}

export default StepThreeData;