import create from 'zustand/vanilla';

import dataReservas from '../assets/data/reservas.json';
import { reservasMap } from './mappers/reservas.map';

const respReservas = reservasMap.toDomain(dataReservas);

export const useStore = create(() => ({
  contactData: respReservas.contactData,
  changeTrip: respReservas.changeTrip,
  passengerManagement: respReservas.passengerManagement,
  petsManagement: respReservas.petsManagement,
  vehicleManagement: respReservas.vehicleManagement,
  extrasServiceManagement: respReservas.extrasServiceManagement,
}));
