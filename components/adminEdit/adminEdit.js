import React from "react";

import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";

const styles = {
    grCont: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "64px",
    },
}
function AdminEdit() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [editData, setEditData] = React.useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        images: [{ image: "", scope: "" }],
        permission_ids: [],
        role_ids: []
    })

    const changeData = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: [e.target.value]
        })
    }

    return (
        <Box className={classes.grCont}>
            <h4>Edit User</h4>
            <GridItem xs={12} sm={12} md={6}>
                <InputLabel htmlFor="full_name">
                    <Input
                        id="full_name"
                        type="text"
                        color="info"
                        name="full_name"
                        value={editData.full_name}
                        onChange={(e) => changeData(e)}
                    />
                </InputLabel>
                <InputLabel htmlFor="email">
                    <Input
                        id="email"
                        type="text"
                        color="info"
                        name="email"
                        value={editData.email}
                        onChange={(e) => changeData(e)}
                    />
                </InputLabel>
                <InputLabel htmlFor="password">
                    <Input
                        id="password"
                        type="text"
                        color="info"
                        name="password"
                        value={editData.password}
                        onChange={(e) => changeData(e)}
                    />
                </InputLabel>
                <InputLabel htmlFor="password_confirmation">
                    <Input
                        id="password_confirmation"
                        type="text"
                        color="info"
                        name="password_confirmation"
                        value={editData.password_confirmation}
                        onChange={(e) => changeData(e)}
                    />
                </InputLabel>
            </GridItem>
            <Button>Edit</Button>
        </Box>
    )
}

export default AdminEdit;