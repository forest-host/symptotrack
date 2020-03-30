# How to setup frontend proxy on valet
- if you run valet secure sitename, valet creates a config file for this site
- open /Users/username/.config/valet/Nginx/sitename.test
- add the following code at the end :
	
	server {
    listen 127.0.0.1:80;
    server_name frontend.sitename.test;
    location / {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
