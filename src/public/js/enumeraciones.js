export const tiposMovimiento = {
  crearEntidad: 0,
  modificarEntidad: 1,
  borrarEntidad: 2,
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearCarga: 41,
}
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}
export const tiposIncentivo = {
  deducible: 1,
  prioritaria: 2,
  deducibleyprioritaria: 3,
}
export const estadosCarga = {
  pendiente: 0,
  procesado: 1,
}
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
};
export const Administraciones = {
  alava: 1,
  gipuzkoa: 2,
  bizkaia: 3,
  navarra: 4,
  estado: 5,
  otras: 6,
};

/* arrays */
export const arrTiposRol = [
  { id: 1, des: 'USUARIO' },
  { id: 2, des: 'RESPONSABLE' },
  { id: 3, des: 'ADMINISTRADOR' },
]
export const arrTiposIncentivo = [
  { id: 1, des: 'DEDUCIBLE' },
  { id: 2, des: 'PRIORITARIA' },
  { id: 3, des: 'DEDUCIBLE Y PRIORITARIA' },
]
export const arrAdministraciones = [
  { id: 1, des: 'ALAVA/ARABA' },
  { id: 2, des: 'GIPUZKOA' },
  { id: 3, des: 'BIZKAIA' },
  { id: 4, des: 'NAVARRA' },
  { id: 5, des: 'ESTADO' },
  { id: 6, des: 'OTRAS' },
]