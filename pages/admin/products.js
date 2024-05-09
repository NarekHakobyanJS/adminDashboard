import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Delete from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
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
};

function Products(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>Products</h4>
                </CardHeader>
                <CardBody>
                    <Table
                    tableHeaderColor="info"
                    tableHead={["Name", "Country", "City", "Salary", "Action"]}
                    tableData={[
                        ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", <Delete fontSize='small' color="#ccc"/>],
                        ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789", <Delete fontSize='small' color="#ccc"/>],
                        ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142", <Delete fontSize='small' color="#ccc"/>],
                        ["Philip Chaney", "Korea, South", "Overland Park", "$38,735", <Delete fontSize='small' color="#ccc"/>],
                        ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542", <Delete fontSize='small'color="#ccc"/>],
                        ["Mason Porter", "Chile", "Gloucester", "$78,615", <Delete fontSize='small' color="#ccc"/>],
                    ]}
                    />
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

Products.layout = Admin;

export default Products;