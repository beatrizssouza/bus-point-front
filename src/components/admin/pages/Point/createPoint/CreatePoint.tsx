import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { DataPoint } from "../../../../../@types/DataPoint";
import { useNavigate } from "react-router-dom";
import { postCreatePoint } from "../../../../../services/http-common";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreatePoint() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [namePoint, setNamePoint] = useState<string>("");

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLng | null>(null);
  const [positionCenter, setPositionCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >({ lat: -24.044175, lng: -52.377638 });
  const navigate = useNavigate();

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat: number | any = e.latLng?.lat();
    const lng: number | any = e.latLng?.lng();

    const position: google.maps.LatLng | any = { lat, lng };
    setMarkerPosition(position);
    setPositionCenter(position);
    console.log(position);
  };

  const mapStyles: React.CSSProperties = {
    height: "400px",
    width: "100%",
  };

  function sendPoint() {
    const point: DataPoint = {
      namePoint: namePoint,
      lat: markerPosition?.lat.toString(),
      lng: markerPosition?.lng.toString(),
    };

    postCreatePoint(point).then((res) => {
      handleClose();
      setNamePoint("");
      setMarkerPosition(null);
      setPositionCenter({ lat: -24.044175, lng: -52.377638 });
    });
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAatpcHpS4ESRO98ikcpCuZbYFqENEhqXo",
    libraries: ["geometry", "drawing"],
  });

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ backgroundColor: "#141218", fontFamily: "Quicksand" }}
        onClick={handleOpen}
      >
        Criação do Ponto
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h2"
            component="h2"
            style={{ fontFamily: "Quicksand"}}
          >
            Criação de Ponto
          </Typography>
          <TextField
            style={{ width: 600, marginTop: "20px" }}
            color="info"
            id="standard-basic"
            label="Nome do ponto"
            variant="standard"
            value={namePoint}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNamePoint(event.target.value);
            }}
          />
          <div className="mapsPoint" style={{ marginTop: "20px" }}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={positionCenter}
                zoom={14}
                onClick={handleMapClick}
                onLoad={(map) => setMap(map)}
              >
                {markerPosition && <Marker position={markerPosition} />}
              </GoogleMap>
            )}
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#141218" }}
              onClick={() => sendPoint()}
            >
              Criar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
