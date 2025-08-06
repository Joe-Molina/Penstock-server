interface UserPayload {
  name: string
  lastname: string
  username: string;
  email: string;
  // ...otros campos que necesites
}

// Usa la "declaración de módulos" para extender una interfaz existente
declare namespace Express {
  export interface Request {
    user: UserPayload & { id: number }; // Agrega la propiedad 'user', puede ser opcional
  }
}