# ---- Build frontend ----
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

EXPOSE 4000
ENV PORT=4000
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
