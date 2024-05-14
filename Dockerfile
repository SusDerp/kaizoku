# Use the official Python base image
FROM python:3.9-slim

# Set environment variables
ENV DATABASE_URL=postgresql://kaizoku:kaizoku@db:5432/kaizoku \
    KAIZOKU_PORT=3010 \
    REDIS_HOST=redis \
    REDIS_PORT=6379 \
    PUID=99 \
    PGID=100 \
    TZ=Europe/Istanbul

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3010

# Start the app
CMD ["python", "app.py"]
