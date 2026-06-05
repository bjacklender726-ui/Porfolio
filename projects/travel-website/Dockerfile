# ---- Build frontend (Astro) ----
FROM node:20-alpine AS build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# ---- Backend + static serve ----
FROM node:20-alpine
WORKDIR /app

COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/ .
COPY --from=build /app/client/dist ./public

EXPOSE 4001
ENV PORT=4001
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
