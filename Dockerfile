# ---- Base Node ----
FROM tech-test-base as base
# set working directory and copy project file
WORKDIR /framework
COPY ./package*.json ./
# ---- Dependencies ----
# install dependencies
FROM base AS dependencies
RUN npm i
# ---- Test ----
# copy over tests and set entrypoint
FROM dependencies AS test
COPY . .

RUN npm run selenium-standalone
RUN npm run build

ARG browser
ARG suite

ENV BROWSER_ $browser
ENV SUITE_ $suite

ENTRYPOINT npm run ${BROWSER_}:docker -- ${SUITE_}