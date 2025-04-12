import { Hono } from "hono";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// ルートパスのハンドラを追加
app.get("/", (c) => {
  return c.text("Todo API is running! Access /todos to get todo items.");
});

//データを登録（新規作成）
app.post("/todos", async (c) => {
  const { title, content } = await c.req.json();
  try {
    await c.env.DB.prepare("INSERT INTO todos (title, content) VALUES(?,?)")
      .bind(title, content)
      .run();
    return c.json({ message: "Success!" }, 201);
  } catch (error) {
    return c.json({ err: error }, 500);
  }
});

//全件取得
app.get("/todos", async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM todos").all();
    return c.json(results);
  } catch (error) {
    return c.json({ err: error }, 500);
  }
});

//1件取得
app.get("/todos/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const { results } = await c.env.DB.prepare(
      "SElECT * FROM todos WHERE id = ?"
    )
      .bind(id)
      .all();
    return c.json(results);
  } catch (error) {
    return c.json({ err: error }, 500);
  }
});

//1件更新
app.put("/todos/:id", async (c) => {
  const id = c.req.param("id");
  const { title, content } = await c.req.json();
  try {
    await c.env.DB.prepare(
      "UPDATE todos SET title = ?, content = ? WHERE id = ?"
    )
      .bind(title, content, id)
      .run();
    return c.json({ message: "Success!" }, 200);
  } catch (error) {
    return c.json({ err: error }, 500);
  }
});

//1件削除
app.delete("/todos/:id", async (c) => {
  const id = c.req.param("id");
  try {
    await c.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();
    return c.json({ message: "Success!" }, 200);
  } catch (error) {
    return c.json({ err: error }, 500);
  }
});

export default app;
