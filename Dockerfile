# build stage
FROM node:24-slim AS builder
WORKDIR /app

ENV SECRET="meowmeowmeow"
ENV DISCORD_CLIENT="meow"
ENV DISCORD_SECRET="meow"
ENV DISCORD_URL="meow"
ENV DISCORD_REDIRECT="meow"
ENV CF_ACCESS_KEY="test"
ENV CF_SECRET_KEY="test"
ENV CF_URL="test"
ENV CF_BUCKET="test"
ENV CDN_URL="test"
ENV ADMIN="test"
ENV DATABASE_URL="file:/app/prisma/database.db"

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate

COPY . .
RUN pnpm build

FROM node:24-slim AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

ENV PORT=5190
ENV HOST=0.0.0.0
ENV DATABASE_URL="file:/app/prisma/database.db"
EXPOSE 5190
CMD ["sh", "-c", "pnpm prisma migrate deploy && node build"]