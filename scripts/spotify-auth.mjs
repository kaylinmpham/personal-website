// Gets a new Spotify refresh token and saves it to .env.local.
// Usage: npm run spotify:auth
// Requires http://127.0.0.1:8888/callback in the Spotify app's Redirect URIs.
import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";

const ENV_FILE = ".env.local";
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
];

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } =
  process.env;
if (!clientId || !clientSecret) {
  console.error(`Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in ${ENV_FILE}.`);
  process.exit(1);
}

const authorizeUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(" "),
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") return res.writeHead(404).end();

  const code = url.searchParams.get("code");
  if (!code) {
    res.end(`Authorization failed: ${url.searchParams.get("error")}`);
    return finish(1, `Authorization failed: ${url.searchParams.get("error")}`);
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  const data = await tokenRes.json();
  if (!data.refresh_token) {
    res.end("Token exchange failed. Check the terminal.");
    return finish(1, `Token exchange failed: ${JSON.stringify(data)}`);
  }

  const env = readFileSync(ENV_FILE, "utf8");
  const line = `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`;
  writeFileSync(
    ENV_FILE,
    /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(env)
      ? env.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
      : `${env.trimEnd()}\n${line}\n`,
  );
  res.end("Spotify connected. You can close this tab.");
  finish(0, `Saved a new SPOTIFY_REFRESH_TOKEN to ${ENV_FILE}. Restart the dev server.`);
});

function finish(code, message) {
  (code ? console.error : console.log)(message);
  server.close();
  process.exitCode = code;
}

server.listen(8888, "127.0.0.1", () => {
  console.log(`Open this URL and approve access:\n\n${authorizeUrl}\n`);
});
