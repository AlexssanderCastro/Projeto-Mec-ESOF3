import { Pool } from "pg";

class Database {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        user: "postgres",
        host: "localhost",
        database: "mecanica",
        password: "Ajoc1112=",
        port: 5432,
      });
    }
    return Database.instance;
  }
}

export default Database.getInstance();