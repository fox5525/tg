const pool = require('../db/index');

exports.getAllPenguins = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM penguins');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPenguinById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM penguins WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Penguin not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createPenguin = async (req, res) => {
  try {
    const { name, gender, species, habitat_zone, status, image_url } = req.body;
    const result = await pool.query(
      'INSERT INTO penguins (name, gender, species, habitat_zone, status, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, gender, species, habitat_zone, status, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePenguin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, species, habitat_zone, status, image_url } = req.body;
    const result = await pool.query(
      'UPDATE penguins SET name=$1, gender=$2, species=$3, habitat_zone=$4, status=$5, image_url=$6, updated_at=CURRENT_TIMESTAMP WHERE id=$7 RETURNING *',
      [name, gender, species, habitat_zone, status, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Penguin not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePenguin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM penguins WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Penguin not found' });
    }
    res.json({ message: 'Penguin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
