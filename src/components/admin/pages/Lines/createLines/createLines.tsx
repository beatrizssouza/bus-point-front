import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getAllListPoint, postCreateLine } from "../../../../../services/http-common";
import { DataPoint } from "../../../../../@types/DataPoint";
import { DAYS, DataLines, LinesSchedules } from "../../../../../@types/DataLines";
import Horario from "../../../../../@types/horario";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const namesDays = [DAYS.DIA_UTEIS, DAYS.DOMINGOEFERIADO, DAYS.SABADO];

export default function CreateLines() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nameLines, setNameLines] = useState<string>("");
  const [idPoint, setIdPoint] = useState<string[]>([]);
  const [allListPoints, setAllListPoints] = useState([]);
  const [hoursLines, setHoursLines] = useState<string[]>([]);

  const navigate = useNavigate();
  const [arzNamesDays, setArzNamesDays] = useState<string[]>([]);

 
  function sendLines() {

    const linesSchedulesObj = [] as LinesSchedules[];
    linesSchedulesObj.push({
      days: arzNamesDays,
      hours: hoursLines
    });

    const line: DataLines = {
      nameLine: nameLines,
      linesSchedules: linesSchedulesObj,
      pointIdList: idPoint
    }

    console.log(line);

    postCreateLine(line).then((res) => {
      handleClose();
      setNameLines("");
      setIdPoint([]);
      setHoursLines([]);
      setArzNamesDays([]);
    });

  }

  const handleChange = (event: SelectChangeEvent<typeof idPoint>) => {
    const {
      target: { value },
    } = event;
    setIdPoint(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDays = (event: SelectChangeEvent<typeof idPoint>) => {
    const {
      target: { value },
    } = event;
    setArzNamesDays(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeHours = (event: SelectChangeEvent<typeof idPoint>) => {
    const {
      target: { value },
    } = event;
    setHoursLines(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    listPoints();
  }, []);

  function listPoints() {
    getAllListPoint().then((res) => setAllListPoints(res));
  }

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ backgroundColor: "#141218", fontFamily: "Quicksand" }}
        onClick={handleOpen}
      >
        Criação de Linhas
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
            style={{ fontFamily: "Quicksand" }}
          >
            Criação de Linha
          </Typography>
          <TextField
            style={{ width: 600, marginTop: "20px" }}
            color="info"
            id="standard-basic"
            label="Nome da linha"
            variant="outlined"
            value={nameLines}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNameLines(event.target.value);
            }}
          />
          <FormControl sx={{ width: 600, marginTop: "20px" }}>
            <InputLabel id="demo-multiple-checkbox-label">Pontos</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={idPoint}
              onChange={handleChange}
              input={<OutlinedInput label="Pontos" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {allListPoints.map((item: DataPoint, index) => {
                return (
                  <MenuItem key={index} value={item.namePoint}>
                    <Checkbox checked={idPoint.indexOf(item.namePoint) > -1} />
                    <ListItemText primary={item.namePoint} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ width: 300, marginTop: "20px" }}>
              <InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={arzNamesDays}
                onChange={handleChangeDays}
                input={<OutlinedInput label="Dias" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {namesDays.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={arzNamesDays.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250, marginTop: "20px" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Horarios
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={hoursLines}
                onChange={handleChangeHours}
                input={<OutlinedInput label="Horarios" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {Horario().map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={arzNamesDays.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              onClick={() => sendLines()}
            >
              Criar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
