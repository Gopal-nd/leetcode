# ── Build Stage ───────────────────────────────────────────────
FROM oven/bun:1.2.19 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build
RUN test -d .next && test -f .next/routes-manifest.json

# ── Run Stage ─────────────────────────────────────────────────
FROM oven/bun:1.2.19 AS runner
WORKDIR /app

# Only copy what's needed at runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY package.json ./

# Runtime env defaults (override with docker run -e)
ARG APP_PORT=3000
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV PORT=$APP_PORT

# Example public keys (still baked in client bundle)

ENV NEXT_PUBLIC_BACKEND_URL=''
ENV NEXT_PUBLIC_FRONTEND_URL=''
ENV NEXT_PUBLIC_GOOGLE_API_KEY=''
# move sensitive keys out to runtime if needed

EXPOSE $APP_PORT

# Use the production server command
CMD ["bun", "run", "start"]
USER bun
