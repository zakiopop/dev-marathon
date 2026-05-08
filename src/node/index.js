const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 5682;

const cors = require("cors");
app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "user_5682", // PostgreSQLのユーザー名に置き換えてください
  host: "postgres",
  database: "cm_5682", // PostgreSQLのデータベース名に置き換えてください
  password: "pass_5682", // PostgreSQLのパスワードに置き換えてください
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GET /customer 会社一覧表示
app.get("/customers", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST /add-customer 会社登録
app.post("/add-customer", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// GET /customer-detail 会社詳細
app.get("/customer-detail", async (req, res) => {
  try {
    const { customer_id } = req.query;
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [customer_id]
    );
    if (result.rows.length === 0) {
      return res.json({ success: false, message: "顧客が見つかりません" });
    }
    res.json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// PUT /customer-detail 会社詳細更新
app.put("/customer-detail", async (req, res) => {
  try {
    const { customer_id, companyName, industry, contact, location } = req.body;
    const result = await pool.query(
      "UPDATE customers SET company_name = $1, industry = $2, contact = $3, location = $4 WHERE customer_id = $5 RETURNING *",
      [companyName, industry, contact, location, customer_id]
    );
    res.json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// DELETE /customer-detail 会社削除
app.delete("/customer-detail", async (req, res) => {
  try {
    const { customer_id } = req.query;
    await pool.query(
      "DELETE FROM customers WHERE customer_id = $1",
      [customer_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.use(express.static("public"));
