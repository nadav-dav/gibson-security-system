#!/bin/sh
echo "`ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.' | head -1`    http://www.gibson-sec.com    # gibson's ip"
