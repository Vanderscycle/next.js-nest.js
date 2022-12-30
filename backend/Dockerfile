# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile;

# Rebuild the source code only when needed
FROM node:18-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN yarn global add pnpm && \
  pnpm i --frozen-lockfile && \
  pnpm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

# ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

USER nestjs

EXPOSE 3000

ENV MODE_ENV infrastructure 
#TODO: make it production
ENV PORT 3000
CMD ["node", "dist/main.js"]
