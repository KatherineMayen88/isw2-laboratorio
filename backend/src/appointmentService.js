/**
 * Servicio de validación de citas médicas
 */
const validateAppointment = (newApp, existingApps) => {
    const start = new Date(newApp.start);
    const end = new Date(newApp.end);

    // Validación de Duración Mínima (20 min)
    const durationInMinutes = (end - start) / (1000 * 60);
    if (durationInMinutes < 5) {
        return { valid: false, message: 'La duración mínima es de 20 minutos' };
    }

    // Validación de Traslape (Conflicto de horario)
    const hasConflict = existingApps.some(app => {
        const existingStart = new Date(app.start);
        const existingEnd = new Date(app.end);
        return (
            app.doctorId === newApp.doctorId &&
            start < existingEnd && 
            end > existingStart
        );
    });

    if (hasConflict) {
        return { valid: false, message: 'Conflicto de horario detectado' };
    }

    return { valid: true, message: 'Cita válida' };
};

module.exports = { validateAppointment };