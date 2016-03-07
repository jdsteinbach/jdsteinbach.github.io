---
title: Setting Up Let’s Encrypt with VestaCP on Digital Ocean
author: James Steinbach
layout: post
permalink: /misc/letsencrypt-vesta/
categories:
  - Misc
excerpt: Instructions for adding new Let&apos;s Encrypt SSL certs to domains managed by VestaCP on a Digital Ocean (Ubuntu 14) server.
---

Ok, I&#8217;ll be totally honest here. I&#8217;m writing this post mostly for myself: I need an easy place to keep these instructions for setting up new SSL certificates. If they help you, that&#8217;s awesome. If not, hopefully there&#8217;s [another post here](https://jdsteinbach.com) that you can learn from.

## Installing LetsEncrypt

First step: install the Let&apos;s Encrypt tool on your server. SSH into your server, `cd` to the root dir (where you probably landed as soon as you SSHed in), and run the these commands:

~~~bash
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
./letsencrypt-auto --help
~~~

This will take time to install a bunch of packages, then give you a success message. You should only does these steps once. Every time you want to secure another domain on your VestaCP account, follow the next section.

## Adding Let&apos;s Encrypt Certificates

In all of these commands, replace `DOMAIN_GOES_HERE` with the domain you want to secure and `YOUR_VESTA_USERNAME` with your VestaCP username.

### Installing the Certificate

The following command will create the necessary certificates. You should still be in the `/letsencrypt/` directory where you ran the last command above. When you run this command, the UI will ask you for an email address to use for this certificate and to agree to the Terms of Service.

~~~shell
./letsencrypt-auto certonly -a webroot --renew-by-default --webroot-path /home/YOUR_VESTA_USERNAME/web/DOMAIN_GOES_HERE/public_html -d DOMAIN_GOES_HERE
~~~

That command created several files in on your server. You&#8217;ll need to copy the contents of those files to your VestaCP admin page for that domain. In Vesta, edit the domain, check the button for "SSL Support" &ndash; you&#8217;ll then see three new fields.

### Copying Cert Files to VestaCP

To view those files' contents, run the following commands, then copy the file contents to the appropriate field:

~~~shell
cat /etc/letsencrypt/live/DOMAIN_GOES_HERE/cert.pem
~~~

^ Copy contents into “SSL Certificate” field.

~~~shell
cat /etc/letsencrypt/live/DOMAIN_GOES_HERE/privkey.pem
~~~

^ Copy contents into “SSL Key” field.

~~~shell
cat /etc/letsencrypt/live/DOMAIN_GOES_HERE/chain.pem
~~~

^ Copy contents into “SSL Certificate Authority” field.

### Symlinks to the Original Files

The previous steps saved those details to a series of files in `/home/USERNAME/conf/web/` you&#8217;ll actually remove all those files next:

~~~shell
rm /home/YOUR_VESTA_USERNAME/conf/web/ssl.DOMAIN_GOES_HERE.*
~~~

In place of those files you just deleted, you&#8217;ll now create a series of symlinks to the originals created by Let&apos;s Encrypt:

~~~shell
ln -s /etc/letsencrypt/live/DOMAIN_GOES_HERE/fullchain.pem /home/YOUR_VESTA_USERNAME/conf/web/ssl.DOMAIN_GOES_HERE.pem
ln -s /etc/letsencrypt/live/DOMAIN_GOES_HERE/privkey.pem /home/YOUR_VESTA_USERNAME/conf/web/ssl.DOMAIN_GOES_HERE.key
ln -s /etc/letsencrypt/live/DOMAIN_GOES_HERE/cert.pem /home/YOUR_VESTA_USERNAME/conf/web/ssl.DOMAIN_GOES_HERE.crt
ln -s /etc/letsencrypt/live/DOMAIN_GOES_HERE/chain.pem /home/YOUR_VESTA_USERNAME/conf/web/ssl.DOMAIN_GOES_HERE.ca
~~~

Once this is done, restart your nginx and Apache servers:

~~~shell
service nginx restart
service apache2 restart
~~~

Check out your domain now, and it should be secure!