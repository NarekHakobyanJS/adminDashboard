import * as React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";

import avatar from "assets/img/upload.png";

const styles = {
    grCont: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "64px",
    }
};

function StepOneData({ data, setData, isEmptyValue, setIsEmptyValue }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [avatarImg, setAvatarImg] = React.useState(avatar)
    // const [isEdit, setIsEdit] = React.useState(false)
    const [validate, setValidate] = React.useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function isValidPassword(password) {
        const passReg = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$");
        return passReg.test(password);
    }
    const changeData = (e) => {
        setValidate("")
        const target = e.target
        
        if(target.name === "email" && !isValidEmail(target.value)){
            setValidate({...validate, [target.name]: "Email is invalid"}) 
        }
        if(target.name === "password" && !isValidPassword(target.value)){
            setValidate({...validate, [target.name]: "Password is not strong | password must contain at least 8 characters, at least 1 number and both lower and uppercase letters and special characters"}) 
            // if(data.password < 8){
            //     setValidate({...validate, [target.name]: "The Password field must be at least 8 characters"}) 
            // }
        } 
        if(target.name === "password_confirmation" && data.password !== data.password_confirmation){
            setValidate({...validate, [target.name]: "The Confirm Password confirmation does not match"}) 
        }
        if(target.value === ""){
            setValidate({...validate, [target.name]: "* This field is required"}) 
        } 
        
        if(target.type === "file"){
            setData({
                ...data,
                images: [
                    {
                        image: target.files,
                        scope: 'middle',
                    }
                ]
            })
            if(e.target.files && e.target.files[0]){
                setAvatarImg(URL.createObjectURL(e.target.files[0]))
            }
        } else {
            setData({
                ...data,
                [target.name]: target.value
            })
            setIsEmptyValue("")
        }
        
    }

    return (
        <form>
            <Box className={classes.grCont}>
                <GridItem xs={12} sm={12} md={2}>
                    <InputLabel htmlFor="uploadImage">
                        <Input
                            id="uploadImage"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            inputProps={{ multiple: true }} 
                            name="images"
                            onChange={(e) => changeData(e)}
                        />
                        <CardAvatar profile style={{boxShadow: "0 0 0 0 white"}}>
                            <img src={avatarImg} alt="user photo" style={{height: "130px"}}/>
                        </CardAvatar>
                    </InputLabel>
                </GridItem>
            </Box>
            {/* <h3 style={{color: "red", fontWeight: "bold"}}>{isEmptyValue}</h3> */}
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Full Name"
                        id="full-name"
                        type="text"                        
                        formControlProps={{
                            fullWidth: true,
                        }}
                        name="full_name"
                        value={data.full_name}
                        onChange={(e) => changeData(e)}
                    />
                    <span style={{color: "red"}}>{validate.full_name}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Email"
                        id="email"
                        type="email"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        name="email"
                        value={data.email}
                        onChange={(e) => changeData(e)}
                    />
                    <span style={{color: "red"}}>{validate.email}</span>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Password"
                        id="password"
                        type="password"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => changeData(e)}
                    />
                    <span style={{color: "red"}}>{validate.password}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Re-password"
                        id="re-password"
                        type="password"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => changeData(e)}
                    />
                    <span style={{color: "red"}}>{validate.password_confirmation}</span>
                </GridItem>
            </GridContainer>
        </form>
    )
}
export default StepOneData;