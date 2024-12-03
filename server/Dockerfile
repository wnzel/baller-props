# Use a lightweight Python base image
FROM python:3.12.5-slim

# Set the working directory
WORKDIR /app

# Copy only the requirements file to leverage Docker's caching mechanism
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the backend code
COPY . .

EXPOSE 8080

# Specify default command
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]