from python:3.10

RUN pip install --upgrade pip

# backend to container's root
COPY ./ ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
