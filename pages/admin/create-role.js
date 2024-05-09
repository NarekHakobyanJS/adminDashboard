import * as React from "react";
import axios from "axios";
import { useRouter } from 'next/router'

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

// layout for this page
import Admin from "layouts/Admin.js";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import { token } from "../../variables/token";
import { dataPermissions } from "../../components/ProgressingStepper/data";

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

function CreateRole(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const router = useRouter();
    const [validate, setValidate] = React.useState("")
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    // Get All Permitions
     const [dataPermissions1, setDataPermissions] = React.useState([])
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

    /// create Role
    const [addRole, setAddRole] = React.useState({
        name: "",
        permission_ids: []
    })

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

    const changeData = (e) => {
        setValidate("")
        setAddRole({
            ...addRole, 
            [e.target.name]: e.target.value 
        })
    }

    React.useEffect(() => {
        setAddRole({
            ...addRole,
            "permission_ids": checked
        })
    }, [checked]);

    const createRole = () => {
        if (addRole.name !== "" && addRole.permission_ids.length !== 0) {
            axios.post("https://api.bilaton.pro/api/roles", addRole, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            .then((request) => router.push("/admin/show-roles"))
            .catch((error) => console.log(error))
        } else {
            setValidate("* This field is required") 
        }
        
    }

    return( 
        <GridContainer>
            <GridItem xs={12} sm={12} md={12} className={classes.cardContent}>
                <Card>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Create Role</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Role Name"
                                            id="role-name"
                                            type="text"                        
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="name"
                                            value={addRole.name}
                                            onChange={(e) => changeData(e)}
                                        />
                                    </GridItem>
                                    <Danger>{validate}</Danger>
                                </GridContainer>
                                <GridContainer style={{marginTop: "130px"}}>
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
                                <Box  style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                                    <Button color="info" size="sm" onClick={createRole}>Add Role</Button>
                                </Box>
                            </CardBody>
                        </GridItem>
                    </GridContainer>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

CreateRole.layout = Admin;

export default CreateRole;