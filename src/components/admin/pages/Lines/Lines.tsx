import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { getAllListLines } from "../../../../services/http-common";
import { DataLines } from "../../../../@types/DataLines";
import CreateLines from "./createLines/createLines";
import "./lines.css";

export default function Lines() {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    listAllLines();
  }, []);

  function listAllLines() {
    getAllListLines().then((res) => setResponseData(res));
  }

  return (
    <div>
      <div className="cabecalho">
        <div className="iconBack">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="inputCreateLines">
          <CreateLines />
        </div>
      </div>
      <div className="body">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {responseData.map((item: DataLines, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <div
                      style={{
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontFamily: "Quicksand" }}
                      >
                        {item.nameLine}
                      </Typography>
                      <div
                        style={{
                          margin: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography
                          gutterBottom
                          component="div"
                          style={{
                            fontFamily: "Quicksand",
                          }}
                        >
                          {item.pointIdList.map((res) => {
                            return <li> {res} </li>;
                          })}
                        </Typography>
                        <IconButton
                          size="large"
                          edge="end"
                          color="inherit"
                          sx={{ mr: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
