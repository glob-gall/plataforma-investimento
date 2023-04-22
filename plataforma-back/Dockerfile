FROM python:3.10 AS base
ENV LANG C.UTF-8

ENV BASEDIR /usr/app
ENV EXTERNALDIR .

WORKDIR ${BASEDIR}

COPY ${EXTERNALDIR} .

ADD ${EXTERNALDIR}/requirements.apt /tmp/requirements.apt
ADD ${EXTERNALDIR}/requirements.pip /tmp/requirements.pip

RUN pip install -r requirements.pip

EXPOSE ${PORT}

FROM base as development
ENV PORT 8000
EXPOSE ${PORT}
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base as production
ENV PORT 8000
EXPOSE ${PORT}
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]