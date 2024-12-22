DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO todos (title,content) VALUES
("タスク1","タスク１です"),
("タスク2","タスク2です"),
("タスク3","タスク3です");