import { Pool } from 'pg';
import { Image } from './models/image';
import { User } from './models/user';

export {
  Image,
  User,
};

const pool = new Pool({
  ssl: { rejectUnauthorized: false }
});

class DAO {
  readonly pool: Pool;

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async query(text: string, params?: any) {
    const start = Date.now();
    const res = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  };
}

export default DAO;
