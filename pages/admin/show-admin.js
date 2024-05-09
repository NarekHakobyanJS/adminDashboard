import React, {useEffect} from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import AdminEdit from "../../components/adminEdit/adminEdit";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import { token } from "../../variables/token";

import avatar from "assets/img/upload.png";

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
const styles_2 = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF",
      },
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
    toggleStyle: {
      marginLeft: "-25px",
    },
    tableHeadColor: {
      color: "grey",
      fontWeight: "bold",
    },
   
  };

function ShowAdmin(){
    const useStyles = makeStyles(styles);
    const useStyles_2 = makeStyles(styles_2);
    const classes = useStyles();
    const classes_2 = useStyles_2();
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
      axios.get("https://api.bilaton.pro/api/user", {headers: {"Authorization": `Bearer ${token}`}})
        .then((request) => setUsers(request.data.data))
        .catch((error) => console.log(error))
    }, [])

    const changeStatus = (id, myStatus, index) => {
      axios.post(`https://api.bilaton.pro/api/user/status/${id}`, {status: myStatus === 1 ? 0 : 1, _method: "PATCH"}, {
        headers: {"Authorization": `Bearer ${token}`}
      })
      .then((request) => {
        const newStatus = request.data.data
        const newArray = [...users]
        newArray[index] = newStatus
        setUsers(newArray)
      })
      .catch((error) => console.log(error))
    }
   
    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes_2.cardTitleWhite}>Show Admin</h4>
            </CardHeader>
            {/* <AdminEdit /> */}
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeaderColor}>
                      <TableRow className={classes.tableHeadRow}>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell + " " + classes_2.tableHeadColor}>
                          Image
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          User Name
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Email
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Cteated Date
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Status
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Update
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                        {
                          users.map((item, index) => (
                            <TableRow key={index} className={classes.tableBodyRow}>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                {
                                  item.images !== null ? (     
                                    item.images.map((img_url) => (
                                      <img key={img_url.id} src={img_url.imagePath} alt="user_photo" style={{width: "80px", height: "80px", borderRadius: "100%"}} />
                                    ))                            
                                  ) : (
                                    <img src={avatar} alt="user_photo" style={{width: "80px", height: "80px", borderRadius: "100%"}}/>
                                  )
                                }
                                
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                {item.full_name}
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                {item.email}
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                {item.createdAt}
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                {
                                  item.status === 1 ?
                                    <Button color="success" size="sm" onClick={() => changeStatus(item.id, item.status, index)}>Active</Button>
                                  :
                                    <Button sx={{background: "#B8B8B8"}} size="sm" onClick={() => changeStatus(item.id, item.status, index)}>Inactive</Button>
                                }
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "16%"}}>
                                  <IconButton><Icon fontSize="small">edit</Icon></IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        }
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
}

ShowAdmin.layout = Admin;

export default ShowAdmin;
