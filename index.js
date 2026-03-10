const http = require("http");

const port = process.env.PORT || 3000;

const loginPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng nhập</title>
    <style>
      :root {
        --bg-start: #f4efe6;
        --bg-end: #dfe9f3;
        --panel: rgba(255, 252, 248, 0.9);
        --text: #1f2933;
        --muted: #52606d;
        --accent: #c96c50;
        --border: rgba(31, 41, 51, 0.12);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: var(--text);
        background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
      }

      .card {
        width: min(100%, 420px);
        padding: 32px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--panel);
        box-shadow: 0 20px 45px rgba(31, 41, 51, 0.12);
        backdrop-filter: blur(10px);
      }

      h1 {
        margin: 0 0 8px;
        font-size: 2rem;
      }

      p {
        margin: 0 0 24px;
        color: var(--muted);
      }

      .field {
        display: grid;
        gap: 8px;
      }

      label {
        font-weight: 600;
      }

      input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid var(--border);
        border-radius: 12px;
        font-size: 1rem;
        color: var(--text);
        background: #fff;
      }

      input:focus {
        outline: 2px solid rgba(201, 108, 80, 0.2);
        border-color: var(--accent);
      }

      button {
        margin-top: 20px;
        width: 100%;
        padding: 12px 14px;
        border: 0;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        background: var(--accent);
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>Đăng nhập</h1>
      <p>Nhập thông tin tài khoản để tiếp tục.</p>
      <form method="POST" action="/login">
        <div class="field">
          <label for="textboxusername">Tên đăng nhập</label>
          <input id="textboxusername" name="textboxusername" type="text" placeholder="Enter your username" />
        </div>
        <div class="field" style="margin-top: 16px;">
          <label for="textboxmatkhau">Mật khẩu</label>
          <input id="textboxmatkhau" name="textboxmatkhau" type="password" placeholder="Enter your password" />
        </div>
        <button id="btnlogin" name="btnlogin" type="submit">Đăng nhập</button>
      </form>
    </main>
  </body>
</html>`;

const loginSuccessPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng nhập thành công</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #eef6ea, #d8e9f7);
        color: #1f2933;
      }

      .card {
        width: min(100%, 420px);
        padding: 32px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.92);
        box-shadow: 0 20px 45px rgba(31, 41, 51, 0.12);
        text-align: center;
      }

      h1 {
        margin: 0 0 12px;
      }

      p {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>Đăng nhập thành công</h1>
      <p>Chào mừng admin quay trở lại.</p>
    </main>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(loginPage);
    return;
  }

  if (req.url === "/login" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const username = formData.get("textboxusername");
      const password = formData.get("textboxmatkhau");

      if (username === "admin" && password === "admin") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(loginSuccessPage);
        return;
      }

      res.writeHead(302, { Location: "/" });
      res.end();
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
