FROM octohost/nodejs

ENV PORT 3000

ADD . /srv/www

WORKDIR /srv/www

RUN npm install

EXPOSE 3000

CMD ./bin/slackin --channel $SLACK_CHANNEL --port $PORT $SLACK_SUBDOMAIN $SLACK_API_TOKEN
