FROM octohost/nodejs

ENV PORT 3000

ENV PATH /

ADD . /srv/www

WORKDIR /srv/www

RUN npm install --unsafe-perm

EXPOSE 3000

CMD ./bin/slackin --channels "$SLACK_CHANNELS" --port $PORT --path $PATH $SLACK_SUBDOMAIN $SLACK_API_TOKEN $SLACK_SEGMENT_KEY
