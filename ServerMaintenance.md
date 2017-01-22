
## Server Maintenance
### Note: The below is provided for team reference.

To start the main production server from project root:
```
npm run build:prod
npm run server:prod
```

To start forwarding proxy from project root:
```
node proxy/proxy.js
```

Using a clone of https://github.com/soundcloud/waveformjs with the dependancies and gems installed, to start Ruby Waveform service from /var/waveformjs:
```
bundle exec rackup
```

With Python and Django installed, to start Django REST server within /var/www/soundmoose.com/server/project/ directory:
```
python manage.py runserver 0.0.0.0:8000
```

> Note: for info on how the virtual environment was set up visit http://docs.python-guide.org/en/latest/dev/virtualenvs/

To manage Django server, visit http://138.197.88.233:8000/admin/

To view API information, visit http://138.197.88.233:8000/api/

Useful commands:

netstat -lpn |grep :9292     <- django server port
kill -9 PID                <- kill all at PID
