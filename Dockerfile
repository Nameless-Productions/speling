# needs a vol for the folder the DB is in and the DATABASE_URL set to that + database.db
# load an external .env file (ex.: --env-file .env)
FROM node:24-slim AS builder
WORKDIR /app

ENV SECRET="test"
ENV DISCORD_CLIENT="test"
ENV DISCORD_SECRET="test"
ENV DISCORD_URL="test"
ENV DISCORD_REDIRECT="test"
ENV CF_ACCESS_KEY="test"
ENV CF_SECRET_KEY="test"
ENV CF_URL="test"
ENV CF_BUCKET="test"
ENV CDN_URL="test"
ENV ADMIN="test"
ENV DATABASE_URL="file:test"

# prisma needs these
RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate

COPY . .
RUN pnpm build

FROM node:24-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 3000
CMD ["sh", "-c", "pnpm prisma migrate deploy && node build"]