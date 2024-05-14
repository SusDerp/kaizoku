# Start from a base image
FROM ghcr.io/oae/kaizoku:latest

# Set environment variables
ENV DATABASE_URL=postgresql://kaizoku:kaizoku@db:5432/kaizoku \
    KAIZOKU_PORT=3010 \
    REDIS_HOST=redis \
    REDIS_PORT=6379 \
    TZ=Europe/Istanbul

# Expose the port
EXPOSE 3010

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY /mnt/user/Media/Manga /data
COPY /mnt/user/appdata/kaizoku/config /config
COPY /mnt/user/appdata/kaizoku/logs /logs

# Define the entrypoint
CMD ["npm", "start"]
