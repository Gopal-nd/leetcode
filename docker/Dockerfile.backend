FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock* package-lock.json ./

RUN bun install
RUN apt-get update -y && apt-get install -y openssl
COPY . .
RUN bunx prisma generate



# Build-time args 
ARG APP_PORT=8000
ARG NODE_ENV=production


#  Environment variables 
ENV APP_PORT="${APP_PORT}"
ENV NODE_ENV="${NODE_ENV}"

ENV BETTER_AUTH_SECRET=''
ENV BETTER_AUTH_URL=''
ENV DATABASE_URL=''
ENV FRONTEND_URL='http://localhost:3000'
ENV ADMIN_EMAIL=''

ENV JUDGE0_API_URL='https://judge0-ce.p.rapidapi.com'
ENV GOOGLE_CLIENT_ID=''
ENV GOOGLE_CLIENT_SECRET=''

ENV JUDGE0_API_KEY=''
ENV JUDGE0_API_HOST=''   

CMD ["bun", "run", "src/index.ts"]
USER bun
EXPOSE "${APP_PORT}"
