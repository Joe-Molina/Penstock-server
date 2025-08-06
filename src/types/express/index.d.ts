interface UserPayload {
  name: string
  lastname: string
  username: string;
  email: string;
  // ...otros campos que necesites
}

interface UserPayloadJwt extends UserPayload {
  id: number
  loged: boolean;
  companyId: number
}

// Usa la "declaración de módulos" para extender una interfaz existente
declare namespace Express {
  export interface Request {
    user: UserPayloadJwt; // Agrega la propiedad 'user', puede ser opcional
  }
}