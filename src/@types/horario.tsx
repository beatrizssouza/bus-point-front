import moment from "moment";

const Horario = () => {
  // Defina o horário inicial
  const horarioInicial = moment("00:00 AM", "hh:mm A");

  // Defina o horário final
  const horarioFinal = moment("23:30 PM", "hh:mm A");

  // Inicialize um array para armazenar os horários
  const horarios = [];

  // Loop para adicionar horários a cada 30 minutos
  let horarioAtual = horarioInicial.clone();
  while (horarioAtual.isSameOrBefore(horarioFinal)) {
    horarios.push(horarioAtual.format("hh:mm A"));
    horarioAtual.add(30, "minutes");
  }

  return horarios;
};

export default Horario;
