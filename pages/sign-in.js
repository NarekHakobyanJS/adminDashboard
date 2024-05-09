import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import bgImage from "assets/img/bg7.jpg";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

function SignIn(){

    return(
        <div 
            style={{
                minHeight:"100vh",
                // position:"absolute",
                // width:"100%",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div 
                style={{
                    height:"100vh"
                }}
            >
               <GridContainer
                    style={{
                        width: "100%", height:"100%", justifyContent:"center", alignItems:"center"
                    }}
               >
                    <GridItem>
                        <Card xs={11} sm={9} md={5} lg={4} xl={3}>
                            <div
                                style={{
                                    variant:"gradient",
                                    backgroundColor:"#4284f5",
                                    borderRadius:"4px",
                                    coloredShadow:"info",
                                    margin: "0 20px",
                                    marginTop: "-30px",
                                    padding: "20px",
                                    marginBottom: "10px",
                                    textAlign:"center"
                                }}
                            >
                                <h4 style={{fontWeight:"medium", color:"#FFFFFF", marginTop: "10px"}}>Sign in</h4>
                            </div>
                            <div pt={4} pb={3} px={3}>
                                <form>
                                    <CustomInput
                                    labelText="Email"
                                    id="email"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                />
                                <CustomInput
                                    labelText="Password"
                                    id="password"
                                    formControlProps={{
                                    fullWidth: true,
                                    }}
                                />
                                <div style={{margin: "20px 0", display: "flex", justifyContent:"center"}}>
                                    <Button backgroundColor="#4284f5">
                                        &nbsp;&nbsp;Sign in
                                    </Button>
                                </div>
                                </form>
                            </div>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

// SignIn.layout = SignIn;

export default SignIn;