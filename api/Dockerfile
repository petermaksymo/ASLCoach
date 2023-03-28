# Use the python base image
FROM python:3.11

ENV PYTHONUNBUFFERED=1

WORKDIR api

COPY . ./

RUN #pip install -r requirements.txt

CMD ["tail", "-f", "/dev/null"]

#WORKDIR /
#ENV FLASK_APP=api.app
#CMD ["flask", "run", "--host", "0.0.0.0"]