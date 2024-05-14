# Use the official Python base image
FROM python:3.9-slim

# Set environment variables
ENV DATABASE_URL=postgresql://kaizoku:kaizoku@db:5432/kaizoku \
    KAIZOKU_PORT=3010 \
    REDIS_HOST=redis \
    REDIS_PORT=6379 \
    PUID=<host user puid> \
    PGID=<host user guid> \
    TZ=North America/New York

# Set the working directory in the container
WORKDIR /app
# Create directories
run mkdir /app/data
run mkdir /app/config
run mkdir /app/logs
# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app/

# Expose the port the app runs on
EXPOSE 3010
# Define volumes
VOLUME /data
VOLUME /config
VOLUME /logs

# Start the app
CMD ["python", "app.py"]
