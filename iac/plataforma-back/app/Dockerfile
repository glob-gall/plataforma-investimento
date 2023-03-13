FROM python:3.10 AS base
ENV LANG C.UTF-8

ENV BASEDIR /usr/app
ENV EXTERNALDIR ../../../plataforma-back

WORKDIR ${BASEDIR}
EXPOSE ${PORT}

ADD ${EXTERNALDIR}/requirements.apt /tmp/requirements.apt
ADD ${EXTERNALDIR}/requirements.pip /tmp/requirements.pip

RUN apt-get update && \
    apt-get install -y $(cat /tmp/requirements.apt)

RUN pip install -r /tmp/requirements.pip


FROM base as development
    ENTRYPOINT [ "/usr/app/Dockerfile_entrypoint.sh" ]
    ENV PORT 80

FROM base as production
