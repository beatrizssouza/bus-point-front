import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./point.css";
import CreatePoint from "./createPoint/CreatePoint";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";

import { getAllListPoint, deletePoint } from "../../../../services/http-common";
import { DataPoint } from "../../../../@types/DataPoint";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Point() {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    listPoints();
  }, []);

  function listPoints() {
    const response = getAllListPoint();
    response.then((res) => setResponseData(res));
  }

  function deletePointItem(id: number) {
    const response = deletePoint(id);
    window.alert(response);
  }

  const mapStyles: React.CSSProperties = {
    height: "400px",
    width: "100%",
  };

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
        <div className="inputCreatePoint">
          <CreatePoint />
        </div>
      </div>
      <div className="body">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {responseData.map((item: DataPoint, index) => {
            if (item.id) {
              var idItem: number = item.id;
            }
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <div
                      style={{
                        margin: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontFamily: "Quicksand" }}
                      >
                        {item.namePoint}
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
