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

// @material-ui/core components
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useRouter } from 'next/router'

import { token } from "../../variables/token";

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
      marginLeft: "-28px",
    },
    tableHeadColor: {
      color: "grey",
      fontWeight: "bold",
    },
    permGrid: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
    },
    permGridScroll: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      overflowY: "scroll",
      height: "110px", 
    },
    permContent: {
      background: "#1A2B47",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      borderRadius: "5px",
      padding: "7px 12px",
      textAlighn: "center",
      margin: "10px 10px",
    }
  };

function ShowRoles(){
    const useStyles = makeStyles(styles);
    const useStyles_2 = makeStyles(styles_2);
    const classes = useStyles();
    const classes_2 = useStyles_2();
    const router = useRouter();

    const [isOpenActions, setIsOpenActions] = React.useState(false);
    const handleSetShowActions = () =>  setIsOpenActions(!isOpenActions)
    const [showEdit, setShowEdit] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    React.useEffect(() => {
      axios.get("https://api.bilaton.pro/api/roles", {headers: {"Authorization": `Bearer ${token}`}})
        .then((request) => setRoles(request.data.data))
        .catch((error) => console.log(error))
    }, [])

     // // Mui Accordion
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Delete Product With id
    const removeRole = (id) => {
        axios.delete(`https://api.bilaton.pro/api/roles/delete/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
        .then((request) => {
            setRoles(roles.filter((item) => item.id !== id));
            setIsOpenActions(false);
        })
        .catch((error) => console.log("Sorry we have an error", "error"));
    };

    // Navigate to Edit page
    const editRoleData = (item) => {
      console.log(item)
      router.push({
        pathname: '/admin/edit-role',
        query: { id: item.id, name: item.name, permissions: item.permissions },
      })
    }

    return(
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes_2.cardTitleWhite}>Show Roles</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeaderColor}>
                      <TableRow className={classes.tableHeadRow}>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell + " " + classes_2.tableHeadColor}>
                          Name
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Permissions
                        </TableCell>
                        <TableCell className={classes.tableCell + " " + classes.tableHeadCell  + " " + classes_2.tableHeadColor}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                        {
                          roles.map((item, index) => (
                            <TableRow key={index} className={classes.tableBodyRow}>
                              <TableCell className={classes.tableCell} style={{width: "10%"}}>
                                {item.name}
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "80%"}}>
                                <div className={item.permissions.length > 11 && item.id !== 1 ? classes_2.permGridScroll : classes_2.permGrid}>
                                  {item.id === 1 
                                      ? (
                                        <span className={classes_2.permContent} style={{overflowY: "hidden", height: "20px"}}>All Permissions</span>
                                        ) : (
                                      item.permissions.map((permission, indexPerm) => (
                                        <span key={indexPerm} className={classes_2.permContent}>{permission.name}</span>
                                      ))
                                    )
                                  }
                                </div>
                              </TableCell>
                              <TableCell className={classes.tableCell} style={{width: "10%"}}>
                                {
                                  item.id !== 1 ? (
                                    <Accordion
                                        style={{ border: 0, boxShadow: "0 0 0 0 white", borderRadius: 0 }}
                                        expanded={expanded === item.id}
                                        onChange={handleChange(item.id)}
                                    >
                                        <AccordionSummary
                                            aria-controls={item.id}
                                            id={item.id}
                                            style={{ padding: 0 }}
                                        >
                                            <IconButton  onClick={handleSetShowActions}><Icon fontSize="small">more_vert</Icon></IconButton>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className={classes_2.toggleStyle} >
                                                <IconButton onClick={() => editRoleData(item)}><Icon fontSize="small">edit</Icon></IconButton>
                                                <IconButton onClick={() => removeRole(item.id)}><Icon fontSize="small">delete</Icon></IconButton>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                  ) : (
                                    <></>
                                  )
                                }
                                
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

ShowRoles.layout = Admin;

export default ShowRoles;
