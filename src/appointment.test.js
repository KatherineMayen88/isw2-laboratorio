const { validateAppointment } = require('./appointmentService');

describe('Pruebas Unitarias - Validación de Citas Médicas', () => {
    
    // Prueba 1: Validación de Traslape (Regla crítica de negocio)
    test('Debe rechazar la cita si existe un conflicto de horario con el mismo médico', () => {
        const existingAppointments = [
            { start: '2025-10-10T08:00:00', end: '2025-10-10T08:20:00', doctorId: 1 }
        ];
        const newAppointment = { start: '2025-10-10T08:10:00', end: '2025-10-10T08:30:00', doctorId: 1 };
        
        const result = validateAppointment(newAppointment, existingAppointments);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Conflicto de horario detectado');
    });

    // Prueba 2: Validación de Duración Mínima (Calidad de servicio)
    test('Debe rechazar la cita si la duración es inferior a 20 minutos', () => {
        const newAppointment = { start: '2025-10-10T09:00:00', end: '2025-10-10T09:10:00', doctorId: 1 };
        
        const result = validateAppointment(newAppointment, []);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('La duración mínima es de 20 minutos');
    });
});