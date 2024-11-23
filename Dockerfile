ARG NODE_VERSION=22.1.0
FROM node:${NODE_VERSION}-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@latest
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM base AS runner
WORKDIR /runner

# 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 kawabata
COPY --from=builder --chown=kawabata:nodejs /app/node_modules /runner/node_modules
COPY --from=builder --chown=kawabata:nodejs /app/dist /runner/dist
COPY --from=builder --chown=kawabata:nodejs /app/package.json /runner/package.json
USER kawabata

EXPOSE 8080
CMD ["node", "/runner/dist/app.js"]
