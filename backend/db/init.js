const pool = require('./index');

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'USER',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS penguins (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      gender VARCHAR(20) NOT NULL,
      species VARCHAR(100) NOT NULL,
      habitat_zone VARCHAR(100),
      status VARCHAR(50) NOT NULL,
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS penguin_colors (
      penguin_id INTEGER REFERENCES penguins(id) ON DELETE CASCADE,
      color VARCHAR(50) NOT NULL,
      PRIMARY KEY (penguin_id, color)
    );

    CREATE TABLE IF NOT EXISTS penguin_ages (
      penguin_id INTEGER REFERENCES penguins(id) ON DELETE CASCADE,
      age_group VARCHAR(50) NOT NULL,
      PRIMARY KEY (penguin_id, age_group)
    );
  `;

  try {
    console.log('Creating tables...');
    await pool.query(query);
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pool.end();
  }
};

createTables();
