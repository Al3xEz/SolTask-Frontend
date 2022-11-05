export const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);

  const id = random + fecha;

  return id;
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return fechaNueva.toLocaleDateString("en-US", opciones);
};

export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
