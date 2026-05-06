npm i -g pnpm
pnpm i
docker compose up -d
pnpm run migration:run
pnpm run dev:server
pnpm run dev:client