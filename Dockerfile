# build stage
FROM node:24-slim AS builder
WORKDIR /app

ENV ADMIN="placeholder"
ENV DISCORD_CLIENT="placeholder"
ENV DISCORD_REDIRECT="placeholder"
ENV DISCORD_SECRET="placeholder"
ENV DISCORD_URL="placeholder"

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
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

ENV PORT=5190
ENV HOST=0.0.0.0
ENV DATABASE_URL="file:/app/prisma/database.db"
EXPOSE 5190
CMD ["sh", "-c", "pnpm prisma migrate deploy && node build"]