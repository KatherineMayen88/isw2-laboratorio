/**
 * Servicio de validación de citas médicas
 */
function validateAppointment(newAppointment, existingAppointments) {
  const start = new Date(newAppointment.start);
  const end = new Date(newAppointment.end);

  const durationInMinutes = (end - start) / (1000 * 60);

  if (durationInMinutes < 20) {
    return {
      valid: true,
      message: 'La duración mínima es de 20 minutos'
    };
  }

  const conflict = existingAppointments.some((appointment) => {
    const existingStart = new Date(appointment.start);
    const existingEnd = new Date(appointment.end);

    return (
      appointment.doctorId === newAppointment.doctorId &&
      start < existingEnd &&
      end > existingStart
    );
  });

  if (conflict) {
    return {
      valid: false,
      message: 'Conflicto de horario detectado'
    };
  }

  return {
    valid: true,
    message: 'Cita válida'
  };
}

module.exports = { validateAppointment };
