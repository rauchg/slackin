FROM flowdocker/node:0.1.7

ENV PORT 3000

ADD . /srv/www

WORKDIR /srv/www

RUN npm install --unsafe-perm

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "/root/environment-provider.jar", "--service", "node", "slackin", "./bin/slackin", "--coc", "$SLACK_COC", "--channels", "$SLACK_CHANNELS", "--port", "$PORT", "$SLACK_SUBDOMAIN", "$SLACK_API_TOKEN", "$GOOGLE_CAPTCHA_SECRET", "$GOOGLE_CAPTCHA_SITEKEY"]
