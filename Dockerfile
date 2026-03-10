# Use a stable LTS (optional, but recommended)
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# --- Build-time database URL (placeholder OK) ---
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma Client (needs DATABASE_URL in Prisma 7)
RUN npx prisma generate

# Build your app (for Next.js; if not, adjust accordingly)
RUN npm run build

EXPOSE 3000

# Do NOT bake secrets here; pass at runtime
CMD ["npm", "run", "start"]